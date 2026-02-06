> 文档版本：v1.0  
> 负责人：Manus AI  
> 最后更新：2026-02-06  
> 状态：draft

# 5. 检索协议

本协议定义了在 AutoPPT Agent 的 Stage 2 (并行搜索) 和 Stage 3 (汇总与归档) 之间传递数据的标准格式。它确保了搜索结果的一致性、可追溯性和可解析性，是实现“证据驱动生成”原则的基础。

## 5.1 检索结果包 (`SearchResultBundle`)

`SearchResultBundle` 是每个并行搜索子 Agent 在完成其独立的搜索任务后必须返回的标准数据结构。它封装了关于一次查询的所有信息，包括查询本身、执行元数据以及获取的结果列表。

### 5.1.1 结构定义

```typescript
interface SearchResultBundle {
  task_id: string;            // 归属的顶层任务ID
  query_id: string;           // 本次查询的唯一ID，如 q1, q2
  query_text: string;         // 实际在搜索引擎中执行的查询字符串
  query_intent: string;       // 查询意图的分类，如 market, tech, timeline, people, comparison
  provider: string;           // 搜索引擎提供方，如 tavily, bing, custom
  executed_at: string;        // 查询执行的时间戳 (ISO 8601)
  results: SearchResultItem[];// 搜索结果条目列表
  stats: SearchResultStats;   // 本次查询的统计信息
}
```

### 5.1.2 搜索结果条目 (`SearchResultItem`)

`results` 数组中的每一项都代表一个独立的搜索结果（例如，一个网页链接）。

```typescript
interface SearchResultItem {
  source_id: string;          // 结果的稳定唯一ID，建议使用URL的哈希值
  rank: number;               // 在原始搜索结果中的排名
  url: string;                // 来源URL
  title: string;              // 页面标题
  snippet?: string;           // (可选) 搜索引擎返回的摘要片段
  content_text?: string;      // (可选) 抓取并清洗后的页面正文（可能被截断）
  language?: string;          // (可选) 内容语言
  published_at?: string;      // (可选) 来源的发布时间 (如果可解析)
  captured_at: string;        // 本次抓取的时间戳 (ISO 8601)
  http_status?: number;       // (可选) 抓取时的HTTP状态码
  score_relevance: number;    // 相关性评分 (0-1)
  score_freshness: number;    // 时效性评分 (0-1)
  score_authority: number;    // 权威性评分 (0-1)
  score_final: number;        // 加权后的最终总分 (0-1)
  status: string;             // 条目状态: ok, filtered, failed
  error_code?: string;        // (可选) 如果 status 为 failed，记录错误代码，如 timeout, blocked
}
```

### 5.1.3 统计信息 (`SearchResultStats`)

`stats` 对象提供了对本次查询结果的宏观统计。

```typescript
interface SearchResultStats {
  total_returned: number;     // 搜索引擎返回的总结果数
  kept_after_filter: number;  // 经过初步过滤后保留的结果数
  failed_count: number;       // 抓取或处理失败的结果数
  dedup_count: number;        // 因重复而被移除的结果数
}
```

### 5.1.4 字段约束

- `SearchResultBundle` 中的 `query_id`, `query_text`, `provider`, `executed_at`, `results` 均为必填字段。
- `SearchResultItem` 中的 `url`, `title`, `captured_at`, `score_final`, `status` 均为必填字段。
- 当 `status` 为 `failed` 时，必须提供 `error_code`。
- `score_final` 的计算建议采用加权平均，例如：`relevance * 0.6 + freshness * 0.2 + authority * 0.2`。

## 5.2 检索读取游标 (`SearchReadCursor`)

在 Stage 3 (汇总与归档) 中，为了支持大规模搜索结果的处理和任务的中断恢复，汇总器在读取 `SearchResultBundle` 时会使用一个“游标”（Cursor）来记录其消费进度。

### 5.2.1 结构定义

```typescript
interface SearchReadCursor {
  task_id: string;        // 归属的顶层任务ID
  last_query_id: string;  // 最近一次成功消费的 query_id
  last_source_id: string; // 在该 query_id 下，最近一次成功消费的 source_id
  consumed_count: number; // 已成功消费的结果总数
  updated_at: string;     // 游标最后更新的时间戳 (ISO 8601)
}
```

### 5.2.2 读取规则

- **读取顺序**: 汇总器应首先按 `query_id` 的升序来依次读取多个 `SearchResultBundle` 文件。在单个文件中，应按 `score_final` 的降序来遍历 `results` 数组。
- **去重**: 在消费时，应根据 `source_id` 进行去重，确保同一个来源的信息只被处理一次。
- **错误处理**: 如果遇到 `status` 为 `failed` 的条目，应将其记录到错误日志中，但不应中断整个读取流程。
- **状态更新**: 每成功消费一个条目，都应更新游标的状态，并定期将其持久化，以便在任务中断后可以从上次的位置继续。
