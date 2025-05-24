import asyncio

from agents import Agent, Runner
from agents.mcp import MCPServerSse
from agents.model_settings import ModelSettings


async def run_agent(message: str, mcp_server: MCPServerSse):
    agent = Agent(
        name="Assistant",
        instructions="Use the tools to answer the questions.",
        mcp_servers=[mcp_server],
        model_settings=ModelSettings(tool_choice="required"),
    )

    print(f"Running: {message}")
    result = await Runner.run(starting_agent=agent, input=message)
    print(result.final_output)
    return result.final_output

async def get_agent_response(message: str):
    async with MCPServerSse(
        name="When2buy MCP Server",
        params={
            "url": "https://mcp.when2buy.ai/sse",
        },
    ) as server:
        return await run_agent(message, server)

if __name__ == "__main__":
    asyncio.run(get_agent_response("NVDA 的MACD是多少？"))
