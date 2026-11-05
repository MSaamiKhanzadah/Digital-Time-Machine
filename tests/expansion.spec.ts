import { expect, test } from '@playwright/test'

test('visits every historical stop and supports keyboard timeline travel', async ({
  page,
}) => {
  await page.goto('/')
  for (const year of [
    1950, 1960, 1970, 1980, 1990, 1995, 2000, 2005, 2010, 2015, 2020, 2026,
  ]) {
    await page
      .getByRole('button', { name: `${year}, explore this era` })
      .click()
    await expect(page.locator('.timeline-milestone')).toContainText(
      String(year),
    )
    await expect(page.locator('#museum-heading')).not.toBeEmpty()
  }
  const slider = page.getByRole('slider', { name: 'Travel year' })
  await slider.focus()
  await slider.press('Home')
  await expect(slider).toHaveAttribute('aria-valuetext', /1950/)
  await slider.press('ArrowRight')
  await expect(slider).toHaveAttribute('aria-valuetext', /1960/)
})

test('navigates among the three sections and browser history restores the active view', async ({
  page,
}) => {
  await page.goto('/')
  const nav = page.getByRole('navigation', { name: 'Main navigation' })
  await nav.getByRole('link', { name: /Explore Technology/ }).click()
  await expect(page.locator('#explore-heading')).toBeVisible()
  await nav.getByRole('link', { name: /Experience the Past/ }).click()
  await expect(page.locator('#experience-heading')).toBeVisible()
  await page.goBack()
  await expect(page.locator('#explore-heading')).toBeVisible()
  await page.goBack()
  await expect(page.locator('#hero-title')).toBeVisible()
})

test('compares historically appropriate storage media', async ({ page }) => {
  await page.goto('/#compare')
  await page
    .getByRole('combobox', { name: 'COMPARE', exact: true })
    .selectOption('storage')
  await expect(page.locator('.comparison-card').first()).toContainText(
    '3½-inch floppy',
  )
  await expect(page.locator('.comparison-card').last()).toContainText('NVMe')
  await page
    .getByRole('combobox', { name: 'Compare from era' })
    .selectOption('2010')
  await expect(page.locator('.comparison-card').first()).toContainText(
    'USB flash drive',
  )
})

test('feature tabs support arrow keys and browser back restores the previous collection', async ({
  page,
}) => {
  await page.goto('/#explore')
  const first = page.getByRole('tab', { name: 'Evolution atlas' })
  await expect(first).toHaveAttribute('aria-selected', 'true')
  await first.focus()
  await first.press('ArrowRight')
  await expect(page.getByRole('tab', { name: 'AI through time' })).toBeFocused()
  await expect(
    page.getByRole('tab', { name: 'AI through time' }),
  ).toHaveAttribute('aria-selected', 'true')
  await page.goBack()
  await expect(first).toHaveAttribute('aria-selected', 'true')
})
