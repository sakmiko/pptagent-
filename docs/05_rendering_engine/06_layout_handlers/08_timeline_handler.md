> 文档版本：v1.0  
> 负责人：Manus AI  
> 最后更新：2026-02-06  
> 状态：stable

# `timeline` 处理器实现

## 1. 概述

本处理器负责渲染 `timeline` 版式，用于按时间顺序展示一系列事件。

## 2. 占位符映射 (以4个节点为例)

| 逻辑名称 | 占位符 `name` 或 `idx` | 类型 |
| :--- | :--- | :--- |
| `title` | `Title 1` | 文本 |
| `item_1_year` | `Text Placeholder 2` | 文本 |
| `item_1_title`| `Text Placeholder 3` | 文本 |
| `item_1_desc` | `Content Placeholder 4`| 文本 |
| `item_2_year` | `Text Placeholder 5` | 文本 |
| `item_2_title`| `Text Placeholder 6` | 文本 |
| `item_2_desc` | `Content Placeholder 7`| 文本 |
| ... | ... | ... |

## 3. 实现代码

```python
# In RenderingEngine class

def _handle_timeline(self, slide, data):
    """处理器 for timeline layout."""
    try:
        self._fill_text(slide.shapes.title, data.get("title"))

        timeline_items = data.get("timeline_items", [])
        for i in range(4): # 假设最多4个节点
            if i < len(timeline_items):
                item_data = timeline_items[i]
                year_idx = 1 + i * 3
                title_idx = 2 + i * 3
                desc_idx = 3 + i * 3

                self._fill_text(slide.placeholders[year_idx], item_data.get("year"))
                self._fill_text(slide.placeholders[title_idx], item_data.get("title"))
                self._fill_text(slide.placeholders[desc_idx], item_data.get("desc"))

        logger.info(f"Rendered timeline with {len(timeline_items)} items.")

    except KeyError as e:
        logger.error(f"Placeholder not found for timeline: {e}")
    except Exception as e:
        logger.error(f"Error rendering timeline: {e}")
```
