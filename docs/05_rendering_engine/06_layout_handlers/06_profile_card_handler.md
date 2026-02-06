> 文档版本：v1.0  
> 负责人：Manus AI  
> 最后更新：2026-02-06  
> 状态：stable

# `profile_card` 处理器实现

## 1. 概述

本处理器负责渲染 `profile_card` 版式，用于介绍单个核心人物。

## 2. 占位符映射

| 逻辑名称 | 占位符 `name` 或 `idx` | 类型 |
| :--- | :--- | :--- |
| `name` | `Title 1` | 文本 |
| `role` | `Text Placeholder 2` | 文本 |
| `bio` | `Content Placeholder 3` | 文本 |
| `image` | `Picture Placeholder 4` | 图片 |

## 3. 实现代码

```python
# In RenderingEngine class

def _handle_profile_card(self, slide, data):
    """处理器 for profile_card layout."""
    try:
        name_shape = slide.placeholders[0]
        role_shape = slide.placeholders[1]
        bio_shape = slide.placeholders[2]
        image_placeholder_idx = 3

        self._fill_text(name_shape, data.get("name"))
        self._fill_text(role_shape, data.get("role"))
        self._fill_text(bio_shape, data.get("bio"))

        image_path = data.get("image_local_path")
        self._fill_image(slide, image_placeholder_idx, image_path)

        logger.info(f"Rendered profile_card for: {data.get(\'name\')}")

    except KeyError as e:
        logger.error(f"Placeholder not found for profile_card: {e}")
    except Exception as e:
        logger.error(f"Error rendering profile_card: {e}")
```
