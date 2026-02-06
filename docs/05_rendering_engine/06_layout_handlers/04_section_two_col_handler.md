> 文档版本：v1.0  
> 负责人：Manus AI  
> 最后更新：2026-02-06  
> 状态：stable

# `section_two_col` 处理器实现

## 1. 概述

本处理器负责渲染 `section_two_col` 版式，将内容分为左右两栏文本。

## 2. 占位符映射

| 逻辑名称 | 占位符 `name` 或 `idx` | 类型 |
| :--- | :--- | :--- |
| `title` | `Title 1` | 文本 |
| `left_col_title` | `Text Placeholder 2` | 文本 |
| `left_col_points` | `Content Placeholder 3` | 文本（列表） |
| `right_col_title` | `Text Placeholder 4` | 文本 |
| `right_col_points` | `Content Placeholder 5` | 文本（列表） |

## 3. 实现代码

```python
# In RenderingEngine class

def _handle_section_two_col(self, slide, data):
    """处理器 for section_two_col layout."""
    try:
        # 填充主标题
        self._fill_text(slide.shapes.title, data.get("title"))

        # 处理左栏
        left_title_shape = slide.placeholders[1]
        left_content_shape = slide.placeholders[2]
        left_col_data = data.get("columns", [{}, {}])[0]
        self._fill_text(left_title_shape, left_col_data.get("title"))
        self._fill_bullet_points(left_content_shape, left_col_data.get("points", []))

        # 处理右栏
        right_title_shape = slide.placeholders[3]
        right_content_shape = slide.placeholders[4]
        right_col_data = data.get("columns", [{}, {}])[1]
        self._fill_text(right_title_shape, right_col_data.get("title"))
        self._fill_bullet_points(right_content_shape, right_col_data.get("points", []))

        logger.info(f"Rendered section_two_col: {data.get(\'title\')}")

    except KeyError as e:
        logger.error(f"Placeholder not found for section_two_col: {e}")
    except Exception as e:
        logger.error(f"Error rendering section_two_col: {e}")

# 需要一个通用的 bullet points 填充辅助方法
def _fill_bullet_points(self, shape, points):
    text_frame = shape.text_frame
    text_frame.clear()
    for i, point in enumerate(points):
        p = text_frame.add_paragraph()
        p.text = point
        p.level = 0
```
