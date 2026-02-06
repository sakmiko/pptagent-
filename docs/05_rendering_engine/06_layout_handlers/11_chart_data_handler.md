> 文档版本：v1.0  
> 负责人：Manus AI  
> 最后更新：2026-02-06  
> 状态：stable

# `chart_data` 处理器实现

## 1. 概述

本处理器负责渲染 `chart_data` 版式，使用 `python-pptx` 的原生图表功能创建图表。

## 2. 占位符映射

| 逻辑名称 | 占位符 `name` 或 `idx` | 类型 |
| :--- | :--- | :--- |
| `title` | `Title 1` | 文本 |
| `chart` | `Chart Placeholder 2` | 图表 |
| `caption`| `Text Placeholder 3` | 文本 |

## 3. 实现代码

```python
from pptx.chart.data import CategoryChartData
from pptx.enum.chart import XL_CHART_TYPE, XL_LEGEND_POSITION
from pptx.util import Inches

# In RenderingEngine class

def _handle_chart_data(self, slide, data):
    """处理器 for chart_data layout."""
    try:
        self._fill_text(slide.shapes.title, data.get("title"))
        self._fill_text(slide.placeholders.get(2), data.get("chart_caption")) # 假设 caption idx=2

        chart_config = data.get("chart_config")
        if not chart_config:
            logger.warning("No chart_config found for chart_data layout.")
            return

        # 1. 准备图表数据
        chart_data = CategoryChartData()
        chart_data.categories = [item['label'] for item in chart_config.get('data', [])]
        chart_data.add_series(
            chart_config.get('series_name', 'Series 1'), 
            [item['value'] for item in chart_config.get('data', [])]
        )

        # 2. 获取图表类型
        chart_type_str = chart_config.get('type', 'bar').upper()
        chart_type_map = {
            'BAR': XL_CHART_TYPE.COLUMN_CLUSTERED,
            'LINE': XL_CHART_TYPE.LINE,
            'PIE': XL_CHART_TYPE.PIE,
        }
        chart_type = chart_type_map.get(chart_type_str, XL_CHART_TYPE.COLUMN_CLUSTERED)

        # 3. 在占位符中创建图表
        chart_placeholder = slide.placeholders[1] # 假设 chart idx=1
        graphic_frame = chart_placeholder.insert_chart(chart_type, chart_data)
        chart = graphic_frame.chart

        # 4. 样式化图表
        chart.has_legend = True
        chart.legend.position = XL_LEGEND_POSITION.BOTTOM
        chart.legend.include_in_layout = False

        # 可选：设置数据标签
        plot = chart.plots[0]
        plot.has_data_labels = True
        data_labels = plot.data_labels
        data_labels.font.size = Pt(12)

        logger.info(f"Rendered chart_data: {data.get(\'title\')}")

    except KeyError as e:
        logger.error(f"Placeholder not found for chart_data: {e}")
    except Exception as e:
        logger.error(f"Error rendering chart_data: {e}")
```
