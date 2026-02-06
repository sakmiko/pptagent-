> 文档版本：v1.0  
> 负责人：Manus AI  
> 最后更新：2026-02-06  
> 状态：stable

# 母版复用与背景集成

## 1. 概述

为了实现背景的可复用性和整个演示文稿风格的统一，我们必须将生成的背景图片应用到 PowerPoint 的母版（Master Slide）上，而不是单独为每一页设置背景。本章将详细介绍如何通过 `python-pptx` 实现这一集成。

## 2. `python-pptx` 的母版与布局

在 `python-pptx` 中，一个演示文稿（`Presentation`）包含一个幻灯片母版（`slide_master`）。这个母版定义了所有幻灯片的通用元素，包括背景、页脚、字体样式等。母版下又包含多个幻灯片版式（`slide_layouts`），如“标题幻灯片”、“标题和内容”等，它们继承了母版的属性，并定义了各自的占位符布局。

**核心关系**: `Presentation` -> `slide_master` -> `slide_layouts`

## 3. 背景集成策略

我们的策略是：**为每个演示文稿动态生成一张背景图，并将其设置为 `slide_master` 的背景。** 这样，所有基于该母版创建的幻灯片（无论使用哪种布局）都将自动继承这个背景。

### 3.1 实现步骤

1.  **选择预设**: 在创建演示文稿的初始阶段，根据用户选择或系统默认，确定一个背景预设（如 "deep_ocean"）。
2.  **生成背景图**: 调用 `PresetLibrary`，生成对应预设的背景图片，并保存为临时文件（如 `temp_background.png`）。
3.  **获取母版**: 打开或创建一个 `Presentation` 对象后，通过 `prs.slide_master` 获取母版对象。
4.  **设置背景**: 使用 `master.background.fill.picture()` 方法，将生成的背景图片填充为母版的背景。
5.  **清理临时文件**: 背景设置完成后，删除临时的背景图片文件。

### 3.2 代码实现

下面是一个完整的示例，演示了如何将背景生成系统与 `python-pptx` 的母版集成。

```python
from pptx import Presentation
import os

# 假设 PresetLibrary 和 PRESET_DATA 已经定义好
from ..preset_library.preset_library import PresetLibrary, PRESET_DATA

class PresentationBuilder:
    def __init__(self, preset_name: str):
        self.preset_name = preset_name
        self.library = PresetLibrary(PRESET_DATA)
        self.temp_background_path = "temp_background.png"

    def _prepare_background(self, prs: Presentation):
        """生成背景并应用到母版。"""
        # 获取演示文稿的尺寸 (以 EMU 为单位)
        width_emu = prs.slide_width
        height_emu = prs.slide_height
        
        # 将 EMU 转换为像素 (1 英寸 = 914400 EMU, 假设 96 DPI)
        width_px = int(width_emu * 96 / 914400)
        height_px = int(height_emu * 96 / 914400)

        # 生成背景图片
        background_image = self.library.generate_background_from_preset(
            self.preset_name, width_px, height_px
        )

        if background_image:
            # 保存为临时文件
            background_image.save(self.temp_background_path, "PNG")

            # 获取母版并设置背景
            master = prs.slide_master
            background = master.background
            fill = background.fill
            fill.solid()
            fill.picture(self.temp_background_path)
            print(f"背景 ‘{self.preset_name}’ 已成功应用到母版。")
        else:
            print("生成背景失败，将使用默认背景。")

    def build(self, output_filename: str):
        """创建一个包含动态背景的演示文稿。"""
        prs = Presentation()
        self._prepare_background(prs)

        # 添加一些示例幻灯片来验证背景
        title_slide_layout = prs.slide_layouts[0]
        slide = prs.slides.add_slide(title_slide_layout)
        title = slide.shapes.title
        subtitle = slide.placeholders[1]
        title.text = "动态背景测试"
        subtitle.text = f"使用 ‘{self.preset_name}’ 预设"

        content_slide_layout = prs.slide_layouts[1]
        slide2 = prs.slides.add_slide(content_slide_layout)
        title2 = slide2.shapes.title
        title2.text = "内容页"

        # 保存演示文稿
        prs.save(output_filename)
        print(f"演示文稿已保存到 {output_filename}")

        # 清理临时文件
        if os.path.exists(self.temp_background_path):
            os.remove(self.temp_background_path)

# 示例用法
if __name__ == '__main__':
    # 使用 "tech_grid" 预设创建一个演示文稿
    builder = PresentationBuilder(preset_name="tech_grid")
    builder.build("presentation_with_dynamic_background.pptx")
```

## 4. 优势与注意事项

- **全局一致性**: 只需设置一次，所有幻灯片（包括未来新增的）都将拥有相同的背景。
- **性能**: 相比为每页单独设置背景，只处理一次母版背景效率更高。
- **注意事项**: 必须在添加任何幻灯片之前完成母版背景的设置。
