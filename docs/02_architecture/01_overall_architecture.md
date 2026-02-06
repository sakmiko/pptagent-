> 文档版本：v1.0  
> 负责人：Manus AI  
> 最后更新：2026-02-06  
> 状态：draft

# 1. 整体架构设计

## 1.1 设计哲学

AutoPPT Agent 的架构设计遵循以下核心哲学：

- **确定性与非确定性分离**：将系统中可预测的、基于规则的部分（如PPT渲染）与充满不确定性的、由AI驱动的部分（如内容生成）彻底分离。这使得我们可以对确定性部分进行严格的单元测试和质量控制，同时为AI的创造性提供灵活的空间。
- **分层与模块化**：系统被划分为清晰的层次——用户界面层、应用逻辑层和数据与服务层。每一层内部都由高度内聚、低耦合的模块组成，便于团队并行开发、独立部署和维护。
- **数据驱动**：各模块间的通信不通过复杂的函数调用，而是通过定义良好的、标准化的中间数据结构（JSON）进行。这使得任何模块都可以被替换，只要它能消费和产出符合协议的数据，极大地增强了系统的灵活性和可扩展性。

## 1.2 核心组件

系统的核心由以下几个关键组件构成：

| 组件 | 职责 | 类型 |
| :--- | :--- | :--- |
| **Web UI** | 提供用户交互界面，接收用户输入，并展示最终结果。 | 前端应用 |
| **Orchestrator** | 作为系统的“大脑”，负责调度和协调整个八阶段流水线，管理任务状态、重试和错误处理。 | 后端服务 |
| **Agent Core** | 一组专门化的智能体（Agent），负责执行从研究、内容规划到设计映射的核心智能任务。 | AI 模块 |
| **Rendering Engine** | 一个确定性的Python脚本，负责将AI生成的结构化数据（JSON）精确地渲染成可编辑的PPT文件。 | 后端模块 |
| **External Services** | 系统依赖的第三方API，如大型语言模型、搜索引擎和图片搜索服务。 | 外部依赖 |

## 1.3 架构图

```mermaid
graph TD
    subgraph "用户界面层"
        WebUI[Web UI (Streamlit/React)]
    end

    subgraph "应用逻辑层"
        Orchestrator[总控调度器]
        AgentCore[Agent Core]
        RenderingEngine[PPT 渲染引擎]
    end

    subgraph "数据与服务层"
        LLM_API[LLM API (OpenAI/Claude)]
        SearchAPI[Search API (Tavily)]
        ImageAPI[Image API (Bing)]
        PPT_Template[PPT 母版库]
        TaskStore[任务数据存储]
    end

    User[用户] --> WebUI
    WebUI <--> Orchestrator
    Orchestrator --> AgentCore
    AgentCore --> Orchestrator
    Orchestrator --> RenderingEngine
    
    AgentCore -.-> LLM_API
    AgentCore -.-> SearchAPI
    AgentCore -.-> ImageAPI

    RenderingEngine -.-> PPT_Template
    RenderingEngine --> TaskStore

    TaskStore --> User
```

## 1.4 交互流程

1.  **用户输入**：用户通过 Web UI 输入一个主题，例如“人工智能的未来”。
2.  **任务创建**：Web UI 将用户请求发送给 Orchestrator，Orchestrator 创建一个新任务，并启动八阶段流水线。
3.  **智能处理**：Orchestrator 依次调用 Agent Core 中的各个 Agent，执行研究、规划、内容生成和设计等任务。在此过程中，Agent 会频繁与外部服务（LLM、搜索等）交互。
4.  **数据生成**：Agent Core 的最终产出是一个结构化的 `Final JSON` 文件，该文件详细描述了每一页PPT的内容、布局和所需素材。
5.  **PPT渲染**：Orchestrator 将 `Final JSON` 传递给 Rendering Engine。
6.  **文件生成**：Rendering Engine 加载指定的 PPT 母版，并根据 `Final JSON` 的内容，使用 `python-pptx` 库逐页构建演示文稿。
7.  **结果交付**：生成的 `.pptx` 文件被保存到任务数据存储中，并通过 Web UI 提供给用户下载。

这种清晰的单向数据流和职责分离，是整个系统稳定、可靠和可维护的基石。
