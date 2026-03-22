# TestSprite Configuration Guide

TestSprite is integrated directly into this repository as a **Model Context Protocol (MCP)** server. This allows AI Assistants in your IDE (like Cursor, VS Code, or GitHub Copilot) to automatically analyze the app and run tests without needing a local test suite file runner.

## 1. Setup Your TestSprite Account
1. Go to [TestSprite.com](https://www.testsprite.com/) and sign up.
2. In your TestSprite Dashboard, generate an API Key.

## 2. Setting Up Your IDE

The IDE configuration depends on the tool you are using. Since we have added `@testsprite/testsprite-mcp` to this project, you can easily point your IDE to it.

### If you are using Cursor IDE:
1. Open Cursor Settings (Settings icon).
2. Go to **Features** > **MCP Servers**.
3. Click **Add new MCP server**.
4. Set **Name** to `TestSprite`.
5. Set **Type** to `command`.
6. Set **Command** to `npx @testsprite/testsprite-mcp`.
7. You may be prompted by the IDE to configure the API Key inside Cursor or as an environment variable (`TESTSPRITE_API_KEY=your_key_here`).

### If you are using Claude Code / Cline in VS Code:
In your global or workspace `cline_mcp_settings.json`, add the server configuration:

```json
{
  "mcpServers": {
    "testsprite": {
      "command": "npx",
      "args": ["-y", "@testsprite/testsprite-mcp"]
    }
  }
}
```

## 3. Usage
Once configured, simply open the AI chat in your IDE and say:

> "Please use the TestSprite MCP server to run tests on the Hero.jsx component."

The AI agent will interact with TestSprite, orchestrate the code context, generate test cases, and execute the tests within its secure backend environment.
