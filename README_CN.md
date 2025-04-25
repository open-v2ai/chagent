# Chagent = Chat + Agent

Chagent 是一个用于开发基于智能体的应用程序的开源平台。

> Chagent 的读音是 "chay-jent"，类似于中文的 "前进特"。

## 功能特性

- [ ] 通过简单的 yaml 配置文件构建智能体
- [ ] 通过网页界面与智能体对话
- [ ] 使用 docker 部署智能体

## 快速开始

> 最低系统要求：
> - CPU：1 核
> - 内存：2 GB
> - 存储：10 GB

1. 克隆仓库

```bash
git clone https://github.com/open-v2ai/chagent.git
```

2. 安装依赖

```bash
cd chagent/api/
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

3. 运行 API 服务器

```bash
python main.py
```

4. 运行网页界面

```bash
cd chagent/web/
pnpm install
pnpm dev
```

5. 打开浏览器并访问 `http://localhost:3000`

## 贡献指南

我们欢迎对 Chagent 的贡献！更多信息请参阅我们的 [CONTRIBUTING.md](CONTRIBUTING.md)。

## 许可证

Chagent 采用 [Apache License 2.0](LICENSE) 许可证发布。
