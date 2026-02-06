> 文档版本：v1.0  
> 负责人：Manus AI  
> 最后更新：2026-02-06  
> 状态：draft

# 6. 完整 JSON 示例

以下是一个完整的 `PresentationPackage` JSON 对象的示例。这份数据是 Agent Core（智能层）的最终输出，也是 Rendering Engine（渲染层）的直接输入，完整地描述了一份包含6个页面的演示文稿。

```json
{
  "meta": {
    "topic": "2024 新能源汽车市场分析",
    "author": "AutoPPT Agent",
    "generated_at": "2026-02-06T10:00:00Z",
    "theme_id": "business_clean",
    "aspect_ratio": "16:9",
    "theme_palette": {
      "name": "business_clean_blue",
      "primary": "#1E3A8A",
      "secondary": "#334155",
      "accent": "#22D3EE",
      "bg": "#F8FAFC",
      "surface": "#FFFFFF",
      "text_primary": "#0F172A",
      "text_secondary": "#475569",
      "border": "#CBD5E1",
      "success": "#16A34A",
      "warning": "#D97706",
      "danger": "#DC2626"
    }
  },
  "slides": [
    {
      "page_id": 1,
      "layout_type": "cover_page",
      "design_spec_ref": "05_Page_Design_Specs/01_cover_page.md",
      "title": "2024 新能源汽车市场洞察",
      "subtitle": "技术突破与市场格局",
      "image_local_path": "assets/imgs/cover_bg.jpg"
    },
    {
      "page_id": 2,
      "layout_type": "timeline",
      "design_spec_ref": "05_Page_Design_Specs/08_timeline.md",
      "title": "电池技术发展关键节点",
      "timeline_items": [
        { "year": "2020", "title": "磷酸铁锂回归", "desc": "刀片电池提升能量密度" },
        { "year": "2023", "title": "800V 高压平台", "desc": "充电效率提升一倍" },
        { "year": "2025", "title": "全固态电池", "desc": "预计进入量产元年" }
      ]
    },
    {
      "page_id": 3,
      "layout_type": "section_two_col",
      "design_spec_ref": "05_Page_Design_Specs/04_section_two_col.md",
      "title": "增长驱动拆解",
      "left_section": {
        "header": "供给侧",
        "items": ["平台化降本", "电池效率提升", "产业链协同"]
      },
      "right_section": {
        "header": "需求侧",
        "items": ["用户教育完成", "补能体验改善", "智能化感知提升"]
      }
    },
    {
      "page_id": 4,
      "layout_type": "comparison_table",
      "design_spec_ref": "05_Page_Design_Specs/09_comparison_table.md",
      "title": "纯电 vs 增程 技术路线对比",
      "comparison_items": {
        "left": {
          "header": "纯电动 (BEV)",
          "items": ["零排放", "结构简单保养低", "存在里程焦虑"]
        },
        "right": {
          "header": "增程式 (EREV)",
          "items": ["可油可电无焦虑", "结构复杂", "高速油耗较高"]
        }
      }
    },
    {
      "page_id": 5,
      "layout_type": "big_quote",
      "design_spec_ref": "05_Page_Design_Specs/10_big_quote.md",
      "title": "核心结论",
      "quote": "真正的竞争壁垒，是持续迭代效率。",
      "author": "行业研究组"
    },
    {
      "page_id": 6,
      "layout_type": "chart_data",
      "design_spec_ref": "05_Page_Design_Specs/11_chart_data.md",
      "title": "市场渗透率预测",
      "chart_config": {
        "type": "bar",
        "data": [
          { "label": "2023", "value": 25 },
          { "label": "2024E", "value": 35 },
          { "label": "2025E", "value": 48 }
        ],
        "x_axis_label": "年份",
        "y_axis_label": "渗透率 (%)"
      },
      "chart_caption": "数据来源：行业综合预测"
    }
  ]
}
```
