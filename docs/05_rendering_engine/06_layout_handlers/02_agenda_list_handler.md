> 文档版本：v1.0  
> 负责人：Manus AI  
> 最后更新：2026-02-06  
> 状态：stable

# `agenda_list` 处理器实现

## 1. 概述

本处理器负责渲染 `agenda_list` 版式，用于展示演示文稿的目录或议程。

## 2. 占位符映射

| 逻辑名称 | 占位符 `name` 或 `idx` | 类型 |
| :--- | :--- | :--- |
| `title` | `Title 1` (或 `idx=0`) | 文本 |
| `agenda_items` | `Content Placeholder 2` (或 `idx=1`) | 文本（列表） |

## 3. 实现代码

```python
# In RenderingEngine class

def _handle_agenda_list(self, slide, data):
    """处理器 for agenda_list layout."""
    try:
        title_shape = slide.placeholders[0]
        content_shape = slide.placeholders[1]

        self._fill_text(title_shape, data.get("title", "Agenda"))

        items = data.get("agenda_items", [])
        text_frame = content_shape.text_frame
        text_frame.clear() # 清除默认文本

        for i, item in enumerate(items):
            if i == 0:
                p = text_frame.paragraphs[0]
                p.text = item
            else:
                p = text_frame.add_paragraph()
                p.text = item
            p.level = 0

        logger.info(f"Rendered agenda_list with {len(items)} items.")

    except KeyError as e:
        logger.error(f"Placeholder not found for agenda_list: {e}")
    except Exception as e:
        logger.error(f"Error rendering agenda_list: {e}")
```
