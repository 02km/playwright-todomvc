import { test, expect } from '@playwright/test';

// Test 1 — Add and complete todos
test('Test 1 — Add and complete todos', async ({ page }) => {
  try {
    // Navigate to the TodoMVC site
    await page.goto('https://demo.playwright.dev/todomvc');
    if (!page.url().includes('demo.playwright.dev/todomvc')) {
      throw new Error('Failed to navigate to TodoMVC site');
    }

    // Setup locators using semantic selectors
    const todoInput = page.getByPlaceholder('What needs to be done?');
    const todoItems = page.getByTestId('todo-title');
    const todoCount = page.getByTestId('todo-count');

    // Verify input field is available
    await expect(todoInput).toBeVisible({ timeout: 5000 });

    // Step 1: Add two todo items
    await todoInput.fill('Buy milk');
    await todoInput.press('Enter');
    await todoInput.fill('Write Playwright test');
    await todoInput.press('Enter');

    // Step 2: Verify both items were added and counter is correct
    await expect(todoItems).toHaveText(['Buy milk', 'Write Playwright test'], {
      timeout: 5000
    });
    await expect(todoCount).toHaveText('2 items left', {
      timeout: 5000
    });

    // Step 3: Complete the first todo item
    const buyMilkItem = page.getByTestId('todo-item').filter({ hasText: 'Buy milk' });
    await expect(buyMilkItem).toBeVisible();
    await buyMilkItem.getByRole('checkbox').check();

    // Step 4: Verify completion state and updated counter
    await expect(buyMilkItem).toHaveClass(/completed/, {
      timeout: 5000
    });
    await expect(todoCount).toHaveText('1 item left', {
      timeout: 5000
    });

    // Verify the second item remains active
    const secondItem = page.getByTestId('todo-item').filter({ hasText: 'Write Playwright test' });
    await expect(secondItem).not.toHaveClass(/completed/, {
      timeout: 5000
    });

  } catch (error) {
    const err = error as Error;
    console.error('Test 1 failed:', err.message);
    throw err;
  }
});

// Test 2 — Filter behaviour is correct
test('Test 2 — Filter behaviour is correct', async ({ page }) => {
  try {
    // Navigate to the TodoMVC site
    await page.goto('https://demo.playwright.dev/todomvc');
    if (!page.url().includes('demo.playwright.dev/todomvc')) {
      throw new Error('Failed to navigate to TodoMVC site in Test 2');
    }

    // Setup locators for filter test
    const todoInput = page.getByPlaceholder('What needs to be done?');
    const todoItems = page.getByTestId('todo-title');

    // Verify input field is available
    await expect(todoInput).toBeVisible({ timeout: 5000 });

    // Precondition: Create 3 todos and mark "Task B" as completed
    const tasks = ['Task A', 'Task B', 'Task C'];
    for (const task of tasks) {
      await todoInput.fill(task);
      await todoInput.press('Enter');
    }

    const taskBItem = page.getByTestId('todo-item').filter({ hasText: 'Task B' });
    await expect(taskBItem).toBeVisible();
    await taskBItem.getByRole('checkbox').check();

    // Test Active filter - should only show incomplete tasks
    await page.getByRole('link', { name: 'Active' }).click();
    await expect(todoItems).toHaveText(['Task A', 'Task C'], {
      timeout: 5000
    });
    await expect(todoItems).not.toContainText(['Task B'], {
      timeout: 5000
    });

    // Test Completed filter - should only show completed tasks
    await page.getByRole('link', { name: 'Completed' }).click();
    await expect(todoItems).toHaveText(['Task B'], {
      timeout: 5000
    });
    await expect(todoItems).not.toContainText(['Task A', 'Task C'], {
      timeout: 5000
    });

    // Test All filter - should show all tasks regardless of completion status
    await page.getByRole('link', { name: 'All' }).click();
    await expect(todoItems).toHaveText(['Task A', 'Task B', 'Task C'], {
      timeout: 5000
    });

  } catch (error) {
    const err = error as Error;
    console.error('Test 2 failed:', err.message);
    throw err;
  }
});
