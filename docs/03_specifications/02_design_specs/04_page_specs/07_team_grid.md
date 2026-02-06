> 文档版本：v1.0  
> 负责人：Manus AI  
> 最后更新：2026-02-06  
> 状态：stable

# `team_grid` 设计规范

## 1. 用途

`team_grid` 版式用于在单个页面上同时展示多个团队成员（通常为2-4人）。与 `profile_card` 专注于深入介绍单个人物不同，`team_grid` 的目标是快速、概览式地介绍团队的整体构成。

## 2. 数据协议

### 必需字段

- `title`: 页面的主标题，例如“核心团队”或“项目成员”。
- `profiles`: 一个包含 **2-4 个对象**的数组，每个对象描述一个团队成员的信息。

### 结构定义

`profiles` 数组中的每个对象结构与 `profile_card` 中的定义相同：

```typescript
interface Profile {
  name: string;                // 人物姓名
  role: string;                // 角色或职位
  bio: string;                 // 个人简介
  avatar_local_path?: string;  // (可选) 指向本地头像图片的路径
  avatar_search_query?: string;// (可选) 用于搜索头像的查询词
}
```

### 示例

```json
{
  "page_id": 7,
  "layout_type": "team_grid",
  "title": "项目核心成员",
  "profiles": [
    { "name": "张伟", "role": "项目经理", "bio": "负责项目整体规划与进度管理。", "avatar_search_query": "professional portrait of a young male asian project manager" },
    { "name": "王芳", "role": "首席设计师", "bio": "负责产品的用户体验与视觉设计。", "avatar_search_query": "professional portrait of a young female asian designer" },
    { "name": "赵强", "role": "后端架构师", "bio": "负责系统后端架构设计与开发。", "avatar_search_query": "professional portrait of a male asian software engineer" }
  ]
}
```

## 3. 母版与占位符

- **母版 Layout 名称**: `Team_3` (用于3人团队), `Team_4` (用于4人团队)
- **建议母版索引**: `7` (可能需要根据人数选择不同的母版)
- **必需占位符**: 母版中应包含对应人数的占位符组，例如对于3人团队：
  - `title`: 用于页面主标题。
  - `name_1`, `role_1`, `bio_1`, `avatar_1`
  - `name_2`, `role_2`, `bio_2`, `avatar_2`
  - `name_3`, `role_3`, `bio_3`, `avatar_3`

## 4. 设计与排版规则

- **成员数量**: 此版式严格用于展示 **2-4** 名成员。如果只有1名成员，**必须**使用 `profile_card` 版式。如果超过4名，应考虑拆分为多个页面或只展示核心成员。
- **信息简洁**: 由于空间有限，每个成员的 `bio` 建议不超过 **30** 个中文字符，只保留最核心的信息。
- **视觉一致**: 所有成员卡片的布局、字体、字号和样式必须完全一致，以体现团队的整体性和平等性。
- **对齐**: 所有卡片应在网格中严格对齐，无论是水平方向还是垂直方向。

## 5. 禁用项

- **禁止展示单人**: 严禁使用此版式介绍单个成员。
- **禁止信息量差异过大**: 应避免不同成员简介的文本长度差异过大，以维持视觉上的平衡。

## 6. 验收清单

- [ ] `profiles` 数组中的对象数量在 2-4 个之间。
- [ ] 每个成员的 `name` 和 `role` 字段内容完整。
- [ ] 所有头像图片均已正确填充，且无拉伸或变形。
- [ ] 所有成员卡片布局统一，对齐整齐。
