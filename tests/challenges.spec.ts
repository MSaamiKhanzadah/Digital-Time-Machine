import { expect, test } from '@playwright/test'

test('builds an HTML homepage, validates real requirements, and isolates preview content', async ({
  page,
}) => {
  await page.goto('/#challenges')
  const editor = page.getByRole('textbox', { name: 'Your 1995 HTML code' })
  await page
    .getByRole('button', { name: 'Check your page', exact: true })
    .click()
  await expect(page.locator('.challenge-feedback')).toContainText('1 of 4')
  await editor.fill(
    '<h1>My 1995 homepage</h1><p>Today I built my first little homepage.</p><a href="#museum">My museum</a>',
  )
  await page
    .getByRole('button', { name: 'Check your page', exact: true })
    .click()
  await expect(page.locator('.challenge-feedback')).toContainText(
    'All four checks passed',
  )
  const preview = page.frameLocator('iframe[title="Your 1995 webpage preview"]')
  await expect(
    preview.getByRole('heading', { name: 'My 1995 homepage' }),
  ).toBeVisible()
  await expect(page.locator('.challenge-preview')).toHaveAttribute(
    'sandbox',
    '',
  )
  await editor.fill(
    '<h1>Safe</h1><script>parent.__challengeExecuted=true</script><p>These five words are still harmless.</p><a href="#museum">Museum</a>',
  )
  await page
    .getByRole('button', { name: 'Check your page', exact: true })
    .click()
  await expect(page.locator('.challenge-feedback')).toContainText('3 of 4')
  expect(await page.evaluate(() => '__challengeExecuted' in window)).toBe(false)
  await page.getByRole('button', { name: 'Reset', exact: true }).click()
  await expect(editor).toHaveValue(/Add your heading/)
})
