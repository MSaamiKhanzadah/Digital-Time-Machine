import { expect, test } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

for (const year of [1998, 2010, 2026]) {
  test(`${year} searches the local web and preserves pages through browser navigation`, async ({
    page,
  }) => {
    const errors: string[] = []
    page.on('pageerror', (error) => errors.push(error.message))
    await page.goto('/#web-lab')
    const lab = page.locator('.web-lab')
    const browser = lab.locator('.web-lab-browser')
    await lab
      .getByRole('button', { name: `${year} web era`, exact: true })
      .click()
    await expect(browser).toHaveAttribute('data-year', String(year))
    await expect(lab.locator(`.web-lab-google-${year}`)).toBeVisible()
    await expect(lab).toContainText('Original educational recreation')

    const search = lab.getByRole('searchbox', {
      name: 'Search the recreated web',
      exact: true,
    })
    await search.fill('history of the web')
    await search.press('Enter')
    await expect(
      lab.getByRole('heading', {
        name: 'Search results for “history of the web”',
        exact: true,
      }),
    ).toBeVisible()
    await expect(search).toHaveValue('history of the web')
    await expect(lab.locator('.web-lab-result-link').first()).toHaveText(
      'How the World Wide Web began',
    )
    await lab.locator('.web-lab-result-link').first().click()
    const reading = lab.locator('.web-lab-reading')
    await expect(
      reading.getByRole('heading', { name: 'How the World Wide Web began' }),
    ).toBeVisible()

    await lab
      .getByRole('button', { name: 'Browser Refresh', exact: true })
      .click()
    await expect(reading).toBeVisible()
    await expect(
      reading.getByRole('heading', { name: 'How the World Wide Web began' }),
    ).toBeVisible()
    await lab.getByRole('button', { name: 'Browser Back', exact: true }).click()
    await expect(search).toHaveValue('history of the web')
    await expect(
      lab.getByRole('heading', {
        name: 'Search results for “history of the web”',
        exact: true,
      }),
    ).toBeVisible()
    await lab
      .getByRole('button', { name: 'Browser Forward', exact: true })
      .click()
    await expect(reading).toBeVisible()
    await lab.getByRole('button', { name: 'Browser Home', exact: true }).click()
    await expect(lab.locator(`.web-lab-google-${year}`)).toBeVisible()
    await expect(search).toHaveValue('')
    expect(errors).toEqual([])
  })
}

test('keeps the selected local page when changing years and explains the pre-Google era', async ({
  page,
}) => {
  await page.goto('/#web-lab')
  const lab = page.locator('.web-lab')
  await lab.getByRole('button', { name: '1998 web era', exact: true }).click()
  const search = lab.getByRole('searchbox', {
    name: 'Search the recreated web',
    exact: true,
  })
  await search.fill('computer history')
  await lab.getByRole('button', { name: 'Google Search', exact: true }).click()
  for (const year of [2010, 2026]) {
    await lab
      .getByRole('button', { name: `${year} web era`, exact: true })
      .click()
    await expect(search).toHaveValue('computer history')
    await expect(
      lab.getByRole('heading', {
        name: 'Search results for “computer history”',
        exact: true,
      }),
    ).toBeVisible()
  }
  await lab.getByRole('button', { name: '1995 web era', exact: true }).click()
  await expect(lab).toContainText('Google wasn’t here yet.')
  await expect(lab).toContainText('1998')
  await expect(
    lab.getByRole('searchbox', {
      name: 'Search the recreated web',
      exact: true,
    }),
  ).toHaveCount(0)
  await lab.getByRole('button', { name: '1998 web era', exact: true }).click()
  await expect(search).toHaveValue('computer history')
})

test('handles unknown addresses locally and explains the changing web', async ({
  page,
}) => {
  await page.goto('/#web-lab')
  const lab = page.locator('.web-lab')
  await lab.getByRole('button', { name: '2026 web era', exact: true }).click()
  const address = lab.getByRole('textbox', {
    name: 'Simulated web address',
    exact: true,
  })
  await address.fill('https://somewhere.example/unknown')
  await address.press('Enter')
  await expect(
    lab.getByRole('heading', {
      name: 'This address is outside the time machine',
      exact: true,
    }),
  ).toBeVisible()
  await lab.getByRole('button', { name: 'Browser Home', exact: true }).click()
  await expect(lab.locator('.web-lab-google-2026')).toBeVisible()
  const changes = lab.getByRole('button', {
    name: 'What changed?',
    exact: true,
  })
  await changes.click()
  await expect(changes).toHaveAttribute('aria-expanded', 'true')
  await expect(
    lab.getByRole('link', { name: /Google.*history|Google.*story/i }),
  ).toBeVisible()
  await changes.click()
  await expect(changes).toHaveAttribute('aria-expanded', 'false')
})

