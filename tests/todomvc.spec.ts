import { test, expect } from '@playwright/test';

test.describe('TodoMVC Functionality', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('https://demo.playwright.dev/todomvc');
    await expect(page).toHaveURL(/.*todomvc/);
  });

  test('Test 1 — Add and complete todos', async ({ page }) => {
    // Locators
    const todoInput = page.getByPlaceholder('What needs to be done?');
    const todoItems = page.getByTestId('todo-title');
    const todoCount = page.getByTestId('todo-count');
    const buyMilkItem = page.getByTestId('todo-item').filter({ hasText: 'Buy milk' });
    const writeTestItem = page.getByTestId('todo-item').filter({ hasText: 'Write Playwright test' });

    // Step 1: Add two todo items
    await todoInput.fill('Buy milk');
    await todoInput.press('Enter');
    await todoInput.fill('Write Playwright test');
    await todoInput.press('Enter');

    // Step 2: Verify both items were added and counter is correct
    await expect(todoItems).toHaveText(['Buy milk', 'Write Playwright test']);
    await expect(todoCount).toHaveText(/2 items left/);

    // Step 3: Complete the first todo item
    await buyMilkItem.getByRole('checkbox').check();

    // Step 4: Verify completion state and updated counter
    await expect(buyMilkItem).toHaveClass(/completed/);
    await expect(todoCount).toHaveText(/1 item left/);
    await expect(writeTestItem).not.toHaveClass(/completed/);
  });

  test('Test 2 — Filter behaviour is correct', async ({ page }) => {
    const todoInput = page.getByPlaceholder('What needs to be done?');
    const todoItems = page.getByTestId('todo-title');
    const activeFilter = page.getByRole('link', { name: 'Active' });
    const completedFilter = page.getByRole('link', { name: 'Completed' });
    const allFilter = page.getByRole('link', { name: 'All' });

    // Precondition: Create 3 todos and mark "Task B" as completed
    const tasks = ['Task A', 'Task B', 'Task C'];
    for (const task of tasks) {
      await todoInput.fill(task);
      await todoInput.press('Enter');
    }

    await page.getByTestId('todo-item')
      .filter({ hasText: 'Task B' })
      .getByRole('checkbox')
      .check();

    // 1. Active filter
    await activeFilter.click();
    await expect(todoItems).toHaveText(['Task A', 'Task C']);
    await expect(todoItems).not.toContainText(['Task B']);

    // 2. Completed filter
    await completedFilter.click();
    await expect(todoItems).toHaveText(['Task B']);
    await expect(todoItems).not.toContainText(['Task A', 'Task C']);

    // 3. All filter
    await allFilter.click();
    await expect(todoItems).toHaveText(['Task A', 'Task B', 'Task C']);
  });

});