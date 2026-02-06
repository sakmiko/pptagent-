> 文档版本：v1.0  
> 负责人：Manus AI  
> 最后更新：2026-02-06  
> 状态：draft

# AutoPPT Agent 开发文档

欢迎来到 AutoPPT Agent 项目的官方开发文档。本文档旨在为所有参与本项目的开发者、设计师、测试工程师和运维工程师提供全面、准确、及时的信息。

## 1. 文档导览

本文档库按角色和功能模块进行组织，以确保您能快速找到所需信息。

- **[项目概览 (01_overview)](./01_overview/)**: 新成员的起点，包含项目介绍、快速开始指南、系统架构和技术栈。
- **[架构设计 (02_architecture)](./02_architecture/)**: 深入了解项目的架构决策，包括整体设计、流水线、数据流和风险管理。
- **[规范文档 (03_specifications)](./03_specifications/)**: 所有开发者都必须遵守的规范，包括数据协议、设计规范、代码和API标准。
- **[Agent 工作流 (04_agent_workflows)](./04_agent_workflows/)**: 描述了各个智能体（Agent）的协同工作模式和具体职责，包括研究、内容生成和制作校验流程。
- **[渲染引擎 (05_rendering_engine)](./05_rendering_engine/)**: 渲染引擎的完整实现文档，包括 python-pptx 能力分析、核心实现代码和各版式处理器。
- **[部署与维护 (06_deployment_and_maintenance)](./06_deployment_and_maintenance/)**: 部署架构、步骤、监控指标、日志规范和告警策略。
- **[贡献指南 (07_contributing)](./07_contributing/)**: 为开源贡献者提供的参与项目开发的完整指南，包括贡献流程和开发环境搭建。
- **[Agent 系统提示词 (08_agent_prompts)](./08_agent_prompts/)**: 为每个 Agent 提供详细的系统提示词（System Prompt），定义 Agent 的行为规范。
- **[技术栈与设计 (09_tech_and_design)](./09_tech_and_design/)**: 完整的前后端技术栈说明和前端 UI 设计规范。
- **[实现指南 (10_implementation_guides)](./10_implementation_guides/)**: 各模块的详细代码实现指南和最佳实践。
- **[背景生成系统 (11_background_generation_system)](./11_background_generation_system/)**: 可编程的 Python 背景生成器、预设背景库和母版复用机制，实现高质量、可定制的演示文稿背景。

## 2. 角色阅读指南

为了提高效率，我们为不同角色的团队成员推荐了首次阅读的路径：

- **架构师**: `01_overview` -> `02_architecture` -> `03_specifications/01_data_protocol`
- **AI Agent 开发者**: `01_overview` -> `04_agent_workflows` -> `08_agent_prompts`
- **渲染引擎开发者**: `05_rendering_engine/00_python_pptx_capabilities.md` -> `05_rendering_engine/05_core_renderer_implementation.md` -> `05_rendering_engine/06_layout_handlers`
- **前端开发者**: `01_overview` -> `09_tech_and_design/02_frontend_style_guide.md` -> `03_specifications/02_design_specs`
- **设计师**: `03_specifications/02_design_specs` -> `03_specifications/02_design_specs/04_page_specs` -> `11_background_generation_system`
- **运维工程师**: `01_overview` -> `06_deployment_and_maintenance`

## 3. 核心原则

- **单一事实来源**: 本文档是所有开发工作的权威参考。
- **文档驱动开发**: 在编码之前，先在文档中清晰地定义接口和行为。
- **持续更新**: 文档应与代码同步发展。任何架构、设计或接口的变更都必须首先在文档中得到体现。

## 4. 贡献

我们鼓励所有团队成员积极贡献，共同维护这份文档。如果您发现任何错误、过时或不清晰的内容，请遵循我们的文档更新流程提交修改。

---

让我们开始构建一个出色的产品！
