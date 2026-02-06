> 文档版本：v1.0  
> 负责人：Manus AI  
> 最后更新：2026-02-06  
> 状态：draft

# 4. 页面通用结构

在 `PresentationPackage` 的 `slides` 数组中，每一个对象都代表一个独立的PPT页面。为了保证数据的一致性和可解析性，所有页面对象，无论其 `layout_type` 为何，都**必须**包含一组通用的基础字段。我们称这个基础结构为 `SlideBase`。

## 4.1 `SlideBase` 结构定义

`SlideBase` 定义了构成一个页面的最基本元素，包括其身份、布局类型、核心文本内容以及与视觉和校验相关的元数据。

```typescript
interface SlideBase {
  // --- 核心身份与内容字段 ---
  page_id: number;           // 页面的唯一标识，从1开始连续递增
  layout_type: string;       // 页面的版式类型，必须是版式枚举中定义的值
  title?: string;            // (可选) 页面的主标题
  subtitle?: string;         // (可选) 页面的副标题
  speaker_notes?: string;    // (可选) 演讲者备注，用于辅助生成讲稿，不直接显示在页面上

  // --- 视觉与素材字段 ---
  image_search_query?: string; // (可选) 由设计Agent生成，用于描述本页所需背景或插图的搜索查询词
  image_local_path?: string;   // (可选) 由素材填充阶段回填，指向已下载并处理好的本地图片相对路径

  // --- 元数据与校验字段 ---
  design_spec_ref?: string;  // (可选) 指向本页所遵循的具体页面设计规范文档的路径
  page_status?: string;      // (可选) 标记页面的当前状态，如 draft, validated, rework
  validation_errors?: string[]; // (可选) 如果页级校验失败，此处记录具体的错误信息
}
```

## 4.2 字段详解与约束

| 字段 | 类型 | 必填性 | 描述与约束 |
| :--- | :--- | :--- | :--- |
| `page_id` | number | **是** | 页面的唯一页码，必须从 1 开始，并保证在整个 `slides` 数组中是连续且不重复的。 |
| `layout_type` | string | **是** | 必须是 **[版式枚举](./03_layout_types.md)** 中定义的11个有效值之一。 |
| `title` | string | 推荐 | 页面的主标题。除了 `big_quote` 版式外，强烈建议所有页面都提供此字段，以保证内容的结构性。 |
| `subtitle` | string | 否 | 页面的副标题，用于对主标题进行补充说明。 |
| `speaker_notes` | string | 否 | 提供给演讲者的备注信息，可以包含对页面的详细解释、数据来源或演讲提示。 |
| `image_search_query` | string | 否 | 在 Stage 4 (页面规划) 生成，作为 Stage 5 (素材填充) 的输入，指导图片搜索。 |
| `image_local_path` | string | 否 | 在 Stage 5 (素材填充) 生成，指向 `assets/` 目录下的具体图片文件，供渲染引擎使用。 |
| `design_spec_ref` | string | 否 | 指向 `03_specifications/02_design_specs/04_page_specs/` 目录下的具体规范文件，确保设计和渲染的一致性。 |
| `page_status` | string | 否 | 用于追踪页面在校验流程中的状态，便于调试和回滚。 |
| `validation_errors` | string[] | 否 | 当 `page_status` 为 `rework` 或校验失败时，此数组应包含具体的错误代码或描述。 |

除了这些通用字段，每个页面对象还会根据其 `layout_type` 包含一组特定的数据载荷（Payload），用于填充该版式独有的内容。这些专用数据结构在下一章节 **[版式专用数据](./05_layout_specific_payloads.md)** 中有详细定义。
