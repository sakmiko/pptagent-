> 文档版本：v1.0  
> 负责人：Manus AI  
> 最后更新：2026-02-06  
> 状态：draft

# 2. 开发环境设置

为了确保所有贡献者都在一个一致、高效的环境中工作，本指南提供了搭建 AutoPPT Agent 本地开发环境的详细步骤。

## 2.1 基础要求

- **Python**: 3.10 或更高版本。
- **Git**: 用于版本控制。
- **Poetry**: 用于依赖管理和虚拟环境。我们推荐使用 Poetry 来代替传统的 `pip` 和 `venv`，因为它能更好地处理复杂的依赖关系和锁定版本。

## 2.2 环境搭建步骤

### 1. 安装 Poetry

如果您尚未安装 Poetry，请根据其[官方文档](https://python-poetry.org/docs/#installation)进行安装。

### 2. 克隆项目

按照 **[贡献指南](./01_contributing_guide.md)** 中的描述，Fork 并克隆项目到您的本地机器。

### 3. 安装项目依赖

进入项目根目录，Poetry 会自动识别 `pyproject.toml` 文件。运行以下命令来创建虚拟环境并安装所有开发和运行时依赖：

```bash
poetry install
```

这会创建一个 `.venv` 目录，其中包含了项目所需的所有库。Poetry 会确保安装 `poetry.lock` 文件中锁定的精确版本，保证了环境的一致性。

### 4. 激活虚拟环境

要在此环境中运行命令或脚本，您可以使用 `poetry run`，或者直接激活虚拟环境的 shell：

```bash
# 方式一：使用 poetry run
poetry run python your_script.py

# 方式二：激活 shell
poetry shell
# 现在您可以直接运行 python, pytest 等命令
(autoppt-agent-py3.10) $ python your_script.py
```

### 5. 配置 Pre-Commit Hooks

为了在代码提交前自动进行格式化和静态检查，我们使用了 `pre-commit` 工具。这有助于保证代码库的风格统一和质量。

安装并配置 pre-commit hooks：

```bash
poetry run pre-commit install
```

现在，每当您运行 `git commit` 时，`pre-commit` 都会自动运行 `black` (代码格式化), `isort` (导入排序) 和 `flake8` (代码质量检查) 等工具。如果发现问题，它会尝试自动修复并中止提交，您只需重新 `git add` 修改后的文件并再次提交即可。

### 6. 配置环境变量

与生产环境类似，开发环境也需要配置 API 密钥。请在项目根目录下创建一个 `.env` 文件，并填入必要的密钥。项目代码会使用 `python-dotenv` 库在启动时自动加载这些变量。

```env
# .env 文件
OPENAI_API_KEY="sk-your_openai_api_key"
TAVILY_API_KEY="tvly-your_tavily_api_key"
BING_SEARCH_V7_SUBSCRIPTION_KEY="your_bing_api_key"
BING_SEARCH_V7_ENDPOINT="https://api.bing.microsoft.com/"
```

## 2.3 运行测试

在进行了代码修改后，请务必运行完整的测试套件，以确保您的更改没有破坏现有功能。

```bash
poetry run pytest
```

## 2.4 总结

完成以上步骤后，您就拥有了一个功能完备、与团队其他成员保持一致的本地开发环境。现在，您可以开始您的贡献之旅了！
