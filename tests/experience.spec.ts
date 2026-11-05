import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test('travels through three distinct eras and opens historical snapshots', async ({
  page,
}) => {
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  await page.goto('/')
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'The futurehas a past.',
  )
  await page.getByRole('button', { name: '1950, explore this era' }).click()
  await expect(page.locator('#museum-heading')).toHaveText(
    'Can machines think?',
  )
  await expect(
    page.getByRole('slider', { name: 'Travel year' }),
  ).toHaveAttribute('aria-valuetext', /1950/)
  for (const [year, headline, object] of [
    [1995, 'Welcome tothe world wide web.', 'Power Macintosh 9500'],
    [2010, 'The webgets social.', 'MacBook Air'],
    [2026, 'The futurehas a past.', 'The Apple silicon Mac'],
  ] as const) {
    await page
      .getByRole('button', { name: `${year}, explore this era` })
      .click()
    await expect(page.locator('html')).toHaveAttribute('data-era', String(year))
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(headline)
    await expect(
      page.getByRole('button', { name: `Explore ${object}`, exact: true }),
    ).toBeVisible()
    await expect(
      page.getByRole('button', { name: `${year}, explore this era` }),
    ).toHaveAttribute('aria-pressed', 'true')
  }
  await page.getByRole('button', { name: 'Travel Through Time' }).click()
  await expect(page.locator('#museum-heading')).toBeInViewport()
  expect(errors).toEqual([])
})

test('filters exhibits, opens factual details, and closes the modal with Escape', async ({
  page,
}) => {
  await page.goto('/')
  await page.getByRole('button', { name: 'Programming', exact: true }).click()
  await expect(page.locator('.exhibit-card')).toHaveCount(1)
  const trigger = page.getByRole('button', {
    name: 'Explore TypeScript',
    exact: true,
  })
  await trigger.click()
  const dialog = page.getByRole('dialog', { name: 'TypeScript', exact: true })
  await expect(dialog).toBeVisible()
  await expect(dialog).toContainText('First announced October 2012')
  await expect(dialog.getByRole('link')).toHaveAttribute(
    'href',
    'https://devblogs.microsoft.com/typescript/announcing-typescript/',
  )
  await page.keyboard.press('Escape')
  await expect(dialog).not.toBeVisible()
  await expect(trigger).toBeFocused()
  await page.getByRole('button', { name: /All exhibits/ }).click()
  await expect(page.locator('.exhibit-card')).toHaveCount(6)
  await page
    .getByRole('button', { name: 'Explore AI assistants', exact: true })
    .click()
  await expect(page.locator('.exhibit-dialog')).toContainText(
    'need verification',
  )
  await page.getByRole('button', { name: 'Close exhibit', exact: true }).click()
  await expect(page.locator('.exhibit-dialog')).toHaveCount(0)
})

test('compares categories and eras and swaps without losing the selection', async ({
  page,
}) => {
  await page.goto('/#compare')
  await page
    .getByRole('combobox', { name: 'COMPARE', exact: true })
    .selectOption('mobile')
  await expect(page.locator('.comparison-card').first()).toContainText(
    'Nokia 2110',
  )
  await expect(page.locator('.comparison-card').last()).toContainText(
    'The modern smartphone',
  )
  await page
    .getByRole('combobox', { name: 'Compare from era' })
    .selectOption('2010')
  await expect(page.locator('.comparison-card').first()).toContainText(
    'iPhone 4',
  )
  await page.getByRole('button', { name: 'Swap comparison eras' }).click()
  await expect(
    page.getByRole('combobox', { name: 'Compare from era' }),
  ).toHaveValue('2026')
  await expect(
    page.getByRole('combobox', { name: 'Compare to era' }),
  ).toHaveValue('2010')
  await expect(page.locator('.comparison-card').last()).toContainText(
    'iPhone 4',
  )
  await expect(page.locator('.comparison-caption')).toContainText('16 YEARS')
})

