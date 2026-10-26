import os

from dotenv import load_dotenv

load_dotenv()


def _required_signing_key(name: str) -> str:
    """Refuse missing, short or example signing keys before the API starts."""
    value = (os.getenv(name) or "").strip()
    placeholders = ("replace_", "change_", "your_", "your-", "<")
    if len(value.encode("utf-8")) < 32 or value.lower().startswith(placeholders):
        raise RuntimeError(
            f"{name} must be configured with a unique random secret of at least 32 bytes"
        )
    return value


class Settings:
    # api
    API_NAME: str = os.getenv("API_NAME", "API")
    API_VERSION: str = os.getenv("API_VERSION", "0.0.1")
    API_HOST: str = os.getenv("API_HOST", "0.0.0.0")
    API_PORT: int = int(os.getenv("API_PORT", 8000))
    API_RELOAD: bool = os.getenv("API_RELOAD", "False").lower() in ("true", "1", "yes")
    
    # database
    POSTGRES_URL: str = os.getenv("POSTGRES_URL")
    REDIS_URL: str = os.getenv("REDIS_URL", "redis://localhost:6379/0")

    # security
    SECRET_KEY: str = _required_signing_key("SECRET_KEY")

    # email service
    MAIL_USERNAME: str = os.getenv("MAIL_USERNAME")
    MAIL_PASSWORD: str = os.getenv("MAIL_PASSWORD")
    MAIL_FROM: str = os.getenv("MAIL_FROM")
    MAIL_PORT: int = int(os.getenv("MAIL_PORT", "587"))
    MAIL_SERVER: str = os.getenv("MAIL_SERVER")

    # openai
    OPENAI_API_KEY: str = os.getenv("OPENAI_API_KEY")
    OPENAI_BASE_URL: str = os.getenv("OPENAI_BASE_URL", "https://api.openai.com/v1")
    OPENAI_MODEL: str = os.getenv("OPENAI_MODEL", "gpt-4o-mini")

settings = Settings()
