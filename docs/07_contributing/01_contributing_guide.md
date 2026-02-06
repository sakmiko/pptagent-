> 文档版本：v1.0  
> 负责人：Manus AI  
> 最后更新：2026-02-06  
> 状态：draft

# 1. 贡献指南

欢迎您为 AutoPPT Agent 项目贡献代码和智慧！您的每一份贡献都是项目成长的重要动力。为了维护一个高效、协作的开发环境，请您在开始贡献前仔细阅读本指南。

## 1.1 行为准则

我们期望所有贡献者都能遵守社区的行为准则。请保持友好、尊重和建设性的沟通。我们致力于营造一个开放、包容的技术社区环境。

## 1.2 如何贡献

我们欢迎各种形式的贡献，包括但不限于：

- **报告 Bug**: 如果您在使用中发现了 Bug，请通过 GitHub Issues 提交详细的报告。
- **功能建议**: 如果您有关于新功能或改进的想法，欢迎在 GitHub Issues 中创建“Feature Request”。
- **代码贡献**: 修复 Bug 或实现新功能。
- **文档完善**: 改进现有的文档，使其更清晰、更准确。

## 1.3 代码贡献流程

我们采用标准的 GitHub Fork & Pull Request 工作流。

1.  **Fork 项目**: 首先，将主项目仓库 Fork 到您自己的 GitHub 账户下。

2.  **克隆您的 Fork**: 将您 Fork 的仓库克隆到本地。
    ```bash
    git clone https://github.com/YOUR_USERNAME/AutoPPT-Agent.git
    cd AutoPPT-Agent
    ```

3.  **设置上游仓库**: 将原始仓库添加为上游（upstream），以便同步最新的代码。
    ```bash
    git remote add upstream https://github.com/original-owner/AutoPPT-Agent.git
    ```

4.  **创建新分支**: 在进行任何修改之前，请务必从最新的 `main` 分支创建一个新的特性分支。分支命名应清晰地描述其目的，例如 `feat/add-new-layout` 或 `fix/text-overflow-bug`。
    ```bash
    git fetch upstream
    git checkout -b feat/my-awesome-feature upstream/main
    ```

5.  **进行修改**: 在新分支上进行您的代码修改。请遵循项目现有的编码风格和规范。

6.  **提交您的修改**: 使用清晰、规范的提交信息来提交您的代码。我们推荐使用 [Conventional Commits](https://www.conventionalcommits.org/) 规范。
    ```bash
    git add .
    git commit -m "feat: Add support for pie charts in rendering engine"
    ```

7.  **保持分支同步**: 在您开发期间，主仓库可能已经更新。请定期将上游的更改同步到您的分支，以避免冲突。
    ```bash
    git fetch upstream
    git rebase upstream/main
    ```

8.  **推送您的分支**: 将您的特性分支推送到您自己的 Fork 仓库。
    ```bash
    git push origin feat/my-awesome-feature
    ```

9.  **创建 Pull Request (PR)**: 在 GitHub 上，从您的特性分支向原始仓库的 `main` 分支发起一个 Pull Request。
    - 在 PR 的描述中，请详细说明您所做的更改、解决的问题以及任何相关的背景信息。
    - 如果您的 PR 解决了某个 Issue，请使用 `Closes #123` 这样的关键词来关联它。

10. **代码审查**: 项目的维护者会对您的 PR 进行审查。请耐心等待并积极回应审查中提出的问题和建议。审查通过后，您的代码将被合并到主分支中。

## 1.4 编码规范

- **代码风格**: Python 代码请遵循 PEP 8 规范。我们使用 `black` 和 `isort` 来自动格式化代码。
- **测试**: 对于任何新的功能或 Bug 修复，都应添加相应的单元测试或集成测试。
- **文档**: 对于面向用户的功能或 API 的更改，请务必更新相关的文档。

感谢您的贡献！
