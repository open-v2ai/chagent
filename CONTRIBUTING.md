# CONTRIBUTING

Thank you for your interest in contributing to Chagent — that’s awesome! We’re truly excited to see the ideas and improvements you’ll bring.

Chagent is an open-source platform for developing conversational agent applications, designed to make building AI agents simpler and more powerful. As we’re still in the early stages, with a small team and limited resources, we’re driven by the vision of creating the best possible agent-building experience. In this journey, every bit of support from the community counts — and we sincerely appreciate yours.

While we move fast and stay agile, we also deeply care about making the contribution experience as smooth as possible for developers like you. That’s why we’ve put together this guide — to help you quickly get familiar with Chagent’s codebase, development flow, and collaboration process, so you can jump right into the fun part.

Like Chagent itself, this guide is a work in progress. If you find anything unclear or outdated as you read through, we’d love your feedback and suggestions to help us make it better — together.

In terms of licensing, please take a minute to read our short [License and Contributor Agreement](./LICENSE). The community also adheres to the [code of conduct](https://github.com/open-v2ai/chagent/blob/main/CODE_OF_CONDUCT.md).

Join the fun, contribute, and let's build something awesome together! 💡✨

Don't forget to link an existing issue or open a new issue in the PR's description.

### Bug reports

> [!IMPORTANT]
> Please make sure to include the following information when submitting a bug report:

- A clear and descriptive title
- A detailed description of the bug, including any error messages
- Steps to reproduce the bug
- Expected behavior
- **Logs**, if available, for backend issues, this is really important, you can find them in docker-compose logs
- Screenshots or videos, if applicable

How we prioritize:

  | Issue Type                                                   | Priority        |
  | ------------------------------------------------------------ | --------------- |
  | Bugs in core functions (cloud service, cannot login, applications not working, security loopholes) | Critical        |
  | Non-critical bugs, performance boosts                        | Medium Priority |
  | Minor fixes (typos, confusing but working UI)                | Low Priority    |

### Feature requests

> [!NOTE]
> Please make sure to include the following information when submitting a feature request:

- A clear and descriptive title
- A detailed description of the feature
- A use case for the feature
- Any other context or screenshots about the feature request

How we prioritize:

  | Feature Type                                                 | Priority        |
  | ------------------------------------------------------------ | --------------- |
  | High-Priority Features as being labeled by a team member     | High Priority   |
  | Popular feature requests from our community feedback board   | Medium Priority |
  | Non-core features and minor enhancements                     | Low Priority    |
  | Valuable but not immediate                                   | Future-Feature  |

## Submitting your PR

### Pull Request Process

1. Fork the repository
2. Before you draft a PR, please create an issue to discuss the changes you want to make
3. Create a new branch for your changes
4. Please add tests for your changes accordingly
5. Ensure your code passes the existing tests
6. Please link the issue in the PR description, `fixes #<issue_number>`
7. Get merged! 

### Setup the project

#### Frontend

For setting up the frontend service, please refer to our comprehensive [guide](https://github.com/open-v2ai/chagent/blob/main/web/README.md) in the `web/README.md` file. This document provides detailed instructions to help you set up the frontend environment properly.

#### Backend

For setting up the backend service, kindly refer to our detailed [instructions](https://github.com/open-v2ai/chagent/blob/main/api/README.md) in the `api/README.md` file. This document contains step-by-step guidance to help you get the backend up and running smoothly.

#### Other things to note

We recommend reviewing this document carefully before proceeding with the setup, as it contains essential information about:
- Prerequisites and dependencies
- Installation steps
- Configuration details
- Common troubleshooting tips

Feel free to reach out if you encounter any issues during the setup process.