test('fits every browser era on narrow screens with reduced motion', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/#web-lab')
  const lab = page.locator('.web-lab')
  for (const year of [1995, 1998, 2000, 2001, 2004, 2005, 2010, 2015, 2026]) {
    const era = lab.getByRole('button', {
      name: `${year} web era`,
      exact: true,
    })
    await era.click()
    await expect(era).toHaveAttribute('aria-pressed', 'true')
    await expect(lab.locator('.web-lab-browser')).toHaveAttribute(
      'data-year',
      String(year),
    )
    await expect
      .poll(() =>
        page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
      )
      .toBe(true)
  }
})

test('offers useful empty search results and rejects unknown reading addresses', async ({
  page,
}) => {
  await page.goto('/#web-lab')
  const lab = page.locator('.web-lab')
  const search = lab.getByRole('searchbox', {
    name: 'Search the recreated web',
  })
  await search.fill('zzzxxyynotacollectiontopic')
  await lab
    .getByRole('button', { name: 'I’m Feeling Lucky', exact: true })
    .click()
  await expect(
    lab.getByRole('heading', { name: 'No matches in this local collection' }),
  ).toBeVisible()
  await expect(lab.locator('.web-lab-result-link')).toHaveCount(0)
  await lab
    .getByRole('link', { name: 'Explore web history', exact: true })
    .click()
  await expect(lab.locator('.web-lab-result-link').first()).toHaveText(
    'How the World Wide Web began',
  )
  const address = lab.getByRole('textbox', { name: 'Simulated web address' })
  await address.fill('history.local/__proto__')
  await address.press('Enter')
  await expect(
    lab.getByRole('heading', {
      name: 'This address is outside the time machine',
    }),
  ).toBeVisible()
})

test('shows read-only code and separates the 1995 and 2010 standards milestones', async ({
  page,
}) => {
  await page.goto('/#web-lab')
  const lab = page.locator('.web-lab')
  await lab.getByRole('button', { name: '1995 web era' }).click()
  await lab.getByRole('button', { name: 'View code' }).click()
  await lab.getByRole('button', { name: 'CSS', exact: true }).click()
  await expect(lab.getByLabel('CSS code example')).toContainText(
    'CSS1 was recommended in 1996',
  )
  await lab.getByRole('button', { name: '2010 web era' }).click()
  await lab.getByRole('button', { name: 'JavaScript', exact: true }).click()
  await expect(lab.getByLabel('JavaScript code example')).toContainText(
    'HTML5 was still a draft in 2010',
  )
  await expect(lab.locator('.web-lab-code textarea')).toHaveCount(0)
  await lab.getByRole('button', { name: 'What changed?', exact: true }).click()
  await expect(lab.locator('.web-lab-changes')).toContainText('October 2014')
})

test('compares two independent browsable website eras', async ({ page }) => {
  await page.goto('/#web-lab')
  await page
    .getByRole('button', { name: 'Compare websites', exact: true })
    .click()
  const comparison = page.getByRole('region', { name: 'Website comparison' })
  const earlier = comparison.locator('.web-lab').first()
  const later = comparison.locator('.web-lab').last()
  await expect(earlier.locator('.web-lab-browser')).toHaveAttribute(
    'data-year',
    '1998',
  )
  await expect(later.locator('.web-lab-browser')).toHaveAttribute(
    'data-year',
    '2026',
  )
  await earlier
    .getByRole('searchbox', { name: 'Search the recreated web' })
    .fill('computers')
  await earlier
    .getByRole('button', { name: 'Google Search', exact: true })
    .click()
  await expect(
    earlier.getByRole('heading', { name: 'Search results for “computers”' }),
  ).toBeVisible()
  await expect(later.locator('.web-lab-google-home')).toBeVisible()
  await later
    .getByRole('combobox', { name: 'Browser year', exact: true })
    .selectOption('2010')
  await expect(later.locator('.web-lab-browser')).toHaveAttribute(
    'data-year',
    '2010',
  )
  await expect(earlier.locator('.web-lab-browser')).toHaveAttribute(
    'data-year',
    '1998',
  )
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true)
})

test('has no serious accessibility violations in the three main web recreations', async ({
  page,
}) => {
  test.setTimeout(60_000)
  await page.goto('/#web-lab')
  for (const year of [1998, 2010, 2026]) {
    await page.getByRole('button', { name: `${year} web era` }).click()
    const results = await new AxeBuilder({ page })
      .include('.web-lab')
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze()
    expect(
      results.violations
        .filter(
          (violation) =>
            violation.impact === 'serious' || violation.impact === 'critical',
        )
        .map((violation) => ({
          id: violation.id,
          nodes: violation.nodes.map((node) => node.target),
        })),
    ).toEqual([])
  }
})