test('opens simulated files and browser pages and restores minimized windows', async ({
  page,
}) => {
  await page.goto('/#desktop')
  const desktop = page.locator('.dtm-desktop')
  await desktop.scrollIntoViewIfNeeded()
  await desktop
    .getByRole('button', { name: 'Local Disk (C:)', exact: true })
    .click()
  await desktop.getByRole('button', { name: 'README.TXT', exact: true }).click()
  const note = desktop.getByRole('dialog', {
    name: 'README.TXT - Notepad',
    exact: true,
  })
  await expect(note).toContainText('WELCOME TO YOUR 1995 DESKTOP')
  await desktop
    .getByRole('button', { name: 'Minimize README.TXT - Notepad', exact: true })
    .click()
  await expect(note).not.toBeVisible()
  await desktop
    .getByRole('button', { name: 'Restore README.TXT - Notepad', exact: true })
    .click()
  await expect(note).toBeVisible()
  await desktop
    .getByRole('button', { name: 'Close README.TXT - Notepad', exact: true })
    .click()
  await desktop.getByRole('button', { name: 'Start menu', exact: true }).click()
  await desktop
    .locator('.win95-start-menu')
    .getByRole('button', { name: 'Internet Explorer', exact: true })
    .click()
  const address = desktop.getByRole('textbox', { name: 'Address', exact: true })
  await address.fill('welcome.local/history')
  await address.press('Enter')
  await expect(desktop.locator('.win95-webpage')).toContainText(
    'Tim Berners-Lee',
  )
  await address.fill('unknown.local')
  await address.press('Enter')
  await expect(desktop.locator('.win95-webpage')).toContainText(
    'This browser is a local simulation',
  )
  const bounds = await desktop
    .getByRole('dialog', { name: 'Internet Explorer', exact: true })
    .boundingBox()
  const screen = await desktop.boundingBox()
  expect(bounds!.x).toBeGreaterThanOrEqual(screen!.x)
  expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(
    screen!.x + screen!.width,
  )
})

test('fits the viewport and respects reduced motion across all eras', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  for (const year of [1995, 2010, 2026]) {
    await page
      .getByRole('button', { name: `${year}, explore this era` })
      .click()
    await expect
      .poll(() =>
        page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
      )
      .toBe(true)
    const headlineFits = await page
      .locator('#hero-title em')
      .evaluate((element) => {
        const bounds = element.getBoundingClientRect()
        return bounds.left >= 0 && bounds.right <= window.innerWidth
      })
    expect(headlineFits).toBe(true)
  }
  expect(
    await page
      .locator('.floating-one')
      .evaluate((element) => getComputedStyle(element).animationName),
  ).toBe('none')
})

test('has no serious or critical accessibility violations', async ({
  page,
}) => {
  test.setTimeout(60_000)
  await page.goto('/')
  for (const year of [2026, 1995, 2010]) {
    await page
      .getByRole('button', { name: `${year}, explore this era` })
      .click()
    await expect(page.locator('.app-shell')).not.toHaveClass(/era-arriving/)
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze()
    const violations = results.violations.filter(
      (violation) =>
        violation.impact === 'critical' || violation.impact === 'serious',
    )
    expect
      .soft(
        violations.map((violation) => ({
          id: violation.id,
          year,
          nodes: violation.nodes.map((node) => ({
            target: node.target,
            summary: node.failureSummary,
          })),
        })),
      )
      .toEqual([])
    await page.locator('.exhibit-card').first().click()
    const dialogResults = await new AxeBuilder({ page })
      .include('.exhibit-dialog')
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze()
    expect
      .soft(
        dialogResults.violations.map((violation) => ({
          id: violation.id,
          year,
          nodes: violation.nodes.map((node) => ({
            target: node.target,
            summary: node.failureSummary,
          })),
        })),
      )
      .toEqual([])
    await page
      .getByRole('button', { name: 'Close exhibit', exact: true })
      .click()
  }
})
