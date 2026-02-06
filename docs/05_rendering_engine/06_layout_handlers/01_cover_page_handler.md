> 文档版本：v1.0  
> 负责人：Manus AI  
> 最后更新：2026-02-06  
> 状态：stable

# `cover_page` 处理器实现

## 1. 概述

本处理器负责渲染 `cover_page` 版式。它通常包含一个主标题和一个副标题。

## 2. 占位符映射

| 逻辑名称 | 占位符 `name` 或 `idx` | 类型 |
| :--- | :--- | :--- |
| `title` | `Title 1` (或 `idx=0`) | 文本 |
| `subtitle` | `Subtitle 2` (或 `idx=1`) | 文本 |

## 3. 实现代码

```python
# In RenderingEngine class

def _handle_cover_page(self, slide, data):
    """处理器 for cover_page layout."""
    try:
        # 通过 idx 访问更可靠
        title_shape = slide.placeholders[0]
        subtitle_shape = slide.placeholders[1]

        self._fill_text(title_shape, data.get("title"))
        self._fill_text(subtitle_shape, data.get("subtitle"))
        
        logger.info(f"Rendered cover_page: {data.get('title')}")

    except KeyError as e:
        logger.error(f"Placeholder not found for cover_page: {e}")
    except Exception as e:
        logger.error(f"Error rendering cover_page: {e}")
```
