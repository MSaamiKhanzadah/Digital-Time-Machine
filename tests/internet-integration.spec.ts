import { expect, test } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test('all website launch restrictions are honest and the site stays selected through time', async ({
  page,
}) => {
  await page.goto('/#web-lab')
  const browser = page.locator('.web-lab').first()
  for (const [site, year] of [
    ['google', '1998'],
    ['youtube', '2005'],
    ['wikipedia', '2001'],
    ['facebook', '2004'],
  ] as const) {
    await browser
      .getByRole('combobox', { name: 'Website', exact: true })
      .selectOption(site)
    await browser
      .getByRole('combobox', { name: 'Browser year', exact: true })
      .selectOption('1995')
    await expect(browser.locator('.web-lab-unavailable')).toContainText(year)
    await browser.locator('.web-lab-unavailable').getByRole('button').click()
    await expect(
      browser.getByRole('combobox', { name: 'Website', exact: true }),
    ).toHaveValue(site)
    await expect(
      browser.getByRole('combobox', { name: 'Browser year', exact: true }),
    ).toHaveValue(year)
    await expect(browser.locator('.web-lab-unavailable')).toHaveCount(0)
  }
})

test('two versions of the encyclopedia remain independent and have unique form controls', async ({
  page,
}) => {
  await page.goto('/#web-lab')
  await page
    .getByRole('button', { name: 'Compare websites', exact: true })
    .click()
  const comparison = page.getByRole('region', { name: 'Website comparison' })
  const earlier = comparison.locator('[aria-label="Earlier website"]')
  const later = comparison.locator('[aria-label="Later website"]')
  await page
    .getByRole('combobox', { name: 'Comparison website', exact: true })
    .selectOption('wikipedia')
  for (const pane of [earlier, later])
    await expect(
      pane.getByRole('combobox', { name: 'Website', exact: true }),
    ).toHaveValue('wikipedia')
  await earlier
    .getByRole('combobox', { name: 'Browser year', exact: true })
    .selectOption('2010')
  const first = earlier.getByRole('searchbox', {
    name: 'Search Wikipedia recreation',
    exact: true,
  })
  const second = later.getByRole('searchbox', {
    name: 'Search Wikipedia recreation',
    exact: true,
  })
  expect(await first.getAttribute('id')).not.toBe(
    await second.getAttribute('id'),
  )
  await first.fill('packet')
  await first.press('Enter')
  await expect(earlier.locator('.hs-wiki-results')).toContainText('Internet')
  await second.fill('intelligence')
  await second.press('Enter')
  await expect(later.locator('.hs-wiki-results')).toContainText(
    'Artificial intelligence',
  )
  await expect(first).toHaveValue('packet')
})

test('historical site scenes have no serious accessibility violations', async ({
  page,
}) => {
  test.setTimeout(60_000)
  await page.goto('/#web-lab')
  const browser = page.locator('.web-lab').first()
  await browser
    .getByRole('combobox', { name: 'Browser year', exact: true })
    .selectOption('2026')
  for (const site of ['youtube', 'amazon', 'wikipedia', 'facebook']) {
    await browser
      .getByRole('combobox', { name: 'Website', exact: true })
      .selectOption(site)
    const results = await new AxeBuilder({ page })
      .include('.web-lab-browser')
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze()
    expect
      .soft(
        results.violations
          .filter((v) => v.impact === 'serious' || v.impact === 'critical')
          .map((v) => ({
            site,
            id: v.id,
            nodes: v.nodes.map((n) => ({
              target: n.target,
              summary: n.failureSummary,
            })),
          })),
      )
      .toEqual([])
  }
})
