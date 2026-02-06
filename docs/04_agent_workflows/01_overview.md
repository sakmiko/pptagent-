> 文档版本：v1.0  
> 负责人：Manus AI  
> 最后更新：2026-02-06  
> 状态：draft

# 1. Agent 工作流概述

AutoPPT Agent 的核心是一组协同工作的、专门化的智能体（Agent）。这些 Agent 共同构成了一个强大的认知和执行引擎，负责将用户的高层级意图转化为具体的、可执行的演示文稿生成任务。本章节将概述这些 Agent 的协同工作模式、设计原则以及它们在整个八阶段流水线中扮演的角色。

## 1.1 Agent 协同模式

我们采用了一种**“流水线 + 专家咨询”**的混合协同模式：

- **流水线模式 (Pipeline)**: 大多数 Agent 被组织在一个线性的工作流中，每个 Agent 负责一个特定的连续阶段。它们接收上一阶段的输出，进行处理，然后将结果传递给下一阶段。这保证了任务流程的清晰和可控。

- **专家咨询模式 (Expert Consultation)**: 在某些复杂的决策点，一个主导 Agent（例如 `Text Master Agent`）可以像项目经理一样，临时“咨询”其他专家 Agent（例如 `Design Agent`）来获取特定领域的建议，然后再继续其主要任务。这为系统增加了灵活性。

## 1.2 Agent 设计原则

每个 Agent 的设计都遵循 **S.R.S (Single Responsibility, Stateful, Structured I/O)** 原则：

- **单一职责 (Single Responsibility)**: 每个 Agent 都只负责一项明确、单一的任务（例如，规划搜索查询、生成页面文本、选择布局等）。这使得 Agent 的逻辑更简单、更易于开发、测试和维护。

- **状态化 (Stateful)**: Agent 的执行是围绕一个共享的状态图（State Graph）进行的。这意味着 Agent 可以访问任务的全局上下文，并根据当前状态做出决策。我们使用 LangGraph 来管理这个状态图。

- **结构化输入/输出 (Structured I/O)**: Agent 之间的通信不依赖于非结构化的自然语言聊天，而是通过严格定义的、基于 Pydantic 模型的结构化数据（主要是 JSON）进行。这确保了信息传递的准确性和可靠性。

## 1.3 核心 Agent 角色

| Agent 名称 | 所属阶段 | 核心职责 |
| :--- | :--- | :--- |
| **Query Planner** | Stage 1 | 将用户主题分解为多个可执行的搜索查询。 |
| **Search Sub-Agents** | Stage 2 | 并行执行搜索任务，收集原始信息。 |
| **Research Synthesizer** | Stage 3 | 整合、去重并总结搜索结果，形成研究摘要。 |
| **Text Master Agent** | Stage 4 | 将研究摘要分解为具体的页面内容，撰写标题和要点。 |
| **Design Agent** | Stage 4 | 为每一页的内容选择最合适的布局版式 (`layout_type`)。 |
| **Build Agent** | Stage 5, 6 | 填充素材、调用渲染引擎，并执行页级校验。 |
| **Quality Controller** | Stage 7 | 执行跨页的一致性检查和批量校正。 |

这些 Agent 协同工作，构成了一个从理解、研究、规划到执行的完整闭环，确保了 AutoPPT Agent 能够高效、可靠地完成演示文稿的自动生成任务。
