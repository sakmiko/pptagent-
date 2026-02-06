> 文档版本：v1.0  
> 负责人：Manus AI  
> 最后更新：2026-02-06  
> 状态：stable

# `team_grid` 处理器实现

## 1. 概述

本处理器负责渲染 `team_grid` 版式，用于展示多个团队成员。

## 2. 占位符映射 (以3人网格为例)

| 逻辑名称 | 占位符 `name` 或 `idx` | 类型 |
| :--- | :--- | :--- |
| `title` | `Title 1` | 文本 |
| `member_1_name` | `Text Placeholder 2` | 文本 |
| `member_1_role` | `Text Placeholder 3` | 文本 |
| `member_1_image`| `Picture Placeholder 4`| 图片 |
| `member_2_name` | `Text Placeholder 5` | 文本 |
| `member_2_role` | `Text Placeholder 6` | 文本 |
| `member_2_image`| `Picture Placeholder 7`| 图片 |
| `member_3_name` | `Text Placeholder 8` | 文本 |
| `member_3_role` | `Text Placeholder 9` | 文本 |
| `member_3_image`| `Picture Placeholder 10`| 图片 |

## 3. 实现代码

```python
# In RenderingEngine class

def _handle_team_grid(self, slide, data):
    """处理器 for team_grid layout."""
    try:
        self._fill_text(slide.shapes.title, data.get("title"))

        team_members = data.get("team_members", [])
        for i in range(3): # 假设最多3个成员
            if i < len(team_members):
                member_data = team_members[i]
                name_idx = 1 + i * 3
                role_idx = 2 + i * 3
                image_idx = 3 + i * 3

                self._fill_text(slide.placeholders[name_idx], member_data.get("name"))
                self._fill_text(slide.placeholders[role_idx], member_data.get("role"))
                self._fill_image(slide, image_idx, member_data.get("image_local_path"))

        logger.info(f"Rendered team_grid with {len(team_members)} members.")

    except KeyError as e:
        logger.error(f"Placeholder not found for team_grid: {e}")
    except Exception as e:
        logger.error(f"Error rendering team_grid: {e}")
```
