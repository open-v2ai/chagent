# Chagent = Chat + Agent

Chagent is an open-source platform for developing agent-based applications.

> The pronunciation of Chagent is "chay-jent", similar to the Chinese "qian jin te".

## Features

- [ ] build agent with simple yaml config.
- [ ] chat with agent via web ui.
- [ ] deploy agent with docker.

## Quick Start

> Minimum system requirements:
> - CPU: 1 Core
> - Memory: 2 GB
> - Storage: 10 GB

1. Clone the repository

```bash
git clone https://github.com/open-v2ai/chagent.git
```

2. Install dependencies

```bash
cd chagent/api/
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

3. Run the api server

```bash
python main.py
```

4. Run the web ui

```bash
cd chagent/web/
pnpm install
pnpm dev
```

5. Open your browser and navigate to `http://localhost:3000`

## Contributing

We welcome contributions to Chagent! Please see our [CONTRIBUTING.md](CONTRIBUTING.md) for more information.

## License

Chagent is released under the [Apache License 2.0](LICENSE).

