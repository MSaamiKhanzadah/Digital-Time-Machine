import { expect, test, type Page } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

const storageKey = 'dtm.predictions.v1'

async function fillPrediction(
  page: Page,
  title = 'Small computers, big ideas',
) {
  await page.getByRole('textbox', { name: 'Title', exact: true }).fill(title)
  await page
    .getByRole('textbox', { name: 'Your prediction', exact: true })
    .fill('Every library will lend a useful personal robot.')
  await page
    .getByRole('spinbutton', { name: 'Target year', exact: true })
    .fill(String(new Date().getFullYear() + 5))
  await page
    .getByRole('spinbutton', { name: 'Confidence (%)', exact: true })
    .fill('72')
  await page
    .getByRole('textbox', { name: /Reasoning/ })
    .fill('Shared public infrastructure could make the technology accessible.')
}

test('creates, reloads, revisits, edits, cancels, and deletes local predictions', async ({
  page,
}) => {
  await page.goto('/#capsule')
  await page
    .getByRole('button', { name: 'Write your first prediction' })
    .click()
  await fillPrediction(page)
  await page
    .getByRole('button', { name: 'Save prediction', exact: true })
    .click()
  const card = page.getByRole('article', {
    name: 'Prediction: Small computers, big ideas',
    exact: true,
  })
  await expect(card).toBeVisible()
  await expect(page.locator('.capsule-status')).toHaveText(
    'Prediction saved in this browser.',
  )
  const original = await page.evaluate(
    (key) => JSON.parse(localStorage.getItem(key)!)[0],
    storageKey,
  )
  await page.reload()
  await expect(card).toBeVisible()
  await card.getByRole('button', { name: 'Revisit', exact: true }).click()
  await expect(page.locator('.capsule-revisit')).toContainText(
    'Shared public infrastructure',
  )
  await page.getByRole('button', { name: 'Close reflection' }).click()
  await card.getByRole('button', { name: 'Edit', exact: true }).click()
  await page
    .getByRole('textbox', { name: 'Title', exact: true })
    .fill('A discarded draft')
  await page.getByRole('button', { name: 'Cancel', exact: true }).click()
  await expect(card).toBeVisible()
  await expect(
    page.getByRole('article', {
      name: 'Prediction: A discarded draft',
      exact: true,
    }),
  ).toHaveCount(0)
  await card.getByRole('button', { name: 'Edit', exact: true }).click()
  await page
    .getByRole('textbox', { name: 'Title', exact: true })
    .fill('A revised forecast')
  await page
    .getByRole('button', { name: 'Save prediction', exact: true })
    .click()
  const revised = page.getByRole('article', {
    name: 'Prediction: A revised forecast',
    exact: true,
  })
  await expect(revised).toBeVisible()
  const updated = await page.evaluate(
    (key) => JSON.parse(localStorage.getItem(key)!)[0],
    storageKey,
  )
  expect(updated.id).toBe(original.id)
  expect(updated.createdAt).toBe(original.createdAt)
  await revised.getByRole('button', { name: 'Delete', exact: true }).click()
  await expect(
    revised.getByRole('button', { name: 'Keep prediction' }),
  ).toBeFocused()
  await revised.getByRole('button', { name: 'Keep prediction' }).click()
  await expect(revised).toBeVisible()
  await revised.getByRole('button', { name: 'Delete', exact: true }).click()
  await revised.getByRole('button', { name: 'Delete permanently' }).click()
  await expect(
    page.getByRole('button', { name: 'Write your first prediction' }),
  ).toBeVisible()
  expect(
    await page.evaluate((key) => localStorage.getItem(key), storageKey),
  ).toBe('[]')
})

test('keeps corrupt storage untouched and labels new records as session only', async ({
  page,
}) => {
  await page.addInitScript(
    (key) => localStorage.setItem(key, '{broken JSON'),
    storageKey,
  )
  await page.goto('/#capsule')
  await expect(page.getByRole('alert')).toContainText('left untouched')
  await page
    .getByRole('button', { name: 'New prediction', exact: true })
    .click()
  await fillPrediction(page, 'A session-only idea')
  await page.getByRole('button', { name: 'Keep for this session' }).click()
  await expect(
    page.getByRole('article', {
      name: 'Prediction: A session-only idea',
      exact: true,
    }),
  ).toBeVisible()
  await expect(page.locator('.capsule-status')).toContainText(
    'has not been saved',
  )
  expect(
    await page.evaluate((key) => localStorage.getItem(key), storageKey),
  ).toBe('{broken JSON')
})

test('retains valid entries when stored data includes an invalid record', async ({
  page,
}) => {
  await page.addInitScript(
    (key) =>
      localStorage.setItem(
        key,
        JSON.stringify([
          {
            id: 'valid',
            title: 'An earlier forecast',
            prediction: 'More people will build useful tools.',
            createdAt: '2025-01-01T12:00:00.000Z',
            targetYear: 2035,
            confidence: 50,
            reasoning: '',
          },
          { id: 'bad', title: 42 },
        ]),
      ),
    storageKey,
  )
  await page.goto('/#capsule')
  await expect(
    page.getByRole('article', {
      name: 'Prediction: An earlier forecast',
      exact: true,
    }),
  ).toBeVisible()
  await expect(page.getByRole('alert')).toContainText(
    'Some stored capsule data is invalid',
  )
  expect(
    await page.evaluate(
      (key) => JSON.parse(localStorage.getItem(key)!).length,
      storageKey,
    ),
  ).toBe(2)
})

test('write failures retain session data without claiming a successful save', async ({
  page,
}) => {
  await page.addInitScript(() => {
    const originalSet = Storage.prototype.setItem
    Storage.prototype.setItem = function (key, value) {
      if (key === 'dtm.predictions.v1')
        throw new DOMException('Quota exceeded', 'QuotaExceededError')
      return originalSet.call(this, key, value)
    }
  })
  await page.goto('/#capsule')
  await page
    .getByRole('button', { name: 'New prediction', exact: true })
    .click()
  await fillPrediction(page, 'Not yet persisted')
  await page
    .getByRole('button', { name: 'Save prediction', exact: true })
    .click()
  await expect(
    page.getByRole('article', {
      name: 'Prediction: Not yet persisted',
      exact: true,
    }),
  ).toBeVisible()
  await expect(page.getByRole('alert')).toContainText(
    'could not save these changes',
  )
  await expect(page.locator('.capsule-status')).toContainText(
    'has not been saved',
  )
  expect(
    await page.evaluate((key) => localStorage.getItem(key), storageKey),
  ).toBeNull()
  await page.getByRole('button', { name: 'Try saving again' }).click()
  await expect(page.locator('.capsule-status')).toContainText(
    'Browser storage has not saved',
  )
})

test('capsule form and saved collection pass focused accessibility checks', async ({
  page,
}) => {
  await page.goto('/#capsule')
  await page
    .getByRole('button', { name: 'New prediction', exact: true })
    .click()
  await fillPrediction(page)
  expect(
    (await new AxeBuilder({ page }).include('.capsule-explorer').analyze())
      .violations,
  ).toEqual([])
  await page
    .getByRole('button', { name: 'Save prediction', exact: true })
    .click()
  expect(
    (await new AxeBuilder({ page }).include('.capsule-explorer').analyze())
      .violations,
  ).toEqual([])
})
