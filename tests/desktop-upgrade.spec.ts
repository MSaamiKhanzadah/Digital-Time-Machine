import { expect, test, type Locator } from '@playwright/test'

async function openReadme(desktop: Locator) {
  await desktop.getByRole('button', { name: 'Start menu', exact: true }).click()
  await desktop
    .locator('.win95-start-menu')
    .getByRole('button', { name: 'Read me', exact: true })
    .click()
  return desktop.getByRole('dialog', { name: 'Read me - Notepad', exact: true })
}

test('edits and saves separate session documents and restores templates on Restart', async ({
  page,
  isMobile,
}) => {
  await page.goto('/#desktop')
  const desktop = page.locator('.dtm-desktop')
  await desktop.scrollIntoViewIfNeeded()
  let note = await openReadme(desktop)
  let editor = note.getByRole('textbox', { name: 'Read me contents' })
  await expect(editor).toHaveValue(/WELCOME TO YOUR 1995 DESKTOP/)
  await expect(note).toContainText('WELCOME TO YOUR 1995 DESKTOP')
  await editor.fill('A note for the next visitor.\nWritten in this session.')
  await expect(note.getByRole('status')).toHaveText(
    'Unsaved changes · session only',
  )
  if (isMobile)
    await note.getByRole('button', { name: 'Save note', exact: true }).tap()
  else await editor.press('Control+s')
  await expect(note.getByRole('status')).toHaveText('Saved for this session')
  await note
    .getByRole('button', { name: 'Close Read me - Notepad', exact: true })
    .click()

  // The README in the drive and the desktop shortcut refer to one document.
  await desktop
    .getByRole('button', { name: 'Local Disk (C:)', exact: true })
    .click()
  await desktop.getByRole('button', { name: 'README.TXT', exact: true }).click()
  note = desktop.getByRole('dialog', {
    name: 'README.TXT - Notepad',
    exact: true,
  })
  await expect(
    note.getByRole('textbox', { name: 'README.TXT contents' }),
  ).toHaveValue('A note for the next visitor.\nWritten in this session.')
  await expect(note.getByRole('status')).toHaveText('Saved for this session')
  await note
    .getByRole('button', { name: 'Close README.TXT - Notepad', exact: true })
    .click()

  await desktop.getByRole('button', { name: 'Start menu', exact: true }).click()
  await desktop
    .locator('.win95-start-menu')
    .getByRole('button', { name: 'Documents', exact: true })
    .click()
  await desktop
    .getByRole('button', { name: 'Welcome.txt', exact: true })
    .click()
  note = desktop.getByRole('dialog', {
    name: 'Welcome.txt - Notepad',
    exact: true,
  })
  editor = note.getByRole('textbox', { name: 'Welcome.txt contents' })
  await expect(editor).toHaveValue(/A NOTE FROM 1995/)
  await editor.fill('A separate draft')
  await note
    .getByRole('button', { name: 'Close Welcome.txt - Notepad', exact: true })
    .click()
  await desktop
    .getByRole('button', { name: 'Welcome.txt', exact: true })
    .click()
  await expect(editor).toHaveValue('A separate draft')
  await expect(note.getByRole('status')).toHaveText(
    'Unsaved changes · session only',
  )
  await note
    .getByRole('button', { name: 'Close Welcome.txt - Notepad', exact: true })
    .click()
  note = await openReadme(desktop)
  await expect(
    note.getByRole('textbox', { name: 'Read me contents' }),
  ).toHaveValue('A note for the next visitor.\nWritten in this session.')

  await desktop.getByRole('button', { name: 'Start menu', exact: true }).click()
  await desktop
    .locator('.win95-start-menu')
    .getByRole('button', { name: 'Shut Down…', exact: true })
    .click()
  await desktop.getByRole('button', { name: 'Restart', exact: true }).click()
  note = await openReadme(desktop)
  await expect(
    note.getByRole('textbox', { name: 'Read me contents' }),
  ).toHaveValue(/WELCOME TO YOUR 1995 DESKTOP/)
  await expect(note.getByRole('status')).toHaveText(
    'Original template · editable',
  )
})

test('moves focused titlebars with the keyboard and keeps windows inside the desktop', async ({
  page,
}) => {
  await page.goto('/#desktop')
  const desktop = page.locator('.dtm-desktop')
  await desktop.scrollIntoViewIfNeeded()
  const explorer = desktop.getByRole('dialog', {
    name: 'My Computer',
    exact: true,
  })
  const titlebar = explorer.getByRole('group', {
    name: 'Move My Computer',
    exact: true,
  })
  await titlebar.focus()
  const before = await explorer.boundingBox()
  await titlebar.press('ArrowDown')
  await expect
    .poll(async () => (await explorer.boundingBox())!.y)
    .toBe(before!.y + 8)
  await titlebar.press('Shift+ArrowUp')
  await expect
    .poll(async () => (await explorer.boundingBox())!.y)
    .toBe(before!.y - 24)
  for (let index = 0; index < 15; index++)
    await titlebar.press('Shift+ArrowLeft')
  for (let index = 0; index < 15; index++) await titlebar.press('Shift+ArrowUp')
  const bounds = await explorer.boundingBox()
  const screen = await desktop.boundingBox()
  expect(bounds!.x).toBeGreaterThanOrEqual(screen!.x)
  expect(bounds!.y).toBeGreaterThanOrEqual(screen!.y)
  expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(
    screen!.x + screen!.width,
  )
  expect(bounds!.y + bounds!.height).toBeLessThanOrEqual(
    screen!.y + screen!.height,
  )
  await explorer
    .getByRole('button', { name: 'Maximize My Computer', exact: true })
    .click()
  const maximized = await explorer.boundingBox()
  await titlebar.focus()
  await titlebar.press('ArrowDown')
  expect(await explorer.boundingBox()).toEqual(maximized)
})
