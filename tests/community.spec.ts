import { expect, test, type Locator } from '@playwright/test'

async function chooseCommunity(
  lab: Locator,
  site: 'wikipedia' | 'facebook',
  year: number,
) {
  await lab
    .getByRole('combobox', { name: 'Website', exact: true })
    .selectOption(site)
  await lab
    .getByRole('combobox', { name: 'Browser year', exact: true })
    .selectOption(String(year))
}

test('encyclopedia articles restrict future milestones and keep working crosslinks', async ({
  page,
}) => {
  await page.goto('/#web-lab')
  const lab = page.locator('.web-lab').first()
  await chooseCommunity(lab, 'wikipedia', 2001)
  const wiki = lab.locator('.hs-wiki-site')
  await wiki
    .locator('.hs-wiki-topic-panel')
    .getByRole('link', { name: 'Artificial intelligence', exact: true })
    .click()
  await expect(
    wiki.getByRole('heading', { name: 'Artificial intelligence', exact: true }),
  ).toBeVisible()
  await expect(wiki.locator('.hs-wiki-article-body')).toContainText('Deep Blue')
  await expect(wiki.locator('.hs-wiki-article-body')).not.toContainText(
    'Transformer',
  )
  await expect(wiki.locator('.hs-wiki-article-body')).not.toContainText(
    'ChatGPT',
  )
  await expect(wiki.locator('.hs-wiki-related a')).toHaveCount(4)
  await wiki
    .getByRole('button', { name: 'Use larger text', exact: true })
    .click()
  await expect(wiki).toHaveClass(/hs-wiki-large-text/)
  await lab
    .getByRole('combobox', { name: 'Browser year', exact: true })
    .selectOption('2026')
  await expect(wiki.locator('.hs-wiki-article-body')).toContainText(
    'Transformer',
  )
  await expect(wiki.locator('.hs-wiki-article-body')).toContainText('ChatGPT')
  await wiki
    .getByRole('button', { name: 'Show reference sources', exact: true })
    .click()
  await expect(wiki.locator('.hs-wiki-sources')).toContainText(
    'arxiv.org/abs/1706.03762',
  )
  await wiki
    .locator('.hs-wiki-related')
    .getByRole('link', { name: 'Personal computer', exact: true })
    .click()
  await expect(
    wiki.getByRole('heading', { name: 'Personal computer', exact: true }),
  ).toBeVisible()
  await lab.getByRole('button', { name: 'Browser Back', exact: true }).click()
  await expect(
    wiki.getByRole('heading', { name: 'Artificial intelligence', exact: true }),
  ).toBeVisible()
})

test('encyclopedia search and missing routes provide useful local recovery', async ({
  page,
}) => {
  await page.goto('/#web-lab')
  const lab = page.locator('.web-lab').first()
  await chooseCommunity(lab, 'wikipedia', 2010)
  const wiki = lab.locator('.hs-wiki-site')
  const search = wiki.getByRole('searchbox', {
    name: 'Search Wikipedia recreation',
    exact: true,
  })
  await search.fill('packet')
  await search.press('Enter')
  await wiki
    .locator('.hs-wiki-results')
    .getByRole('link', { name: 'Internet', exact: true })
    .click()
  await expect(
    wiki.getByRole('heading', { name: 'Internet', exact: true }),
  ).toBeVisible()
  await wiki
    .locator('.hs-wiki-toc')
    .getByRole('button', { name: 'hide', exact: true })
    .click()
  await expect(wiki.locator('.hs-wiki-toc ol')).toBeHidden()
  await search.fill('unfindable-museum-query')
  await search.press('Enter')
  await expect(
    wiki.getByRole('heading', {
      name: 'No article matched that search',
      exact: true,
    }),
  ).toBeVisible()
  await wiki
    .getByRole('link', { name: 'Browse all six articles', exact: true })
    .click()
  await expect(wiki.locator('.hs-wiki-results li')).toHaveCount(6)
  const address = lab.getByRole('textbox', {
    name: 'Simulated web address',
    exact: true,
  })
  await address.fill('wikipedia.local/article?id=unknown')
  await address.press('Enter')
  await expect(
    wiki.getByRole('heading', { name: 'Article not found', exact: true }),
  ).toBeVisible()
})

test('the 2004 campus directory has profiles and connections without later feed controls', async ({
  page,
}) => {
  await page.goto('/#web-lab')
  const lab = page.locator('.web-lab').first()
  await chooseCommunity(lab, 'facebook', 2004)
  const facebook = lab.locator('.hs-fb-site')
  await expect(facebook).toContainText(
    'All people, campus details, and posts are fictional',
  )
  await expect(
    facebook.getByRole('button', { name: 'News Feed', exact: true }),
  ).toHaveCount(0)
  await expect(
    facebook.getByRole('button', { name: 'Like', exact: true }),
  ).toHaveCount(0)
  await expect(
    facebook.getByRole('button', { name: 'Share post', exact: true }),
  ).toHaveCount(0)
  const maya = facebook
    .locator('.hs-fb-directory-card')
    .filter({ hasText: 'Maya Chen' })
  await maya.getByRole('button', { name: 'Connect', exact: true }).click()
  await maya.getByRole('button', { name: 'Maya Chen', exact: true }).click()
  await expect(
    facebook.getByRole('heading', { name: 'Maya Chen', exact: true }),
  ).toBeVisible()
  await expect(
    facebook.getByRole('button', {
      name: 'Connected · remove connection',
      exact: true,
    }),
  ).toHaveAttribute('aria-pressed', 'true')
  await facebook
    .getByRole('button', { name: 'Connected · remove connection', exact: true })
    .click()
  await expect(
    facebook.getByRole('button', { name: 'Connect with Maya', exact: true }),
  ).toHaveAttribute('aria-pressed', 'false')
})

test('fictional feed posts support composition, likes, comments, and profile navigation', async ({
  page,
}) => {
  await page.goto('/#web-lab')
  const lab = page.locator('.web-lab').first()
  await chooseCommunity(lab, 'facebook', 2010)
  const facebook = lab.locator('.hs-fb-site')
  await facebook
    .getByRole('textbox', { name: 'Share a fictional update', exact: true })
    .fill('An original post from the local museum test.')
  await facebook
    .getByRole('button', { name: 'Share post', exact: true })
    .click()
  const post = facebook
    .locator('.hs-fb-post')
    .filter({ hasText: 'An original post from the local museum test.' })
  await post.getByRole('button', { name: 'Like', exact: true }).click()
  await expect(
    post.getByRole('button', { name: 'Liked', exact: true }),
  ).toHaveAttribute('aria-pressed', 'true')
  await post.getByRole('button', { name: 'Comment', exact: true }).click()
  await post
    .getByRole('textbox', {
      name: "Comment on Maya Chen's fictional post",
      exact: true,
    })
    .fill('A fictional reply for the demo.')
  await post.getByRole('button', { name: 'Post', exact: true }).click()
  await expect(post).toContainText('A fictional reply for the demo.')
  await post.getByRole('button', { name: 'Maya Chen', exact: true }).click()
  await expect(
    facebook.getByRole('heading', { name: 'Maya Chen', exact: true }),
  ).toBeVisible()
  await facebook.getByRole('button', { name: 'News Feed', exact: true }).click()
  await expect(post).toContainText('A fictional reply for the demo.')
  await expect(
    post.getByRole('button', { name: 'Liked', exact: true }),
  ).toHaveAttribute('aria-pressed', 'true')
})
