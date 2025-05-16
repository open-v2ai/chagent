# Chagent API

Chagent API is the core component of Chagent, responsible for handling all the API requests and responses.

## Project Structure

```bash
/
├── app/
│   ├── main.py               # FastAPI instance creation and route registration entry point
│   ├── routers/              # Route related code
│   │   ├── v1/               # API versioning
│   │   │   ├── auth.py
│   │   │   ├── chat.py
│   ├── core/                 # Core configuration, startup settings, etc.
│   │   ├── config.py         # Environment variables and configuration file loading
│   │   ├── security.py       # Security related logic, e.g., password encryption, JWT
│   ├── models/               # Data models, typically SQLAlchemy models
│   │   ├── user.py
│   ├── schemas/              # Pydantic models (request and response validation)
│   │   ├── user.py
│   │   ├── chat.py
│   │   ├── message.py
│   ├── crud/                 # Database operations encapsulation (Create, Read, Update, Delete)
│   │   ├── user.py
│   │   ├── chat.py
│   │   ├── message.py
│   ├── services/             # Business logic modules
│   │   ├── user_service.py
│   │   ├── email_service.py
│   ├── db/                   # Database initialization and session management
│   │   ├── base.py           # Base class definition
│   ├── dependencies/         # FastAPI Depends related logic
│   │   ├── db.py
│   ├── util/                # Utility functions
│   │   ├── db.py
│   ├── templates/           # Email templates
├── alembic/                  # Database migration directory (if using Alembic)
├── scripts/                  # Scripts directory
├── .env.example             # Environment variables file
├── requirements.txt
├── README.md
```

## Get Started

### Install Postgres with Docker

```bash
bash script/run_postgres.sh
bash script/run_redis.sh
```

### Configuration

```bash
cp .env.example .env
# Edit .env file
```

### Local Development

use [uv](https://docs.astral.sh/uv/getting-started/installation/) to install the dependencies.

```bash
uv sync
```

```bash
source .venv/bin/activate

python -m app.main
```

### Run with Docker

```bash
docker build -t chagent-api:0.1.0 .

docker run -d --name chagent-api \
    -p 8000:8000 \
    -v $(pwd)/.env:/app/api/.env \
    chagent-api:0.1.0
```
