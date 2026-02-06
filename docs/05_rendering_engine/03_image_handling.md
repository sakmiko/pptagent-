> 文档版本：v1.0  
> 负责人：Manus AI  
> 最后更新：2026-02-06  
> 状态：draft

# 3. 图片处理规范

图片在演示文稿中扮演着至关重要的角色，能够极大地增强视觉吸引力和信息传达效率。渲染引擎的图片处理模块（`Image Processor`）旨在确保所有插入的图片都能在不变形的前提下，与母版设计完美融合。

## 3.1 核心算法：Crop-to-Fill

在 Web 开发中，`object-fit: cover` 是一个常用的 CSS 属性，它能让图片在不拉伸的情况下填满整个容器。渲染引擎必须在 `python-pptx` 环境中模拟这一行为。我们称之为 `Crop-to-Fill` 算法。

### 3.1.1 算法流程

当需要将一张本地图片 (`image_local_path`) 插入到一个图片占位符 (`placeholder`) 时，`Image Processor` 必须执行以下步骤：

1.  **获取尺寸**: 
    - 获取占位符的尺寸（`placeholder_width`, `placeholder_height`）。
    - 使用图像处理库（如 Pillow）读取本地图片，获取其原始尺寸（`image_width`, `image_height`）。

2.  **计算宽高比**: 
    - 计算占位符的宽高比：`placeholder_ratio = placeholder_width / placeholder_height`。
    - 计算图片的宽高比：`image_ratio = image_width / image_height`。

3.  **判断裁剪方式**: 
    - **如果 `image_ratio > placeholder_ratio`**: 这意味着图片比占位符“更宽”。我们需要保持图片的高度与占位符一致，并裁剪掉左右两侧多余的部分。
      - 计算缩放后的图片宽度：`scaled_width = image_width * (placeholder_height / image_height)`。
      - 计算需要裁剪掉的总宽度：`crop_margin = scaled_width - placeholder_width`。
      - 设置裁剪区域：左侧裁剪 `crop_margin / 2`，右侧裁剪 `crop_margin / 2`。

    - **如果 `image_ratio < placeholder_ratio`**: 这意味着图片比占位符“更高”。我们需要保持图片的宽度与占位符一致，并裁剪掉上下两端多余的部分。
      - 计算缩放后的图片高度：`scaled_height = image_height * (placeholder_width / image_width)`。
      - 计算需要裁剪掉的总高度：`crop_margin = scaled_height - placeholder_height`。
      - 设置裁剪区域：顶部裁剪 `crop_margin / 2`，底部裁剪 `crop_margin / 2`。

4.  **执行插入**: `python-pptx` 的 `placeholder.insert_picture()` 方法本身不直接支持裁剪。但我们可以通过设置 `crop_left`, `crop_right`, `crop_top`, `crop_bottom` 属性来实现同样的效果。这些属性的值是相对于图片原始尺寸的比例（0到1之间）。因此，在计算出裁剪边距后，需要将其转换为比例值再应用。

## 3.2 图片质量与压缩

- **分辨率**: 为了在保证清晰度的同时控制最终 `.pptx` 文件的大小，所有插入的图片在下载和预处理阶段就应被调整到一个合理的分辨率。一个经验法则是，图片的宽度不应超过最终显示宽度的2倍（例如，对于一个5英寸宽的占位符，图片宽度不应超过1500-2000像素）。
- **压缩**: 在插入前，应对图片进行适当的无损或高质量的有损压缩（例如，JPEG 质量设置为 85-90），以进一步减小文件体积。

## 3.3 降级处理

- **图片缺失**: 如果 `Final JSON` 中指定的 `image_local_path` 文件不存在或无法读取，渲染引擎**不能**因此而崩溃。它必须使用一个预设的、带有提示信息（如“图片加载失败”）的标准占位图来代替，以保证流程的完整性。

通过实施这套严格的图片处理规范，渲染引擎可以确保所有演示文稿中的图片都显得专业、美观，且不会因为尺寸不匹配而破坏整体布局。
