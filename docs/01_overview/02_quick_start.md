> 文档版本：v1.0  
> 负责人：Manus AI  
> 最后更新：2026-02-06  
> 状态：draft

# 2. 快速开始

本指南将帮助您快速搭建 AutoPPT Agent 的本地开发环境，并成功运行一次完整的PPT生成流程。

## 2.1 环境要求

在开始之前，请确保您的开发环境满足以下要求：

- **Python**: 3.10 或更高版本
- **Git**: 用于克隆项目仓库
- **包管理工具**: `pip`

## 2.2 环境搭建步骤

### 步骤 1: 克隆项目仓库

首先，使用 Git 克隆最新的项目代码到您的本地机器。

```bash
git clone <repository_url>
cd AutoPPT-Agent
```

### 步骤 2: 创建并激活虚拟环境

为了保持项目依赖的隔离，强烈建议您使用虚拟环境。

```bash
python -m venv venv
source venv/bin/activate  # 在 Windows 上使用 `venv\Scripts\activate`
```

### 步骤 3: 安装项目依赖

项目的所有依赖项都记录在 `requirements.txt` 文件中。使用 `pip` 进行安装。

```bash
pip install -r requirements.txt
```

主要的依赖库包括：

| 库 | 用途 |
|---|---|
| `langchain` / `langgraph` | Agent 状态管理与工具调用 |
| `openai` | 调用大语言模型 API |
| `python-pptx` | 生成和操作 `.pptx` 文件 |
| `tavily-python` | 调用 Tavily 搜索引擎 API |
| `fastapi` / `streamlit` | 构建 Web 服务与调试界面 |

### 步骤 4: 配置环境变量

项目运行需要配置一些API密钥和环境变量。请创建一个 `.env` 文件，并填入以下内容：

```env
# OpenAI API 配置
OPENAI_API_KEY="sk-your_openai_api_key"

# Tavily 搜索引擎 API 配置
TAVILY_API_KEY="tvly-your_tavily_api_key"

# Bing 图片搜索 API 配置
BING_SEARCH_V7_SUBSCRIPTION_KEY="your_bing_api_key"
BING_SEARCH_V7_ENDPOINT="https://api.bing.microsoft.com/"
```

请将 `your_..._api_key` 替换为您自己的有效密钥。

## 2.3 运行项目

完成上述步骤后，您可以通过以下命令启动项目的主程序。

### 运行 FastAPI 应用

如果项目使用 FastAPI 作为后端服务，请运行：

```bash
uvicorn app.main:app --reload
```

服务启动后，您可以在 `http://127.0.0.1:8000/docs` 访问 API 文档并进行交互。

### 运行 Streamlit 调试界面

如果项目提供了 Streamlit 调试界面，请运行：

```bash
streamlit run app.py
```

这将启动一个本地Web服务器，您可以在浏览器中打开指定地址，通过图形化界面输入主题并生成PPT。

## 2.4 预期产出

成功运行一次任务后，项目将在 `runs/{task_id}/` 目录下生成一系列文件，其结构如下：

```
runs/{task_id}/
├── research/        # 检索与研究过程的 Markdown 存档
├── output/          # 最终导出的 .pptx 文件
└── qa/              # 质量保证报告
```

您可以打开 `output/` 目录下的 `.pptx` 文件，检查生成结果。该文件应为完全可编辑的原生PowerPoint演示文稿。
