# TodoMVC Playwright Test Suite

Hey there! 👋 This is a well-structured Playwright test suite for the [TodoMVC](https://demo.playwright.dev/todomvc) application, built to demonstrate modern UI testing practices using TypeScript and Playwright.

## Prerequisites

- **Node.js** (v18 or higher recommended)
- A terminal or command prompt

## Let's Get Started

### 1. Clone & enter the repository
```bash
git clone [https://github.com/02km/playwright-todomvc.git](https://github.com/02km/playwright-todomvc.git)
cd playwright-todomvc

```

### 2. Install dependencies

```bash
npm install

```

### 3. Set up Playwright browser binaries

```bash
npx playwright install chromium

```

---

## Running the Tests

**Run all tests (headless by default):**

```bash
npm test

```

*Runs headlessly in the background — ready for CI/CD pipelines.*

**Watch tests run in the browser:**

```bash
npx playwright test --headed

```

*Great for debugging or watching execution in real time.*

**View the HTML test report:**

```bash
npx playwright show-report

```

---

## Project Structure

```text
playwright-todomvc/
├── tests/
│   └── todomvc.spec.ts      # Core test suite
├── playwright.config.ts     # Playwright configuration
├── package.json             # Scripts & dependencies
└── README.md                # Documentation

```

---

## What We're Testing

### Test 1: Adding and Completing Todos

Verifies core CRUD operations and item counters:

* Adds two todo items (*"Buy milk"* and *"Write Playwright test"*).
* Asserts items appear and the remaining counter displays `"2 items left!"`.
* Marks *"Buy milk"* as completed.
* Asserts completed styling/CSS class and updates the counter to `"1 item left!"`.

### Test 2: Filter Behavior

Verifies dataset filtering displays expected subsets:

* Pre-populates 3 tasks (*Task A*, *Task B*, *Task C*) and completes *Task B*.
* Tests **Active** filter (displays only incomplete tasks: *Task A*, *Task C*).
* Tests **Completed** filter (displays only *Task B*).
* Tests **All** filter (displays all 3 tasks).

---

## Robust Testing — The Playwright Way

I followed idiomatic Playwright principles to ensure reliability without introducing fragile test code:

* **Semantic Locators:** Uses `getByPlaceholder`, `getByRole`, and `getByTestId` to mirror how real users interact with the app.
* **Web-First Assertions:** Leverages Playwright's built-in auto-waiting assertions (`toHaveText`, `toHaveClass`, `toHaveURL`) to eliminate flakiness without needing arbitrary sleep statements.
* **Clean Test Organization:** Uses `test.beforeEach` hooks to encapsulate shared setup and keep individual spec files DRY.
* **Native Debugging Capabilities:** Configured in `playwright.config.ts` to automatically capture trace zips and HTML reports on failure.

---

## Need Help?

If you run into any issues:

1. Ensure Node.js v18+ is installed (`node -v`).
2. Verify browser binaries were installed via `npx playwright install chromium`.

Happy testing! 🎉

```