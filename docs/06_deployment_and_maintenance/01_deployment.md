> 文档版本：v1.0  
> 负责人：Manus AI  
> 最后更新：2026-02-06  
> 状态：draft

# 1. 部署指南

本指南旨在为运维工程师和开发人员提供将 AutoPPT Agent 项目部署到生产环境的详细步骤和最佳实践。

## 1.1 部署架构

为了实现高可用性和可扩展性，我们推荐采用基于容器化的部署架构。

```mermaid
graph TD
    subgraph "用户端"
        User[用户浏览器]
    end
    subgraph "负载均衡"
        LB[Load Balancer (e.g., Nginx, AWS ALB)]
    end
    subgraph "Web 服务 (多个容器)"
        WebApp1[Web App Container 1]
        WebApp2[Web App Container 2]
        WebApp3[...]
    end
    subgraph "任务队列"
        Broker[Message Broker (e.g., RabbitMQ, Redis)]
        Worker1[Worker Container 1]
        Worker2[Worker Container 2]
        Worker3[...]
    end
    subgraph "存储服务"
        DB[数据库 (e.g., PostgreSQL)]
        S3[对象存储 (e.g., AWS S3, MinIO)]
    end

    User --> LB
    LB --> WebApp1
    LB --> WebApp2
    LB --> WebApp3

    WebApp1 --> Broker
    WebApp2 --> Broker
    WebApp3 --> Broker

    Broker --> Worker1
    Broker --> Worker2
    Broker --> Worker3

    Worker1 <--> DB
    Worker1 <--> S3
    Worker2 <--> DB
    Worker2 <--> S3
    Worker3 <--> DB
    Worker3 <--> S3
```

- **Web App**: 一个轻量级的 FastAPI 应用，负责接收用户请求，进行身份验证，并将PPT生成任务推送到消息队列中。它可以水平扩展以应对高并发请求。
- **Message Broker**: 任务队列的中间件，负责任务的分发和持久化，确保任务不丢失。
- **Worker**: 实际执行八阶段流水线的核心进程。每个 Worker 从队列中获取任务，独立完成从研究到渲染的全过程。Worker 进程是计算密集型的，可以根据任务负载进行水平扩展。
- **数据库**: 用于存储任务状态、用户数据和 `Final JSON` 等结构化数据。
- **对象存储**: 用于存储生成的 `.pptx` 文件、研究归档、图片素材等非结构化数据。

## 1.2 部署步骤

### 1. 准备环境

- 准备一个 Kubernetes 集群或一组支持 Docker 的虚拟机。
- 准备数据库和对象存储服务实例。

### 2. 构建 Docker 镜像

项目应包含两个主要的 `Dockerfile`：

- `Dockerfile.webapp`: 用于构建 Web App 镜像。
- `Dockerfile.worker`: 用于构建 Worker 镜像。这个镜像会更大，因为它需要包含所有 Agent 逻辑和渲染引擎的依赖。

构建并推送到容器镜像仓库：

```bash
docker build -f Dockerfile.webapp -t your-repo/autoppt-webapp:latest .
docker push your-repo/autoppt-webapp:latest

docker build -f Dockerfile.worker -t your-repo/autoppt-worker:latest .
docker push your-repo/autoppt-worker:latest
```

### 3. 配置环境变量

无论是使用 Kubernetes 的 `ConfigMap`/`Secret` 还是 Docker Compose 的 `.env` 文件，都需要为 Web App 和 Worker 容器配置以下环境变量：

- `DATABASE_URL`: 数据库连接字符串。
- `S3_ENDPOINT`, `S3_ACCESS_KEY`, `S3_SECRET_KEY`: 对象存储配置。
- `RABBITMQ_URL`: 消息队列连接字符串。
- `OPENAI_API_KEY`, `TAVILY_API_KEY`, `BING_SEARCH_V7_SUBSCRIPTION_KEY`: 所有外部服务的 API 密钥。

### 4. 部署应用

使用 Kubernetes 的 `Deployment` 和 `Service` YAML 文件，或 `docker-compose.yml` 文件来部署所有组件。

- 部署数据库和消息队列（或使用云服务提供商的托管服务）。
- 部署 Web App 服务，并配置负载均衡器将外部流量转发到该服务。
- 部署 Worker 服务，并根据预期负载设置初始的副本数量。

## 1.3 持续集成/持续部署 (CI/CD)

建议建立一个 CI/CD 流水线（例如，使用 GitHub Actions），以实现自动化测试和部署。

- **On Push to `main`**: 触发运行单元测试和集成测试。
- **On Tag (e.g., `v1.1.0`)**: 如果测试通过，则自动构建新的 Docker 镜像，并将其推送到生产环境的部署中（例如，通过更新 Kubernetes 的 Deployment 镜像标签）。
