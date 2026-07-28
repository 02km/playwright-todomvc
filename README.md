# TodoMVC Playwright Automation Suite

Automated UI test suite for [TodoMVC](https://demo.playwright.dev/todomvc) using Playwright.

## Prerequisites
- **Node.js**: v18 or higher recommended.

## Setup Instructions

1. Clone or extract the project:
   ```bash
   cd playwright-todomvc
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Install Playwright browser binaries:
   ```bash
   npx playwright install chromium
   ```

## Execution Commands

* **Run all tests (Headless by default):**
   ```bash
   npm test
   ```

   *(or `npx playwright test`)*

* **Run tests in Headed mode (UI visual check):**
   ```bash
   npx playwright test --headed
   ```

* **View HTML Test Report:**
   ```bash
   npx playwright show-report
   ```

## Project Structure

```
playwright-todomvc/
├── tests/
│   └── todomvc.spec.ts      # Main test suite
├── playwright.config.ts     # Playwright configuration
├── package.json            # Project dependencies
└── README.md               # This documentation
```

## Test Coverage

The test suite covers:

1. **Test 1 — Add and complete todos**
   - Adding multiple todo items
   - Verifying item count updates
   - Marking items as completed
   - Verifying completed state and remaining count

2. **Test 2 — Filter behaviour is correct**
   - Creating todos with mixed completion states
   - Testing Active filter (shows only incomplete items)
   - Testing Completed filter (shows only completed items)
   - Testing All filter (shows all items)

## Configuration

The suite is configured to:
- Run in headless mode by default
- Use Chrome browser
- Target the official TodoMVC demo site
- Run tests in parallel
- Generate traces on first retry