> 文档版本：v1.0  
> 负责人：Manus AI  
> 最后更新：2026-02-06  
> 状态：stable

# `text_image_split` 设计规范

## 1. 用途

`text_image_split` 是演示文稿中最常用、最灵活的版式之一。它适用于绝大多数需要同时展示说明性文字和相关图片的内容页面，例如产品功能介绍、案例分析、或概念阐述。

## 2. 数据协议

### 必需字段

- `title`: 页面的主标题。

### 可选字段

- `content_text`: 一段描述性的正文段落。
- `bullet_points`: 一个字符串数组，用于列出核心要点。
- `image_local_path` 或 `image_search_query`: 页面配图。

**注意**：`content_text` 和 `bullet_points` 至少应提供一个。

### 示例

```json
{
  "page_id": 3,
  "layout_type": "text_image_split",
  "title": "核心功能：智能分析",
  "content_text": "系统能够自动识别和提取关键数据点，为决策提供支持。",
  "bullet_points": [
    "实时数据流处理",
    "多维度指标分析",
    "自动化报告生成"
  ],
  "image_search_query": "data analytics dashboard abstract"
}
```

## 3. 母版与占位符

- **母版 Layout 名称**: `Content_Img_L` (左图右文) 和 `Content_Img_R` (右图左文)
- **建议母版索引**: `2` 和 `3`
- **必需占位符**:
  - `title`: 用于页面主标题。
  - `content`: 用于填充 `content_text` 和 `bullet_points` 的文本框。
  - `image`: 用于配图的图片占位符。

## 4. 设计与排版规则

- **图文平衡**: 图片和文本区域的面积应大致均衡，避免其中一方过分挤压另一方的空间。经典的比例是 5:7、6:6 或 7:5。
- **内容对齐**: 文本区域的顶部应与图片的上边缘对齐，或与图片的视觉中心对齐，以创造稳定的视觉流。
- **降级选择**: 当其他更专门的版式（如 `timeline`, `comparison_table`）因内容不匹配或母版不支持而无法使用时，`text_image_split` 是一个安全可靠的降级选择。
- **交错布局**: 在连续的多页中，可以交替使用左图右文和右图左文的布局，以增加视觉上的变化和节奏感。

## 5. 禁用项

- **避免信息过载**: 尽管此版式灵活，但仍需避免在单页内塞入过多的文本和过于复杂的图片，保持页面的呼吸感。

## 6. 验收清单

- [ ] `title` 字段内容完整。
- [ ] `content_text` 或 `bullet_points` 至少提供一项。
- [ ] 图片已正确填充，且未发生拉伸或变形。
- [ ] 文本内容未溢出文本框。
