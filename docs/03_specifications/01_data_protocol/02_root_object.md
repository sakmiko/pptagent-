> 文档版本：v1.0  
> 负责人：Manus AI  
> 最后更新：2026-02-06  
> 状态：draft

# 2. 根对象结构

所有 AutoPPT Agent 任务的最终数据产物都是一个单一的、结构化的 JSON 对象，我们称之为 `PresentationPackage`。这是连接智能层（Agent Core）和渲染层（Rendering Engine）的核心桥梁。

## 2.1 顶层结构 (`PresentationPackage`)

根对象包含三个主要部分：全局元数据 (`meta`)、页面内容数组 (`slides`) 以及一个可选的运行追踪信息 (`run_trace`)。

```typescript
interface PresentationPackage {
  meta: MetaData;       // 全局元数据，定义演示文稿的整体属性
  slides: SlideItem[];  // 页面数组，其顺序即为PPT的播放顺序
  run_trace?: RunTrace; // (可选) 用于记录和校验任务执行过程的信息
}
```

## 2.2 全局元数据 (`MetaData`)

`meta` 对象描述了整个演示文稿的全局信息，如主题、作者、主题配色等。这些信息将被渲染引擎用于设置演示文稿的属性和全局样式。

### 2.2.1 结构定义

```typescript
interface MetaData {
  topic: string;          // 演示文稿的主题
  author: string;         // 作者信息
  generated_at: string;   // 生成时间 (ISO 8601 格式)
  theme_id: string;       // 主题模板的唯一标识符
  aspect_ratio: string;   // 宽高比，目前固定为 "16:9"
  theme_palette: ThemePalette; // 动态生成的主题色板
}

interface ThemePalette {
  name: string;           // 色板名称
  primary: string;        // 主色 (Hex)
  secondary: string;      // 次要色 (Hex)
  accent: string;         // 强调色 (Hex)
  bg: string;             // 背景色 (Hex)
  surface: string;        // 表面色 (如卡片背景) (Hex)
  text_primary: string;   // 主要文本颜色 (Hex)
  text_secondary: string; // 次要文本颜色 (Hex)
  border: string;         // 边框颜色 (Hex)
  success: string;        // 成功状态色 (Hex)
  warning: string;        // 警告状态色 (Hex)
  danger: string;         // 危险状态色 (Hex)
}
```

### 2.2.2 字段约束

| 字段 | 必填 | 说明 |
| :--- | :--- | :--- |
| `topic` | 是 | 演示文稿的核心主题。 |
| `author` | 是 | 生成方标识，可以是 “AutoPPT Agent” 或指定的用户名称。 |
| `generated_at` | 是 | 任务完成的时间戳，采用 ISO 8601 标准格式。 |
| `theme_id` | 是 | 所使用PPT母版的主题ID，例如 `business_blue_v1`，必须能够映射到一个具体的模板文件。 |
| `aspect_ratio` | 是 | 演示文稿的宽高比，当前版本固定为 `16:9`。 |
| `theme_palette` | 是 | 一个完整的色板对象。此色板由设计 Agent 基于研究摘要的语义和用户偏好动态生成，确保了视觉风格的独特性和高级感。 |

## 2.3 运行追踪 (`RunTrace`, 可选)

`run_trace` 对象是一个可选字段，主要用于开发和调试。它记录了任务在流水线各阶段的执行状态和相关产物的路径，为问题排查和性能分析提供了依据。

### 2.3.1 结构定义

```typescript
interface RunTrace {
  task_id: string;                      // 任务的唯一ID
  stage_status: Record<string, string>; // 各阶段的最终状态 (e.g., { "intake": "ok", ... })
  cross_check_reports: string[];        // 批量校正报告的文件路径列表
}
```

### 2.3.2 示例

```json
{
  "task_id": "20260206_abc123",
  "stage_status": {
    "intake": "ok",
    "query_planning": "ok",
    "parallel_search": "ok",
    "synthesis": "ok",
    "page_build": "ok",
    "batch_cross_check": "ok",
    "render_export": "ok"
  },
  "cross_check_reports": [
    "runs/20260206_abc123/work/cross_check_1.md"
  ]
}
```
