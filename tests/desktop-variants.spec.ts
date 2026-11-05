import { expect, test } from '@playwright/test'

test('XP and modern desktops reuse working applications and support modern search and snapping', async ({
  page,
}) => {
  await page.goto('/#desktop')
  const eras = page.getByRole('group', { name: 'Desktop era' })
  await eras.getByRole('button', { name: 'Windows XP', exact: true }).click()
  let desktop = page.locator('.dtm-desktop')
  await expect(desktop).toHaveClass(/desktop-variant-xp/)
  await expect(desktop.locator('.win95-desktop-watermark')).toContainText(
    '2001',
  )
  await desktop.getByRole('button', { name: 'Start menu', exact: true }).click()
  await desktop
    .locator('.win95-start-menu')
    .getByRole('button', { name: 'Read me', exact: true })
    .click()
  await expect(
    desktop.getByRole('textbox', { name: 'Read me contents' }),
  ).toHaveValue(/WINDOWS XP-INSPIRED PLAYGROUND/)
  await desktop
    .getByRole('textbox', { name: 'Read me contents' })
    .fill('A note written in the XP playground.')
  await desktop.getByRole('button', { name: 'Save note', exact: true }).click()
  await expect(desktop.getByRole('status')).toContainText(
    'Saved for this session',
  )
  await eras
    .getByRole('button', { name: 'Modern desktop', exact: true })
    .click()
  desktop = page.locator('.dtm-desktop')
  await expect(desktop).toHaveClass(/desktop-variant-modern/)
  await desktop.getByRole('button', { name: 'Start menu', exact: true }).click()
  const search = desktop.getByRole('textbox', {
    name: 'Search apps and files',
    exact: true,
  })
  await search.fill('notepad')
  await desktop.getByRole('button', { name: 'Notepad', exact: true }).click()
  const note = desktop.getByRole('dialog', {
    name: 'Read me - Notepad',
    exact: true,
  })
  await expect(note).toBeVisible()
  await note
    .getByRole('textbox', { name: 'Read me contents' })
    .fill('Modern notes work too.')
  await note
    .getByRole('button', { name: 'Snap Read me - Notepad left', exact: true })
    .click()
  const left = await note.boundingBox()
  const screen = await desktop.boundingBox()
  expect(left!.x).toBeCloseTo(screen!.x + 8, 0)
  await note
    .getByRole('button', { name: 'Snap Read me - Notepad right', exact: true })
    .click()
  const right = await note.boundingBox()
  expect(right!.x + right!.width).toBeLessThanOrEqual(screen!.x + screen!.width)
  expect(right!.y + right!.height).toBeLessThanOrEqual(
    screen!.y + screen!.height - 35,
  )
  await desktop.getByRole('button', { name: 'Start menu', exact: true }).click()
  await search.fill('unfindable-app')
  await expect(desktop.locator('.modern-empty-search')).toBeVisible()
  await eras.getByRole('button', { name: 'Windows 95', exact: true }).click()
  await expect(desktop).toHaveClass(/desktop-variant-win95/)
  await expect(
    desktop.getByRole('dialog', { name: 'My Computer', exact: true }),
  ).toBeVisible()
})
