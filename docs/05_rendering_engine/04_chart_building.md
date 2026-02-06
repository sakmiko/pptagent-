> 文档版本：v1.0  
> 负责人：Manus AI  
> 最后更新：2026-02-06  
> 状态：draft

# 4. 图表构建规范

在演示文稿中，原生、可编辑的图表远比静态的图表图片更有价值。渲染引擎的图表构建模块（`Chart Builder`）的核心职责就是利用 `python-pptx` 的原生图表功能，将 `chart_config` JSON 数据转化为功能完善、样式统一的 PowerPoint 图表。

## 4.1 图表构建流程

当渲染引擎遇到一个 `chart` 类型的占位符时，`Chart Builder` 必须执行以下流程：

1.  **数据准备**: 
    - 从 `chart_config.data` 中提取图表的类别（`labels`）和系列数据（`values`）。
    - 创建一个 `ChartData` 对象，这是 `python-pptx` 用来定义图表数据源的类。
    - 将 `labels` 和 `values` 填入 `ChartData` 对象。

2.  **图表创建**: 
    - 调用 `slide.shapes.add_chart()` 方法来在幻灯片上创建图表。此方法需要三个关键参数：
      - **图表类型 (`chart_type`)**: 从 `chart_config.type` 字段获取，并映射到 `python-pptx` 的 `XL_CHART_TYPE` 枚举值（例如，`bar` -> `XL_CHART_TYPE.COLUMN_CLUSTERED`）。
      - **位置与尺寸**: 使用图表占位符的 `left`, `top`, `width`, `height` 属性。
      - **图表数据 (`chart_data`)**: 使用上一步创建的 `ChartData` 对象。

3.  **样式化 (Styling)**: 创建图表后，必须对其进行详细的样式化，以符合全局设计规范。
    - **系列颜色**: 遍历图表的每一个系列（`series`），并根据 `theme_palette` 中的主色或其色阶变体来设置其填充颜色。
    - **字体**: 设置图表标题、坐标轴标签、数据标签的字体、字号和颜色，使其与全局字体规范保持一致。
    - **图例 (Legend)**: 根据需要显示或隐藏图例，并设置其位置（通常是底部或右侧）。
    - **网格线 (Gridlines)**: 通常建议移除或淡化背景网格线，以减少视觉干扰，突出数据本身。
    - **数据标签 (Data Labels)**: 根据图表类型，决定是否在数据点上显示其具体数值。

4.  **坐标轴设置**: 
    - 如果 `chart_config` 中提供了 `x_axis_label` 和 `y_axis_label`，则需要设置坐标轴的标题。
    - 可以根据数据的范围，适当调整坐标轴的最大值、最小值和刻度单位，以获得更好的视觉效果。

## 4.2 支持的图表类型

在 v1.0 版本中，渲染引擎必须至少支持以下三种最常用的图表类型：

| `chart_config.type` | `python-pptx` 枚举 | 适用场景 |
| :--- | :--- | :--- |
| `bar` | `XL_CHART_TYPE.COLUMN_CLUSTERED` | 比较不同类别的数据量。 |
| `line` | `XL_CHART_TYPE.LINE` | 显示数据随时间变化的连续趋势。 |
| `pie` | `XL_CHART_TYPE.PIE` | 展示整体的构成比例。 |

## 4.3 核心原则

- **原生优先**: **严禁**使用任何第三方图表库（如 Matplotlib）生成图片再插入的方式。所有图表都**必须**是 `python-pptx` 创建的原生 `GraphicFrame` 对象。这是确保最终用户可以在 PowerPoint 中自由编辑图表数据的唯一途径。
- **数据与表现分离**: 渲染引擎只负责将 `chart_config` 中的数据“翻译”成图表，不应进行任何数据计算或修改。所有的数据准备工作都应在 Agent Core 中完成。

通过遵循此规范，`Chart Builder` 能够确保所有生成的图表不仅在视觉上与演示文稿的整体风格协调一致，更重要的是，它们是“活”的、可交互的，为最终用户提供了最大的灵活性。
