# Chagent = Chat + Agent

Chagent is an open-source platform for developing agent-based applications.

> The pronunciation of Chagent is "chay-jent", similar to the Chinese "qian jin te".

[中文 README](README_CN.md)

## Features

- [x] deploy agent with docker and docker-compose.
- [x] chat with agent via web ui.
- [ ] build agent with simple yaml config.

## Quick Start

> ⚠️ Minimum system requirements:
> - CPU: 2 Cores
> - Memory: 4 GB
> - Storage: 20 GB

1. Clone the repository

```bash
git clone https://github.com/open-v2ai/chagent.git
```

2. Run database service

```bash
cd chagent/

# run postgres
bash api/scripts/run_postgres.sh

# run redis
bash api/scripts/run_redis.sh
```

3. Run the api server

> ⚠️ Requirements:
> - Python: >= 3.10 (3.12.10 recommended)
> - uv: >= 0.6 (0.6.16 recommended)

```bash
cd chagent/api/

# install dependencies
uv sync

# activate virtual environment
source venv/bin/activate

# set environment variables
cp .env.example .env
vim .env
# change all the values to your own

# run in dev mode in port 8000
python -m app.main
```

4. Run the web ui

> ⚠️ Requirements:
> - Node.js: >= 18.19.0
> - npm: >= 10.8.2
> - pnpm: >= 10.11.0

```bash
# open a new terminal
cd chagent/web/

# install dependencies
pnpm install

# set environment variables
cp .env.example .env
vim .env
# change all the values to your own

# run in dev mode in port 3000
pnpm dev
```

Then, open your browser and navigate to `http://localhost:3000` to see the web ui.

## Deploy

1. Build the docker image

```bash
cd chagent/

# build the docker image
make build-web
make build-api
```

2. Use docker compose to deploy

> ⚠️ Requirements:
> - Docker: >= 26.0.0
> - Docker Compose: >= 2.25.0

```bash
cd chagent/deploy/

# set environment variables
cp .env.example .env
vim .env
# change all the values to your own

# run in background
docker compose up -d
```

Then, open your browser and navigate to `http://localhost:3000` to see the web ui.

## Contributing

We welcome contributions to Chagent! Please see our [CONTRIBUTING.md](CONTRIBUTING.md) for more information.

## License

Chagent is released under the [Apache License 2.0](LICENSE).


## JWT signing key

Set `SECRET_KEY` to a unique random value before starting the API or Compose stack. Generate it with `openssl rand -hex 32` and store it only in your private environment configuration. Missing, short and example keys are rejected; no fixed signing fallback is provided. If a deployment previously used a shared default, rotate that deployment's key and invalidate its old sessions.
