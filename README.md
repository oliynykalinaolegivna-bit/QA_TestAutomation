# QA_TestAutomation
QA automation JavaScript project with Playwright 

🛠️ Tech Stack

- **Playwright** - End-to-end testing framework
- **TypeScript** - Programming language

📋 Prerequisites

- Node.js
- npm

🚀 Install Playwright:

```bash
npm init playwright@latest
```

▶️ Running Tests

Run all tests:
```bash
npx playwright test
```

Run tests in headed mode (with browser visible):
```bash
npx playwright test --headed
```

Run tests in UI mode:
```bash
npx playwright test --ui
```

Run specific test file:
```bash
npx playwright test login.spec.ts
```

Run tests in debug mode:
```bash
npx playwright test --debug
```

📊 View Test Reports

Generate and open HTML report:
```bash
npx playwright show-report
```

View trace for failed tests:
```bash
npx playwright show-trace test-results/[test-name]/trace.zip
```

🤝 Contributing

1. Create a new branch
2. Make your changes
3. Submit a pull request

📄 License

This project is for educational purposes.

