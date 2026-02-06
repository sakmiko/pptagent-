> 文档版本：v1.0  
> 负责人：Manus AI  
> 最后更新：2026-02-06  
> 状态：draft

# 3. 版式枚举

`layout_type` 是定义页面结构和视觉呈现的核心字段。它是一个枚举字符串，用于告知渲染引擎应该加载哪个PPT母版中的物理版式，并期望接收何种类型的数据载荷。设计 Agent 的主要职责之一就是为每一页内容选择最合适的 `layout_type`。

## 3.1 版式类型定义

下表列出了当前版本支持的所有 `layout_type` 及其语义描述和典型适用场景。

| `layout_type` ID | 对应母版版式名称 | 语义描述 | 适用场景 |
| :--- | :--- | :--- | :--- |
| `cover_page` | Cover Layout | 封面页 | 仅用于演示文稿的第1页，用于展示主标题和副标题。 |
| `agenda_list` | Agenda | 目录/列表页 | 用于展示演示文稿的目录、会议议程或核心要点列表。 |
| `text_image_split` | Text & Image | 图文分栏页 | 最常规的内容页面，通常用于左文右图或右文左图的组合。 |
| `section_two_col` | Two Columns | 双栏文本页 | 用于并列介绍两个对等的概念、方案或信息模块。 |
| `section_four_grid` | Four Grid | 四宫格页 | 适用于需要从四个维度进行分析的场景，如SWOT分析。 |
| `profile_card` | Profile | 人物卡片页 | 用于详细介绍单个核心人物，如团队领导、专家或演讲者。 |
| `team_grid` | Team | 团队展示页 | 用于同时展示多个团队成员（通常为2-4人）。 |
| `timeline` | Timeline | 时间轴页 | 用于按时间顺序展示事件、历史沿革或项目路线图（Roadmap）。 |
| `comparison_table` | Comparison | 对比页 | 用于清晰地对比两个方案、产品或策略的优劣势。 |
| `big_quote` | Quote | 金句页 | 用于突出和强调一个核心观点、引言或结论性陈述。 |
| `chart_data` | Chart | 数据图表页 | 用于展示包含具体统计数据的图表，如柱状图、折线图等。 |

## 3.2 使用约束

为了保证生成PPT的专业性和一致性，`layout_type` 的使用必须遵循以下约束：

1.  **白名单限制**: 设计 Agent 输出的 `layout_type` **必须**是上表中所列的11个值之一，不允许使用任何自定义或未定义的类型。
2.  **封面页规则**: 演示文稿的第1页 **必须** 使用 `cover_page` 版式。
3.  **数据驱动选择**: 版式的选择应由内容驱动。例如，包含时间序列数据的内容应优先选择 `timeline`；包含明确对比关系的内容应优先选择 `comparison_table`。
4.  **载荷匹配**: 每种 `layout_type` 都需要一个与之匹配的特定数据载荷（Payload）。例如，`chart_data` 页面必须在数据中包含 `chart_config` 对象。详细定义请参阅 **[版式专用数据](./05_layout_specific_payloads.md)**。

## 3.3 逻辑版式到母版索引的映射

在 `python-pptx` 库中，版式是通过其在母版中的索引（`slide_layout_idx`）来访问的。因此，我们需要一个从逻辑 `layout_type` 到物理索引的映射关系。这个映射通常在渲染引擎的配置文件中硬编码，并且必须与所使用的 `template.pptx` 文件严格对应。

以下是一个映射配置的示例：

```json
{
  "cover_page": 0,
  "agenda_list": 1,
  "text_image_split": [2, 3], // 索引2为左文右图，3为右文左图
  "section_two_col": 4,
  "section_four_grid": 5,
  "profile_card": 6,
  "team_grid": 7,
  "timeline": 8,
  "comparison_table": 9,
  "big_quote": 10,
  "chart_data": 11
}
```

**注意**: `text_image_split` 这种对称布局通常会对应母版中的两个物理版式，设计 Agent 在选择时可以指定使用哪一个，或者由渲染引擎根据页面上下文（如奇偶页）自动选择。
