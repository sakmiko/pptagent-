> 文档版本：v1.0  
> 负责人：Manus AI  
> 最后更新：2026-02-06  
> 状态：stable

# `comparison_table` 处理器实现

## 1. 概述

本处理器负责渲染 `comparison_table` 版式，用于对比两个项目的优劣势。

## 2. 占位符映射

| 逻辑名称 | 占位符 `name` 或 `idx` | 类型 |
| :--- | :--- | :--- |
| `title` | `Title 1` | 文本 |
| `left_header` | `Text Placeholder 2` | 文本 |
| `left_items` | `Content Placeholder 3` | 文本（列表） |
| `right_header` | `Text Placeholder 4` | 文本 |
| `right_items` | `Content Placeholder 5` | 文本（列表） |

## 3. 实现代码

```python
# In RenderingEngine class

def _handle_comparison_table(self, slide, data):
    """处理器 for comparison_table layout."""
    try:
        self._fill_text(slide.shapes.title, data.get("title"))

        comparison_items = data.get("comparison_items", {})
        left_data = comparison_items.get("left", {})
        right_data = comparison_items.get("right", {})

        # 处理左侧
        self._fill_text(slide.placeholders[1], left_data.get("header"))
        self._fill_bullet_points(slide.placeholders[2], left_data.get("items", []))

        # 处理右侧
        self._fill_text(slide.placeholders[3], right_data.get("header"))
        self._fill_bullet_points(slide.placeholders[4], right_data.get("items", []))

        logger.info(f"Rendered comparison_table: {data.get(\'title\')}")

    except KeyError as e:
        logger.error(f"Placeholder not found for comparison_table: {e}")
    except Exception as e:
        logger.error(f"Error rendering comparison_table: {e}")
```
