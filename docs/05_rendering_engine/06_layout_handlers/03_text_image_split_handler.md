> 文档版本：v1.0  
> 负责人：Manus AI  
> 最后更新：2026-02-06  
> 状态：stable

# `text_image_split` 处理器实现

## 1. 概述

本处理器负责渲染 `text_image_split` 版式，一侧是文本，另一侧是图片。

## 2. 占位符映射

假设母版中有两个变体：`Content_Img_R` (右图) 和 `Content_Img_L` (左图)。

**`Content_Img_R` (右图左文):**

| 逻辑名称 | 占位符 `name` 或 `idx` | 类型 |
| :--- | :--- | :--- |
| `title` | `Title 1` | 文本 |
| `bullet_points` | `Content Placeholder 2` | 文本（列表） |
| `image` | `Picture Placeholder 3` | 图片 |

## 3. 实现代码

```python
# In RenderingEngine class

def _handle_text_image_split(self, slide, data):
    """处理器 for text_image_split layout."""
    try:
        # 假设 idx 映射固定
        title_shape = slide.placeholders[0] # Title 1
        content_shape = slide.placeholders[1] # Content Placeholder 2
        image_placeholder_idx = 2 # Picture Placeholder 3

        # 填充文本
        self._fill_text(title_shape, data.get("title"))
        
        items = data.get("bullet_points", [])
        text_frame = content_shape.text_frame
        text_frame.clear()
        for i, item_data in enumerate(items):
            text = item_data.get("text", "")
            p = text_frame.add_paragraph()
            p.text = text
            p.level = 0

        # 填充图片
        image_path = data.get("image_local_path")
        self._fill_image(slide, image_placeholder_idx, image_path)

        logger.info(f"Rendered text_image_split: {data.get(\'title\')}")

    except KeyError as e:
        logger.error(f"Placeholder not found for text_image_split: {e}")
    except Exception as e:
        logger.error(f"Error rendering text_image_split: {e}")
```
