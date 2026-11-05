import { expect, test } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test('company selection reveals accurate formation and product milestones', async ({
  page,
}) => {
  await page.goto('/#companies')
  await expect(
    page.getByRole('heading', { name: /Big ideas. Small beginnings/ }),
  ).toBeVisible()
  const companies = page.getByRole('group', { name: 'Choose a company' })
  await companies.getByRole('button', { name: 'IBM', exact: true }).click()
  await expect(page.locator('.company-origin')).toContainText(
    'Charles Ranlett Flint',
  )
  await page
    .getByRole('group', { name: 'IBM milestones' })
    .getByRole('button', { name: /1911/ })
    .click()
  await expect(page.locator('.company-detail')).toContainText(
    'Thomas J. Watson Sr. joined in 1914',
  )
  await page
    .getByRole('group', { name: 'IBM milestones' })
    .getByRole('button', { name: /1964/ })
    .click()
  await expect(page.locator('.company-product')).toContainText('System/360')
  await companies.getByRole('button', { name: 'Apple', exact: true }).click()
  await expect(page.locator('.company-origin')).toContainText('Ronald Wayne')
  await page
    .getByRole('group', { name: 'Apple milestones' })
    .getByRole('button', { name: /2007/ })
    .click()
  await expect(page.locator('.company-detail')).toContainText(
    'App Store followed in 2008',
  )
  await companies.getByRole('button', { name: 'Amazon', exact: true }).click()
  await expect(page.locator('.company-origin')).toContainText('July 1995')
  await expect(page.locator('.company-origin .feature-source')).toHaveAttribute(
    'href',
    'https://www.aboutamazon.com/about-us',
  )
  await companies
    .getByRole('button', { name: 'Microsoft', exact: true })
    .click()
  await expect(page.locator('.company-origin')).toContainText('Paul Allen')
  await companies.getByRole('button', { name: 'Google', exact: true }).click()
  await expect(page.locator('.company-origin')).toContainText(
    'Larry Page and Sergey Brin',
  )
})

test('computer exhibits disclose configurations and compare labeled specifications', async ({
  page,
}) => {
  await page.goto('/#computers')
  await expect(
    page.getByRole('heading', { name: 'Meet the machines.' }),
  ).toBeVisible()
  const gallery = page.getByRole('group', { name: 'Computer exhibits' })
  await expect(gallery.getByRole('button')).toHaveCount(6)
  await gallery
    .getByRole('button', { name: /Windows 95-compatible PC/ })
    .click()
  await expect(page.locator('.computer-detail')).toContainText(
    'not typical retail PC specifications',
  )
  await gallery.getByRole('button', { name: /Mac mini/ }).click()
  await expect(page.locator('.computer-detail')).toContainText('256 MB')
  await expect(page.locator('.computer-detail')).toContainText('$499')
  await page
    .getByLabel('First computer', { exact: true })
    .selectOption('macintosh')
  await page
    .getByLabel('Second computer', { exact: true })
    .selectOption('m1-air')
  const comparison = page.getByRole('table')
  await expect(comparison).toContainText('128 KB')
  await expect(comparison).toContainText('8 GB unified memory')
  await expect(comparison.getByRole('row', { name: /^Storage/ })).toContainText(
    '400 KB',
  )
  await expect(comparison.getByRole('row', { name: /^Storage/ })).toContainText(
    '256 GB SSD',
  )
  await expect(page.locator('.computer-art-note')).toContainText(
    'not photographs',
  )
  await expect(
    page.locator('.computer-detail .feature-source'),
  ).toHaveAttribute('href', /^https:\/\//)
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true)
})

test('collections remain accessible in every museum theme', async ({
  page,
}) => {
  for (const [hash, selector] of [
    ['companies', '.company-explorer'],
    ['computers', '.computer-museum'],
  ]) {
    await page.goto(`/#${hash}`)
    await expect(page.locator(selector)).toBeVisible()
    for (const era of ['1995', '2010', '2026']) {
      await page.evaluate((value) => {
        document.documentElement.dataset.era = value
        const shell = document.querySelector('.app-shell')
        if (shell) {
          shell.classList.remove('era-1995', 'era-2010', 'era-2026')
          shell.classList.add(`era-${value}`)
        }
      }, era)
      const result = await new AxeBuilder({ page }).include(selector).analyze()
      expect(result.violations, `${hash}, ${era}`).toEqual([])
    }
  }
})
