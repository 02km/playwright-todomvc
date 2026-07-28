# TodoMVC Playwright Test Suite

Hey there! 👋 This is a clean, well-structured Playwright test suite for the [TodoMVC](https://demo.playwright.dev/todomvc) application. I built this to demonstrate modern UI testing practices with Playwright.

## What You'll Need

- **Node.js** (v18 or higher works best)
- A terminal or command prompt
- About 2 minutes to get everything running 🚀

## Let's Get Started

### 1. Clone the project
```bash
cd playwright-todomvc
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up Playwright browsers
```bash
npx playwright install chromium
```

## Running the Tests

Here are the commands I use regularly:

**Run all tests (headless by default):**
```bash
npm test
```
*Pro tip: This runs in the background, perfect for CI/CD pipelines!*

**Watch tests run in the browser:**
```bash
npx playwright test --headed
```
*Great for debugging or when you want to see what's happening*

**Check out the test report:**
```bash
npx playwright show-report
```
*I love this for visualizing test results!*

## What's Inside

```
playwright-todomvc/
├── tests/
│   └── todomvc.spec.ts      # The main test file
├── playwright.config.ts     # Configuration (headless mode, etc.)
├── package.json            # Dependencies
└── README.md               # You're reading this!
```

## What We're Testing

I focused on the core functionality that matters most:

### Test 1: Adding and Completing Todos
This one's pretty straightforward:
- Add two todo items ("Buy milk" and "Write Playwright test")
- Make sure they appear in the list
- Check that the counter shows "2 items left"
- Mark "Buy milk" as completed
- Verify it gets the completed styling and counter updates to "1 item left"

### Test 2: Filter Behavior
This test covers the filter functionality:
- Create 3 tasks and complete one ("Task B")
- Test the **Active** filter (should show only incomplete tasks)
- Test the **Completed** filter (should show only completed tasks)
- Test the **All** filter (should show everything)

## How It's Configured

I set this up to be production-ready:
- **Headless mode** by default (faster execution)
- **Chrome browser** (most common for testing)
- **Parallel test execution** (saves time)
- **Automatic retries** on failure
- **Trace generation** for debugging

## Error Handling - Because Things Break!

I added comprehensive error handling to make debugging easier:
- **Try-catch blocks** around all test logic
- **Custom error messages** that actually tell you what went wrong
- **URL validation** to catch navigation issues early
- **Element visibility checks** before interactions
- **Explicit timeouts** (5000ms) on all assertions

This means if something fails, you'll get a clear error message like:
```
Test 1 failed: Failed to navigate to TodoMVC site
```
Instead of some cryptic Playwright error. Trust me, this saves hours of debugging!

## Why I Built It This Way

I wanted to create a test suite that:
1. **Actually works** - No flaky tests here!
2. **Is easy to understand** - Clear structure and good comments
3. **Follows best practices** - Semantic locators, proper error handling
4. **Is maintainable** - You can actually read and update these tests

## Need Help?

If you run into any issues:
1. Check that you're using Node.js v18+
2. Make sure you ran `npm install` and `npx playwright install chromium`
3. The tests expect the TodoMVC site to be available at the standard URL

Happy testing! 🎉