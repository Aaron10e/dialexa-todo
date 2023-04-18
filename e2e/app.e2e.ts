const { test } = require('@playwright/test');

test('loads the application', async ({ page }) => {
  await page.goto('http://localhost:4200');
  const title = await page.title();
  test.expect(title).toBe('Todo');
});

test('AppComponent should render', async ({ page }) => {
  await page.goto('/');
  const appComponent = await page.$('app-root');
  test.expect(appComponent).toBeTruthy();
});

test('Input field should be present', async ({ page }) => {
  await page.goto('/');

  const inputField = await page.$('input[name="itemDescription"]');
  test.expect(inputField).toBeTruthy();
});

test('Adding a todo item', async ({ page }) => {
  await page.goto('/');

  const initialTodoCount = await page.$$eval('.todo-item', (elements: string | any[]) => elements.length);

  // Fill in the input field
  await page.fill('input[name="itemDescription"]', 'Test Todo Item');

  // Press Enter to add the todo item
  await page.press('input[name="itemDescription"]', 'Enter');

  // Check if the new todo item is added
  const todoCount = await page.$$eval('.todo-item', (elements: string | any[]) => elements.length);
  test.expect(todoCount).toBe(initialTodoCount + 1);
});

test('Open add todo dialog', async ({ page }) => {
  await page.goto('/');

  // Click the button to open the add todo dialog
  await page.click('#open-add-dialog'); // Replace with the appropriate selector for the button

  // Check if the dialog is open
  const dialog = await page.$('mat-dialog-container');
  //console.log(dialog);
  test.expect(dialog).toBeTruthy();
});
