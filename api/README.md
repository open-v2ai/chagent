# Chagent API

Chagent API is the core component of Chagent, responsible for handling all the API requests and responses.

## Installation

### Install Postgres with Docker

```bash
bash script/run_postgres.sh
bash script/run_redis.sh
```

### Install dependencies
use [uv](https://docs.astral.sh/uv/getting-started/installation/) to install the dependencies.

```bash
uv sync
```

## Configuration

```bash
cp .env.example .env
```

## Usage

```bash
uv run main.py
```

## Project Structure

```bash
/
├── app/
│   ├── __init__.py
│   ├── main.py               # FastAPI 实例创建、路由注册的入口
│   ├── api/                  # 路由相关代码
│   │   ├── __init__.py
│   │   ├── v1/               # 按版本划分 API
│   │   │   ├── __init__.py
│   │   │   ├── routes_user.py
│   │   │   ├── routes_auth.py
│   ├── core/                 # 核心配置、启动配置等
│   │   ├── __init__.py
│   │   ├── config.py         # 读取环境变量、配置文件
│   │   ├── security.py       # 安全相关逻辑，例如密码加密、JWT
│   ├── model/               # 数据模型，通常是 SQLAlchemy 模型
│   │   ├── __init__.py
│   │   ├── user.py
│   ├── schema/              # Pydantic 模型（请求和响应验证）
│   │   ├── __init__.py
│   │   ├── user.py
│   ├── crud/                 # 数据库操作封装（Create, Read, Update, Delete）
│   │   ├── __init__.py
│   │   ├── user.py
│   ├── service/             # 业务逻辑模块
│   │   ├── __init__.py
│   │   ├── user_service.py
│   ├── db/                   # 数据库初始化、会话管理
│   │   ├── __init__.py
│   │   ├── session.py
│   │   ├── base.py           # Base 类定义
│   │   ├── init_db.py
│   ├── dependencies/         # FastAPI 的 Depends 相关逻辑
│   │   ├── __init__.py
│   │   ├── auth.py
│   ├── util/                # 工具函数
│   │   ├── __init__.py
│   │   ├── db.py
├── tests/                    # 测试代码，建议使用 pytest
│   ├── __init__.py
│   ├── test_user.py
├── alembic/                  # 数据库迁移目录（如果使用 Alembic）
│   └── ...
├── .env                      # 环境变量文件
├── requirements.txt
├── README.md
```

