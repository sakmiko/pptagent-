> 文档版本：v1.0  
> 负责人：Manus AI  
> 最后更新：2026-02-06  
> 状态：draft

# 2. 监控与日志规范

对一个复杂的分布式 AI 系统而言，建立完善的监控和日志体系是保障其稳定运行、快速排查问题和持续优化的生命线。

## 2.1 监控 (Monitoring)

我们建议从三个层面进行监控：系统层、应用层和业务层。

### 2.1.1 系统层监控

- **目标**: 监控底层基础设施的健康状况。
- **工具**: Prometheus + Grafana, Datadog, 或云服务商自带的监控工具。
- **关键指标**:
  - **CPU / 内存使用率**: 监控 Web App 和 Worker 节点的资源消耗，及时发现资源瓶颈或内存泄漏。
  - **磁盘空间**: 监控日志和临时文件存储空间的占用情况。
  - **网络 I/O**: 监控网络流量，特别是在与外部 API 和对象存储交互时。

### 2.1.2 应用层监控

- **目标**: 监控应用程序本身的性能和健康状况。
- **工具**: APM (Application Performance Monitoring) 工具，如 Sentry, New Relic, SkyWalking。
- **关键指标**:
  - **API 延迟 (Latency)**: Web App 响应用户请求的平均和 P95/P99 延迟。
  - **API 错误率**: Web App 返回 4xx/5xx 错误的比例。
  - **任务队列深度 (Queue Depth)**: 消息队列中待处理任务的数量。如果该值持续增长，说明 Worker 的处理能力不足，需要扩容。
  - **Worker 任务执行时长**: 每个PPT生成任务从开始到结束的平均和 P95/P99 时长。
  - **外部 API 调用延迟与错误率**: 监控对 OpenAI, Tavily 等第三方服务调用的性能和成功率。

### 2.1.3 业务层监控

- **目标**: 从业务角度衡量系统的产出质量和用户体验。
- **工具**: 自建仪表盘（Dashboard），数据源可以来自数据库或日志聚合系统。
- **关键指标**:
  - **任务成功率**: 成功生成PPT的任务占总任务的比例。
  - **各阶段失败率**: 任务在八阶段流水线的哪个阶段失败得最多，这有助于定位核心瓶颈。
  - **平均生成页数**: 用户平均生成的PPT页数。
  - **版式使用频率**: 各种 `layout_type` 被使用的频率分布，有助于指导后续的设计优化。
  - **用户反馈统计**: 统计用户报告的“内容幻觉”、“格式崩溃”等问题的数量。

## 2.2 日志 (Logging)

### 2.2.1 日志格式

所有服务都应采用结构化的日志格式（如 JSON），以便于机器解析和查询。

```json
{
  "timestamp": "2026-02-06T10:30:00.123Z",
  "level": "INFO",
  "service": "worker",
  "task_id": "task-12345",
  "stage": "page_planning",
  "message": "Page 5 layout selected",
  "details": {
    "page_id": 5,
    "selected_layout": "comparison_table",
    "reason": "Content contains strong comparison semantics."
  }
}
```

- **`task_id`**: 必须在日志中包含任务的唯一ID，以便能够筛选出单个任务的全链路日志。

### 2.2.2 日志级别

- **DEBUG**: 用于开发调试，记录详细的变量值和函数调用信息。
- **INFO**: 记录关键的业务流程节点，如任务开始、阶段完成、重要决策等。
- **WARN**: 记录非致命的异常情况，例如，图片下载失败后使用降级占位图。
- **ERROR**: 记录导致当前操作失败的错误，例如，API 调用失败、JSON 解析错误等。
- **CRITICAL**: 记录导致整个服务或任务崩溃的严重错误。

### 2.2.3 日志收集与查询

- **工具**: ELK Stack (Elasticsearch, Logstash, Kibana) 或 EFK Stack (Elasticsearch, Fluentd, Kibana), Datadog Logs, Grafana Loki。
- **流程**: 应用程序将日志输出到 `stdout`，由容器运行时（如 Docker）捕获，然后由日志收集代理（如 Fluentd）发送到中央日志存储系统（如 Elasticsearch）。
- **查询**: 开发和运维人员可以通过 Kibana 等工具，使用 `task_id` 等字段快速查询和分析特定任务或服务的日志。

## 2.3 告警 (Alerting)

基于上述监控指标，应设置关键的告警规则。

- **规则示例**:
  - 如果 Web App 的 API 错误率在5分钟内持续高于 5%，发送告警。
  - 如果任务队列深度在10分钟内持续超过 100，发送告警。
  - 如果 Worker 的 CPU 使用率持续超过 90%，发送告警。
  - 如果对 OpenAI API 的调用错误率超过 20%，发送告警。
- **通知渠道**: PagerDuty, Slack, Email 等。
