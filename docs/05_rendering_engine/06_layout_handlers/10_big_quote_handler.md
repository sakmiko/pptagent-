> 文档版本：v1.0  
> 负责人：Manus AI  
> 最后更新：2026-02-06  
> 状态：stable

# `big_quote` 处理器实现

## 1. 概述

本处理器负责渲染 `big_quote` 版式，用于突出显示一句核心引言。

## 2. 占位符映射

| 逻辑名称 | 占位符 `name` 或 `idx` | 类型 |
| :--- | :--- | :--- |
| `quote` | `Content Placeholder 2` (或 `idx=1`) | 文本 |
| `author` | `Text Placeholder 3` (或 `idx=2`) | 文本 |

## 3. 实现代码

```python
# In RenderingEngine class

def _handle_big_quote(self, slide, data):
    """处理器 for big_quote layout."""
    try:
        # 通常 quote 占位符 idx=1, author idx=2
        quote_shape = slide.placeholders[1]
        author_shape = slide.placeholders[2]

        self._fill_text(quote_shape, data.get("quote"))
        self._fill_text(author_shape, data.get("author"))

        logger.info(f"Rendered big_quote: {data.get(\'quote\')[:30]}...")

    except KeyError as e:
        logger.error(f"Placeholder not found for big_quote: {e}")
    except Exception as e:
        logger.error(f"Error rendering big_quote: {e}")
```
