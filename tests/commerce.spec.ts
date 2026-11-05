import { expect, test, type Locator } from '@playwright/test'

async function chooseSite(
  lab: Locator,
  site: 'youtube' | 'amazon',
  year: number,
) {
  await lab
    .getByRole('combobox', { name: 'Website', exact: true })
    .selectOption(site)
  await lab
    .getByRole('combobox', { name: 'Browser year', exact: true })
    .selectOption(String(year))
}

test('the original video collection supports search, playback, comments, and related clips', async ({
  page,
}) => {
  await page.goto('/#web-lab')
  const lab = page.locator('.web-lab')
  await chooseSite(lab, 'youtube', 2005)

  await lab
    .getByRole('searchbox', { name: 'Search videos', exact: true })
    .fill('mouse')
  await lab.getByRole('button', { name: 'Search videos', exact: true }).click()
  await lab
    .getByRole('link', { name: 'How a mouse finds its way', exact: true })
    .click()
  await expect(
    lab.getByRole('heading', {
      name: 'How a mouse finds its way',
      exact: true,
    }),
  ).toBeVisible()

  await lab.getByRole('button', { name: 'Play video', exact: true }).click()
  await expect(
    lab.getByRole('button', { name: 'Pause video', exact: true }),
  ).toBeVisible()
  await expect
    .poll(async () =>
      Number(
        await lab
          .getByRole('slider', { name: 'Video progress', exact: true })
          .inputValue(),
      ),
    )
    .toBeGreaterThan(0)
  await lab.getByRole('button', { name: 'Pause video', exact: true }).click()
  await lab
    .getByRole('textbox', { name: 'Write a comment', exact: true })
    .fill('The moving pointer makes the idea easy to understand.')
  await lab.getByRole('button', { name: 'Post comment', exact: true }).click()
  await expect(
    lab.getByText('The moving pointer makes the idea easy to understand.', {
      exact: true,
    }),
  ).toBeVisible()
  await lab
    .getByRole('link', { name: 'A room-sized computer', exact: true })
    .click()
  await expect(
    lab.getByRole('heading', { name: 'A room-sized computer', exact: true }),
  ).toBeVisible()
})

test('the sample bookstore supports product details, cart edits, and a simulated order', async ({
  page,
}) => {
  await page.goto('/#web-lab')
  const lab = page.locator('.web-lab')
  const title = 'A Field Guide to the Early Web'
  await chooseSite(lab, 'amazon', 1995)

  async function addBook() {
    await lab
      .getByRole('searchbox', { name: 'Search products', exact: true })
      .fill('early web')
    await lab
      .getByRole('button', { name: 'Search products', exact: true })
      .click()
    await lab.getByRole('link', { name: title, exact: true }).click()
    await expect(
      lab.getByRole('heading', { name: title, exact: true }),
    ).toBeVisible()
    await lab.getByRole('button', { name: 'Add to cart', exact: true }).click()
    await lab.getByRole('link', { name: 'View cart', exact: true }).click()
  }

  await addBook()
  const quantity = lab.getByRole('spinbutton', {
    name: `Quantity for ${title}`,
    exact: true,
  })
  await quantity.fill('2')
  await quantity.press('Tab')
  await expect(quantity).toHaveValue('2')
  await lab
    .getByRole('button', { name: `Remove ${title}`, exact: true })
    .click()
  await expect(quantity).toHaveCount(0)

  await addBook()
  await lab
    .getByRole('button', { name: 'Place simulated order', exact: true })
    .click()
  await expect(
    lab.getByRole('heading', {
      name: 'Your simulated order is complete',
      exact: true,
    }),
  ).toBeVisible()
  await expect(lab.getByRole('textbox', { name: /credit card/i })).toHaveCount(
    0,
  )
})

test('video availability follows its launch year and every supported era fits the viewport', async ({
  page,
}) => {
  await page.goto('/#web-lab')
  const lab = page.locator('.web-lab')
  await chooseSite(lab, 'youtube', 1995)
  await expect(lab).toContainText('2005')
  await expect(
    lab.getByRole('searchbox', { name: 'Search videos', exact: true }),
  ).toHaveCount(0)

  for (const year of [2005, 2010, 2015, 2026]) {
    await lab
      .getByRole('combobox', { name: 'Browser year', exact: true })
      .selectOption(String(year))
    await expect(
      lab.getByRole('link', { name: 'A room-sized computer', exact: true }),
    ).toBeVisible()
    await expect
      .poll(() =>
        page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
      )
      .toBe(true)
  }

  for (const year of [1995, 2005, 2015, 2026]) {
    await chooseSite(lab, 'amazon', year)
    await expect(
      lab.getByRole('searchbox', { name: 'Search products', exact: true }),
    ).toBeVisible()
    await expect
      .poll(() =>
        page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
      )
      .toBe(true)
  }
})
