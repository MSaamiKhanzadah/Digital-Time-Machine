import { expect, test } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test('evolution maps expose sourced details and keyboard-expandable relationships', async ({
  page,
}) => {
  await page.goto('/#evolution')
  await expect(
    page.getByRole('heading', { name: /Nothing starts from nothing/ }),
  ).toBeVisible()
  const map = page.getByLabel('Programming languages relationship map')
  await map.getByRole('button', { name: /C\+\+ 1985/ }).click()
  await expect(page.locator('#evo-detail-title')).toHaveText('C++')
  await expect(page.locator('.evo-detail')).toContainText('Bjarne Stroustrup')
  await expect(page.locator('.evo-detail .feature-source')).toHaveAttribute(
    'href',
    'https://www.stroustrup.com/bs_faq.html',
  )
  const collapse = map.getByRole('button', {
    name: 'Collapse BCPL descendants',
  })
  await collapse.focus()
  await collapse.press('Enter')
  await expect(
    map.getByRole('button', { name: 'Expand BCPL descendants' }),
  ).toHaveAttribute('aria-expanded', 'false')
  await expect(map.getByRole('button', { name: /C\+\+ 1985/ })).toBeHidden()
  await page.getByRole('button', { name: 'Expand all', exact: true }).click()
  await expect(map.getByRole('button', { name: /C\+\+ 1985/ })).toBeVisible()
  for (const category of [
    'Operating systems',
    'Hardware',
    'Internet',
    'Artificial intelligence',
    'Web development',
  ]) {
    await page
      .getByRole('group', { name: 'Evolution tree categories' })
      .getByRole('button', { name: category })
      .click()
    await expect(page.getByLabel(`${category} relationship map`)).toBeVisible()
    await expect(page.locator('.evo-detail .feature-source')).toHaveAttribute(
      'href',
      /^https:\/\//,
    )
  }
  await page
    .getByRole('group', { name: 'Evolution tree categories' })
    .getByRole('button', { name: 'Operating systems' })
    .click()
  await page.getByRole('button', { name: /Linux 1991/ }).click()
  await expect(page.locator('.evo-detail')).toContainText(
    'not a branch of the original Unix source tree',
  )
})

test('AI timeline distinguishes milestones and conversation replies expose fixed rules', async ({
  page,
}) => {
  await page.goto('/#ai')
  await expect(
    page.getByRole('heading', {
      name: /The long road to artificial intelligence/,
    }),
  ).toBeVisible()
  await page
    .getByRole('button', { name: /1970s \/ 1980s Expectations meet limits/ })
    .click()
  await expect(page.locator('.ai-milestone')).toContainText(
    'late 1980s into the 1990s',
  )
  await page.getByRole('button', { name: /2026 A platform landscape/ }).click()
  await expect(page.locator('.ai-milestone')).toContainText(
    'not a claim of one new invention',
  )
  await expect(page.locator('.ai-milestone .feature-source')).toHaveAttribute(
    'href',
    'https://platform.openai.com/docs/overview',
  )
  await expect(page.locator('.ai-lab-copy')).toContainText(
    'not Weizenbaum’s actual ELIZA',
  )
  const message = page.getByRole('textbox', {
    name: 'Your message to the rule-based simulation',
  })
  const send = page.getByRole('button', { name: 'Send message' })
  await expect(send).toBeDisabled()
  await page
    .getByRole('button', { name: 'I feel curious', exact: true })
    .click()
  await expect(message).toHaveValue('I feel curious')
  await message.press('Enter')
  const log = page.getByRole('log', { name: 'Pattern conversation history' })
  await expect(log).toContainText('What makes you feel curious?')
  await expect(log).toContainText('Matched rule: Feeling echo')
  await message.fill('I felt curious')
  await send.click()
  await expect(log).toContainText('Matched rule: Fallback')
  await page.getByRole('button', { name: 'Clear / reset' }).click()
  await expect(log).not.toContainText('I felt curious')
  await expect(
    page.getByText('Conversation cleared.', { exact: true }),
  ).toBeVisible()
})

test('knowledge exhibits remain accessible across museum themes', async ({
  page,
}) => {
  for (const section of ['evolution', 'ai']) {
    await page.goto(`/#${section}`)
    const selector = section === 'evolution' ? '.evo-explorer' : '.ai-explorer'
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
      expect(result.violations, `${section}, ${era}`).toEqual([])
    }
  }
})
