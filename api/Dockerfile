# base image
FROM python:3.12-slim-bookworm AS base

WORKDIR /app/api

# Install uv
ENV UV_VERSION=0.6.16

RUN pip install --no-cache-dir uv==${UV_VERSION}

FROM base AS packages

# if you located in China, you can use aliyun mirror to speed up
RUN sed -i 's@deb.debian.org@mirrors.aliyun.com@g' /etc/apt/sources.list.d/debian.sources

RUN apt-get update \
    && apt-get install -y --no-install-recommends gcc g++ libc-dev libffi-dev libgmp-dev libmpfr-dev libmpc-dev libpq-dev

# Install Python dependencies
COPY pyproject.toml uv.lock ./
RUN uv sync --locked

# production stage
FROM base AS production

RUN sed -i 's@deb.debian.org@mirrors.aliyun.com@g' /etc/apt/sources.list.d/debian.sources

RUN apt-get update \
    && apt-get install -y --no-install-recommends libpq-dev

# set timezone
ENV TZ=UTC

WORKDIR /app/api

EXPOSE 8000

# Copy Python environment and packages
ENV VIRTUAL_ENV=/app/api/.venv
COPY --from=packages ${VIRTUAL_ENV} ${VIRTUAL_ENV}
ENV PATH="${VIRTUAL_ENV}/bin:${PATH}"

# Copy source code
COPY . /app/api/

ENTRYPOINT ["python", "-m", "app.main"]
