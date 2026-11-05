import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from 'react'
import {
  Monitor,
  Globe,
  FileText,
  Folder,
  HardDrive,
  Save,
  Settings,
  Trash2,
  Command,
} from 'lucide-react'
import '../styles/desktop.css'

export type DesktopVariant = 'win95' | 'xp' | 'modern'

type IconName =
  | 'computer'
  | 'internet'
  | 'document'
  | 'folder'
  | 'drive'
  | 'floppy'
  | 'settings'
  | 'recycle'
  | 'flag'
type WindowKind = 'explorer' | 'browser' | 'notepad' | 'about' | 'shutdown'
type DesktopWindow = {
  id: WindowKind
  title: string
  x: number
  y: number
  z: number
  width: number
  height: number
  minimized: boolean
  maximized: boolean
  snapped?: 'left' | 'right'
}
type FileItem = {
  name: string
  icon: IconName
  folder?: string
  text?: string
  action?: 'about' | 'display'
}
type Folder = {
  label: string
  parent?: string
  items: FileItem[]
  empty?: string
}
type SessionDocument = {
  text: string
  savedText: string
  saved: boolean
}

const readme =
  'WELCOME TO YOUR 1995 DESKTOP\n\nA little window into a different time.\n\nClick the desktop icons or the Start button to explore. You can move windows by dragging their blue title bars, minimize them, and bring them back from the taskbar.\n\nMy Computer contains a small collection of folders and text files. The Internet browser visits a few simulated local pages.\n\nEverything here runs in your browser. Files, websites, and system settings are a playful reconstruction, not a real operating system.\n\nHave a look around. The future can wait.'
const folders: Record<string, Folder> = {
  computer: {
    label: 'My Computer',
    items: [
      { name: '3½ Floppy (A:)', icon: 'floppy', folder: 'floppy' },
      { name: 'Local Disk (C:)', icon: 'drive', folder: 'drive' },
      { name: 'My Documents', icon: 'folder', folder: 'documents' },
      { name: 'Control Panel', icon: 'settings', folder: 'control' },
    ],
  },
  drive: {
    label: 'C:\\',
    parent: 'computer',
    items: [
      { name: 'My Documents', icon: 'folder', folder: 'documents' },
      { name: 'WINDOWS', icon: 'folder', folder: 'windows' },
      { name: 'README.TXT', icon: 'document', text: readme },
      {
        name: 'AUTOEXEC.BAT',
        icon: 'document',
        text: '@ECHO OFF\nPROMPT $p$g\nPATH C:\\WINDOWS;C:\\WINDOWS\\COMMAND\nSET TEMP=C:\\TEMP\n\nREM A typical startup file from the DOS era.\nREM This is a read-only simulated file.',
      },
    ],
  },
  documents: {
    label: 'C:\\My Documents',
    parent: 'drive',
    items: [
      {
        name: 'Welcome.txt',
        icon: 'document',
        text: 'A NOTE FROM 1995\n\nDear future visitor,\n\nWe just got a computer with Windows 95. There is a Start button now, and long file names!\n\nThe modem makes a terrible noise, but apparently the World Wide Web is going to be a big deal.\n\nP.S. Please do not pick up the phone while I am online.',
      },
      {
        name: '1995.txt',
        icon: 'document',
        text: 'A FEW THINGS FROM 1995\n\nAugust 24: Microsoft releases Windows 95.\n\nThe new interface introduces the Start menu and taskbar.\n\nNetscape Navigator is a popular way to browse the growing World Wide Web.\n\nMany home users connect through a dial-up modem, sharing the telephone line.\n\nThis desktop is an interactive reconstruction inspired by that era.',
      },
    ],
  },
  windows: {
    label: 'C:\\WINDOWS',
    parent: 'drive',
    items: [
      { name: 'SYSTEM', icon: 'folder', folder: 'system' },
      {
        name: 'WIN.INI',
        icon: 'document',
        text: '; Windows initialization settings\n; A small, simulated example.\n\n[windows]\nload=\nrun=\n\n[Desktop]\nWallpaper=(None)\nTileWallpaper=0\n\n[fonts]\n; Your favorite pixel-sized type goes here.',
      },
    ],
  },
  system: {
    label: 'C:\\WINDOWS\\SYSTEM',
    parent: 'windows',
    items: [],
    empty:
      'System files are taking the day off. This is a simulated desktop, after all.',
  },
  floppy: {
    label: '3½ Floppy (A:)',
    parent: 'computer',
    items: [],
    empty: 'Please insert a disk into drive A:.\nSome things never change.',
  },
  control: {
    label: 'Control Panel',
    parent: 'computer',
    items: [
      { name: 'Display', icon: 'computer', action: 'display' },
      { name: 'System', icon: 'settings', action: 'about' },
      {
        name: 'Date & Time',
        icon: 'document',
        text: 'DATE & TIME\n\nAugust 24, 1995\n9:41 AM\n\nTime stands still in this little desktop.\nYour actual device clock is not affected.',
      },
    ],
  },
  recycle: {
    label: 'Recycle Bin',
    parent: 'computer',
    items: [],
    empty: 'The Recycle Bin is empty.\nA fresh start, circa 1995.',
  },
}

const windowSpecs: Record<
  WindowKind,
  { title: string; width: number; height: number }
> = {
  explorer: { title: 'My Computer', width: 560, height: 330 },
  browser: { title: 'Internet Explorer', width: 594, height: 374 },
  notepad: { title: 'Read me - Notepad', width: 480, height: 330 },
  about: { title: 'About Windows', width: 390, height: 278 },
  shutdown: { title: 'Shut Down Windows', width: 382, height: 228 },
}

function PixelIcon({
  name,
  size = 32,
  variant = 'win95',
}: {
  name: IconName
  size?: number
  variant?: DesktopVariant
}) {
  if (variant === 'modern') {
    const Icon = {
      computer: Monitor,
      internet: Globe,
      document: FileText,
      folder: Folder,
      drive: HardDrive,
      floppy: Save,
      settings: Settings,
      recycle: Trash2,
      flag: Command,
    }[name]
    return (
      <Icon
        size={size}
        strokeWidth={1.6}
        color={name === 'folder' ? '#89702b' : '#4f735b'}
        aria-hidden="true"
        className="modern-desktop-icon"
      />
    )
  }
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      shapeRendering="crispEdges"
      aria-hidden="true"
      className="win95-pixel-icon"
    >
      {name === 'computer' && (
        <>
          <path d="M5 2h22v20H5z" fill="#090909" />
          <path d="M6 3h20v18H6z" fill="#dedede" />
          <path d="M8 5h16v13H8z" fill="#666" />
          <path d="M9 6h14v11H9z" fill="#008080" />
          <path d="M10 7h12v8H10z" fill="#09a5a4" />
          <path d="M4 24h24v5H4zM10 22h12v2H10z" fill="#dfdfdf" />
          <path d="M4 29h24v1H4zM28 25h1v4h-1zM7 26h13v1H7z" fill="#555" />
          <path d="M24 26h2v1h-2z" fill="#08a813" />
        </>
      )}
      {name === 'internet' && (
        <>
          <path
            d="M10 2h12v2H10zM6 4h20v3H6zM3 7h26v17H3zM6 24h20v3H6zM10 27h12v3H10z"
            fill="#001e83"
          />
          <path d="M10 3h10v2h5v3h3v14h-4v5H10v-3H5V10h3V6h2z" fill="#1888e0" />
          <path
            d="M12 4h6v4h5v5h-4v3h-5v-3H9V9h3zM4 16h6v4h6v4h-4v4H9v-4H6zM22 19h6v4h-3v3h-5v-4h2z"
            fill="#5bdb54"
          />
          <path
            d="M16 2v28M3 15h26M8 7h17M7 23h19"
            stroke="#dfedff"
            strokeOpacity=".6"
          />
          <path
            d="M4 27 28 4M2 24v5h6M26 2h5v6"
            stroke="#fff"
            strokeWidth="2"
          />
        </>
      )}
      {name === 'folder' && (
        <>
          <path d="M2 7h12l3 3h13v19H2z" fill="#4e3600" />
          <path d="M3 6h10l3 3h13v17H3z" fill="#fff2a1" />
          <path d="M2 12h28v15H2z" fill="#ffdb66" />
          <path d="M3 13h26v1H3z" fill="#fff9cf" />
          <path d="M2 27h28v2H2zM29 13h2v14h-2z" fill="#9b7300" />
        </>
      )}
      {name === 'document' && (
        <>
          <path d="M6 1h15l6 6v24H6z" fill="#111" />
          <path d="M7 2h13v6h6v22H7z" fill="#fff" />
          <path d="M21 2v5h5" fill="#c4c4c4" />
          <path d="M10 12h13M10 16h13M10 20h13M10 24h9" stroke="#737373" />
          <path d="M6 30h21v1H6z" fill="#888" />
        </>
      )}
      {name === 'drive' && (
        <>
          <path d="m6 9 20 0 5 12v8H1v-8z" fill="#111" />
          <path d="m7 10 18 0 4 11H3z" fill="#dedede" />
          <path d="M2 22h28v6H2z" fill="#aaa" />
          <path d="M4 23h18v2H4z" fill="#444" />
          <path d="M26 24h2v2h-2z" fill="#35ff45" />
          <path d="M8 11h15v1H8z" fill="#fff" />
        </>
      )}
      {name === 'floppy' && (
        <>
          <path d="M4 2h22l3 3v25H3V2z" fill="#111" />
          <path d="M4 3h22l2 3v23H4z" fill="#46468a" />
          <path d="M8 3h15v10H8z" fill="#d6d6d6" />
          <path d="M17 4h4v7h-4z" fill="#555" />
          <path d="M8 18h16v11H8z" fill="#f7f6e8" />
          <path d="M10 21h12M10 24h12" stroke="#7a7ab2" />
        </>
      )}
      {name === 'settings' && (
        <>
          <path d="M3 5h25v23H3z" fill="#111" />
          <path d="M4 6h23v21H4z" fill="#d7d7d7" />
          <path d="M5 7h21v4H5z" fill="#000080" />
          <path d="M8 14v10M15 14v10M22 14v10" stroke="#555" />
          <path
            d="M6 16h5v3H6zM13 21h5v3h-5zM20 14h5v3h-5z"
            fill="#eee"
            stroke="#555"
          />
        </>
      )}
      {name === 'recycle' && (
        <>
          <path d="M7 7h20l-3 23H10z" fill="#222" />
          <path d="M8 8h18l-3 21H11z" fill="#d8dfdf" />
          <path d="M7 4h20v4H7z" fill="#fff" />
          <path d="M6 7h22v2H6zM12 2h9v2h-9z" fill="#929b9b" />
          <path
            d="m15 12 4 0 3 5-3-1-2-2-2 3-3-1zM12 18h3l-1 3h5l1 3h-8l-2-3zM22 18l1 5-3 3v-4l-3-1 1-3z"
            fill="#168850"
          />
        </>
      )}
      {name === 'flag' && (
        <>
          <path d="m4 4 11 2v10L4 14z" fill="#f13d22" />
          <path d="m17 6 11-2v10l-11 2z" fill="#39b54a" />
          <path d="m4 16 11 2v10L4 26z" fill="#2085de" />
          <path d="m17 18 11-2v10l-11 2z" fill="#ffdf38" />
          <path
            d="M1 4h2v2H1zM0 8h3v2H0zM1 12h2v2H1zM0 16h3v2H0zM1 20h2v2H1z"
            fill="#111"
          />
        </>
      )}
    </svg>
  )
}

const initialWindow: DesktopWindow = {
  id: 'explorer',
  ...windowSpecs.explorer,
  x: 170,
  y: 49,
  z: 1,
  minimized: false,
  maximized: false,
}
const knownAddresses: Record<string, 'home' | 'links' | 'history'> = {
  'welcome.local': 'home',
  'www.welcome.local': 'home',
  'welcome.local/links': 'links',
  'welcome.local/history': 'history',
}

export default function DesktopSimulation({
  variant = 'win95',
}: {
  variant?: DesktopVariant
}) {
  const desktopYear =
    variant === 'win95' ? 1995 : variant === 'xp' ? 2001 : 2026
  const desktopName =
    variant === 'win95'
      ? 'Windows 95'
      : variant === 'xp'
        ? 'Windows XP-inspired'
        : 'Modern museum'
  const readmeTemplate =
    variant === 'win95'
      ? readme
      : `WELCOME TO THE ${desktopName.toUpperCase()} PLAYGROUND

This is an original educational desktop recreation inspired by ${desktopYear}.

Open apps, explore files, and write a note. Changes stay in this session only.

The Documents folder contains archived notes from 1995. The browser app visits a small local collection of historical pages; it never opens the live web.

${variant === 'modern' ? 'Use Apps to search for an application or document. Snap a window left or right with its titlebar controls.' : 'Discover the blue titlebars, green Start button, and a different era of desktop design.'}

This is not an actual operating system.`
  const [appSearch, setAppSearch] = useState('')
  const desktopRef = useRef<HTMLDivElement>(null)
  const zCounter = useRef(1)
  const drag = useRef<{
    id: WindowKind
    pointerId: number
    startX: number
    startY: number
    x: number
    y: number
  } | null>(null)
  const [size, setSize] = useState({ width: 900, height: 480 })
  const [windows, setWindows] = useState<DesktopWindow[]>([initialWindow])
  const [startOpen, setStartOpen] = useState(false)
  const [menu, setMenu] = useState<string | null>(null)
  const [folder, setFolder] = useState('computer')
  const [folderHistory, setFolderHistory] = useState<string[]>([])
  const [selectedFile, setSelectedFile] = useState('')
  const [detailsView, setDetailsView] = useState(false)
  const [note, setNote] = useState({ id: 'readme', name: 'Read me' })
  const [documents, setDocuments] = useState<Record<string, SessionDocument>>(
    {},
  )
  const [address, setAddress] = useState('http://welcome.local/')
  const [browserPage, setBrowserPage] = useState<
    'home' | 'links' | 'history' | 'missing'
  >('home')
  const [browserHistory, setBrowserHistory] = useState([
    'http://welcome.local/',
  ])
  const [wallpaper, setWallpaper] = useState<'teal' | 'blue' | 'plum'>('teal')
  const [showDisplay, setShowDisplay] = useState(false)
  const [browserStatus, setBrowserStatus] = useState('Done')
  const currentDocument = documents[note.id] ?? {
    text: readmeTemplate,
    savedText: readmeTemplate,
    saved: false,
  }
  const noteChanged = currentDocument.text !== currentDocument.savedText

  useEffect(() => {
    const element = desktopRef.current
    if (!element) return
    const observer = new ResizeObserver(([entry]) =>
      setSize({
        width: entry.contentRect.width,
        height: entry.contentRect.height,
      }),
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  const visibleWindows = windows.filter((window) => !window.minimized)
  const activeId = visibleWindows.reduce<DesktopWindow | undefined>(
    (active, window) => (!active || window.z > active.z ? window : active),
    undefined,
  )?.id

  function focusWindow(id: WindowKind) {
    const z = ++zCounter.current
    setWindows((current) =>
      current.map((window) =>
        window.id === id ? { ...window, z, minimized: false } : window,
      ),
    )
    setStartOpen(false)
  }

  function openWindow(id: WindowKind, title?: string) {
    const z = ++zCounter.current
    setWindows((current) => {
      const existing = current.find((window) => window.id === id)
      if (existing)
        return current.map((window) =>
          window.id === id
            ? { ...window, z, minimized: false, title: title ?? window.title }
            : window,
        )
      return [
        ...current,
        {
          id,
          ...windowSpecs[id],
          title:
            title ??
            (variant === 'modern' && id === 'browser'
              ? 'Museum Browser'
              : windowSpecs[id].title),
          x: 196 + current.length * 18,
          y: 62 + current.length * 14,
          z,
          minimized: false,
          maximized: false,
        },
      ]
    })
    setStartOpen(false)
    setMenu(null)
  }

  function openNote(name: string, text: string, documentId = name) {
    if (name === 'Read me' || name === 'README.TXT') text = readmeTemplate
    const id =
      name === 'Read me' || name === 'README.TXT' ? 'readme' : documentId
    setDocuments((current) =>
      current[id]
        ? current
        : { ...current, [id]: { text, savedText: text, saved: false } },
    )
    setNote({ id, name })
    openWindow('notepad', `${name} - Notepad`)
  }

  function saveNote() {
    setDocuments((current) => {
      const document = current[note.id] ?? currentDocument
      return {
        ...current,
        [note.id]: { ...document, savedText: document.text, saved: true },
      }
    })
  }

  function goToFolder(next: string, recordHistory = true) {
    if (recordHistory && next !== folder)
      setFolderHistory((history) => [...history, folder])
    setFolder(next)
    setSelectedFile('')
    openWindow('explorer', folders[next].label)
  }

  function openFile(item: FileItem) {
    setSelectedFile(item.name)
    if (item.folder) goToFolder(item.folder)
    else if (item.action === 'about') {
      setShowDisplay(false)
      openWindow('about')
    } else if (item.action === 'display') {
      setShowDisplay(true)
      openWindow('about', 'Display Properties')
    } else if (item.text)
      openNote(item.name, item.text, `${folder}/${item.name}`)
  }

  function closeWindow(id: WindowKind) {
    setWindows((current) => current.filter((window) => window.id !== id))
    setMenu(null)
  }

  function toggleMaximize(id: WindowKind) {
    setWindows((current) =>
      current.map((window) =>
        window.id === id
          ? { ...window, maximized: !window.maximized, snapped: undefined }
          : window,
      ),
    )
    focusWindow(id)
  }

  function snapWindow(id: WindowKind, side: 'left' | 'right') {
    setWindows((current) =>
      current.map((window) =>
        window.id === id
          ? { ...window, maximized: false, snapped: side }
          : window,
      ),
    )
    focusWindow(id)
  }
  function geometry(window: DesktopWindow) {
    const width = Math.max(250, Math.min(window.width, size.width - 20))
    const height = Math.max(200, Math.min(window.height, size.height - 52))
    if (window.snapped) {
      if (size.width < 560)
        return {
          left: 8,
          top:
            window.snapped === 'left'
              ? 8
              : Math.max(8, size.height - height - 42),
          width: size.width - 16,
          height,
        }
      const halfWidth = (size.width - 20) / 2
      return {
        left: window.snapped === 'left' ? 8 : halfWidth + 12,
        top: 8,
        width: halfWidth,
        height: size.height - 50,
      }
    }
    return window.maximized
      ? {
          left: 3,
          top: 3,
          width: size.width - 6,
          height: size.height - (variant === 'modern' ? 55 : 38),
        }
      : {
          left: Math.max(8, Math.min(window.x, size.width - width - 8)),
          top: Math.max(8, Math.min(window.y, size.height - height - 40)),
          width,
          height,
        }
  }

  function beginDrag(
    event: ReactPointerEvent<HTMLDivElement>,
    window: DesktopWindow,
  ) {
    if (
      window.maximized ||
      (event.target instanceof Element && event.target.closest('button'))
    )
      return
    event.currentTarget.focus({ preventScroll: true })
    const position = geometry(window)
    drag.current = {
      id: window.id,
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      x: position.left,
      y: position.top,
    }
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  function moveDrag(event: ReactPointerEvent<HTMLDivElement>) {
    const movement = drag.current
    if (!movement || movement.pointerId !== event.pointerId) return
    const x = movement.x + event.clientX - movement.startX
    const y = movement.y + event.clientY - movement.startY
    setWindows((current) =>
      current.map((window) =>
        window.id === movement.id
          ? { ...window, x, y, snapped: undefined }
          : window,
      ),
    )
  }

  function moveWithKeyboard(
    event: ReactKeyboardEvent<HTMLDivElement>,
    window: DesktopWindow,
  ) {
    if (event.target !== event.currentTarget) return
    const direction = {
      ArrowLeft: [-1, 0],
      ArrowRight: [1, 0],
      ArrowUp: [0, -1],
      ArrowDown: [0, 1],
    }[event.key]
    if (!direction) return
    event.preventDefault()
    if (window.maximized) return
    const position = geometry(window)
    const step = event.shiftKey ? 32 : 8
    const x = Math.max(
      8,
      Math.min(
        position.left + direction[0] * step,
        size.width - position.width - 8,
      ),
    )
    const y = Math.max(
      8,
      Math.min(
        position.top + direction[1] * step,
        size.height - position.height - 40,
      ),
    )
    setWindows((current) =>
      current.map((item) =>
        item.id === window.id ? { ...item, x, y, snapped: undefined } : item,
      ),
    )
  }

  function navigateBrowser(rawAddress: string, recordHistory = true) {
    const normalized = rawAddress
      .trim()
      .replace(/^https?:\/\//i, '')
      .replace(/\/$/, '')
      .toLowerCase()
    const nextAddress = `http://${normalized || 'welcome.local'}/`
      .replace(/\/links\/$/, '/links')
      .replace(/\/history\/$/, '/history')
    setAddress(nextAddress)
    setBrowserPage(knownAddresses[normalized || 'welcome.local'] ?? 'missing')
    setBrowserStatus('Done')
    if (recordHistory) setBrowserHistory((history) => [...history, nextAddress])
  }

  function renderMenus(window: DesktopWindow) {
    const menuKey = (label: string) => `${window.id}-${label}`
    const choose = (action: () => void) => {
      action()
      setMenu(null)
    }
    return (
      <div className="win95-menubar">
        {['File', 'View', 'Help'].map((label) => (
          <div className="win95-menu-group" key={label}>
            <button
              className={
                menu === menuKey(label)
                  ? 'win95-menu-trigger win95-menu-trigger-open'
                  : 'win95-menu-trigger'
              }
              aria-haspopup="menu"
              aria-expanded={menu === menuKey(label)}
              onClick={() =>
                setMenu(menu === menuKey(label) ? null : menuKey(label))
              }
            >
              <u>{label[0]}</u>
              {label.slice(1)}
            </button>
            {menu === menuKey(label) && (
              <div className="win95-dropdown" role="menu">
                {label === 'File' && (
                  <>
                    {window.id === 'notepad' && (
                      <button role="menuitem" onClick={() => choose(saveNote)}>
                        Save note
                      </button>
                    )}
                    <button
                      role="menuitem"
                      onClick={() => choose(() => openNote('Read me', readme))}
                    >
                      Open Read me
                    </button>
                    <button
                      role="menuitem"
                      onClick={() => choose(() => closeWindow(window.id))}
                    >
                      Close window
                    </button>
                  </>
                )}
                {label === 'View' && (
                  <>
                    {window.id === 'explorer' && (
                      <button
                        role="menuitem"
                        onClick={() =>
                          choose(() => setDetailsView((value) => !value))
                        }
                      >
                        {detailsView ? '✓ Details' : 'Large icons'} →{' '}
                        {detailsView ? 'Large icons' : 'Details'}
                      </button>
                    )}
                    <button
                      role="menuitem"
                      onClick={() => choose(() => toggleMaximize(window.id))}
                    >
                      {window.maximized ? 'Restore window' : 'Maximize window'}
                    </button>
                  </>
                )}
                {label === 'Help' && (
                  <>
                    <button
                      role="menuitem"
                      onClick={() =>
                        choose(() => openNote('Desktop help', readme))
                      }
                    >
                      How to explore
                    </button>
                    <button
                      role="menuitem"
                      onClick={() =>
                        choose(() => {
                          setShowDisplay(false)
                          openWindow('about', 'About Windows')
                        })
                      }
                    >
                      About this desktop
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    )
  }

  function renderExplorer() {
    const currentFolder = {
      ...folders[folder],
      items: folders[folder].items.filter(
        (item) =>
          !(
            variant === 'modern' &&
            folder === 'computer' &&
            item.folder === 'floppy'
          ),
      ),
    }
    return (
      <>
        <div className="win95-explorer-toolbar">
          <button
            className="win95-toolbar-button"
            disabled={!folderHistory.length}
            onClick={() => {
              const previous = folderHistory.at(-1)
              if (previous) {
                setFolderHistory((history) => history.slice(0, -1))
                goToFolder(previous, false)
              }
            }}
          >
            <span aria-hidden="true">←</span> Back
          </button>
          <button
            className="win95-toolbar-button"
            disabled={!currentFolder.parent}
            onClick={() =>
              currentFolder.parent && goToFolder(currentFolder.parent)
            }
          >
            <span aria-hidden="true">↑</span> Up
          </button>
          <span className="win95-toolbar-divider" />
          <span className="win95-address-label">Address</span>
          <div className="win95-folder-address">
            <PixelIcon
              variant={variant}
              name={folder === 'computer' ? 'computer' : 'folder'}
              size={15}
            />
            <span>{currentFolder.label}</span>
            <span aria-hidden="true">▾</span>
          </div>
        </div>
        <div className="win95-explorer-content">
          <aside className="win95-explorer-aside">
            <PixelIcon
              variant={variant}
              name={folder === 'computer' ? 'computer' : 'folder'}
              size={36}
            />
            <h4>{currentFolder.label}</h4>
            <div className="win95-rainbow-line" />
            <p>
              {folder === 'computer'
                ? 'Select an item to see what’s inside.'
                : 'A little piece of your digital past.'}
            </p>
            <span>{desktopName}</span>
          </aside>
          <div
            className={
              detailsView ? 'win95-files win95-files-details' : 'win95-files'
            }
          >
            {currentFolder.items.map((item) => (
              <button
                key={item.name}
                className={
                  selectedFile === item.name
                    ? 'win95-file win95-file-selected'
                    : 'win95-file'
                }
                onClick={() => openFile(item)}
              >
                <PixelIcon variant={variant} name={item.icon} />
                <span>{item.name}</span>
                {detailsView && (
                  <small>
                    {item.folder
                      ? 'File folder'
                      : item.action
                        ? 'Control panel'
                        : 'Text document'}
                  </small>
                )}
              </button>
            ))}
            {currentFolder.empty && (
              <p className="win95-empty-folder">{currentFolder.empty}</p>
            )}
          </div>
        </div>
        <div className="win95-statusbar">
          <span>{currentFolder.items.length} object(s)</span>
          <span>
            {folder === 'computer'
              ? `Your computer, circa ${desktopYear}`
              : 'Simulated files'}
          </span>
        </div>
      </>
    )
  }

  function renderBrowser() {
    return (
      <>
        <div className="win95-browser-toolbar">
          <button
            className="win95-browser-tool"
            disabled={browserHistory.length < 2}
            onClick={() => {
              const previous = browserHistory.at(-2)
              if (previous) {
                setBrowserHistory((history) => history.slice(0, -1))
                navigateBrowser(previous, false)
              }
            }}
          >
            <span aria-hidden="true">←</span>Back
          </button>
          <button
            className="win95-browser-tool"
            onClick={() => {
              navigateBrowser(address, false)
              setBrowserStatus('Page refreshed. Done')
            }}
          >
            <span aria-hidden="true">↻</span>Refresh
          </button>
          <button
            className="win95-browser-tool"
            onClick={() => navigateBrowser('welcome.local')}
          >
            <PixelIcon variant={variant} name="computer" size={22} />
            Home
          </button>
          <div className="win95-browser-brand">
            <PixelIcon variant={variant} name="internet" size={30} />
          </div>
        </div>
        <form
          className="win95-browser-address"
          onSubmit={(event) => {
            event.preventDefault()
            navigateBrowser(address)
          }}
        >
          <label htmlFor="dtm-browser-address">Address</label>
          <input
            id="dtm-browser-address"
            value={address}
            onChange={(event) => setAddress(event.target.value)}
            spellCheck={false}
            autoComplete="off"
          />
          <button type="submit">
            Go <span aria-hidden="true">↵</span>
          </button>
        </form>
        <div className="win95-webpage">
          <div className="win95-webpage-eyebrow">
            THE WORLD WIDE WEB · SIMULATED
          </div>
          {browserPage === 'home' && (
            <>
              <div className="win95-webpage-heading">
                <PixelIcon variant={variant} name="internet" size={44} />
                <h3>Welcome to the Internet!</h3>
              </div>
              <hr />
              <p>You have arrived at the information superhighway.</p>
              <p>
                A whole world of ideas is just a click away. Where would you
                like to go today?
              </p>
              <div className="win95-web-links">
                <button onClick={() => navigateBrowser('welcome.local/links')}>
                  ✧ A few interesting places
                </button>
                <button
                  onClick={() => navigateBrowser('welcome.local/history')}
                >
                  ✧ A moment in web history
                </button>
              </div>
              <hr />
              <p className="win95-webpage-footer">
                Best viewed with a sense of wonder.{' '}
                <span>Visitors: 000095</span>
              </p>
            </>
          )}
          {browserPage === 'links' && (
            <>
              <h3>My Favorite Places</h3>
              <hr />
              <p>A tiny directory from the early web. Choose a destination:</p>
              <div className="win95-web-links">
                <button
                  onClick={() => navigateBrowser('welcome.local/history')}
                >
                  The story of the World Wide Web
                </button>
                <button
                  onClick={() =>
                    openNote('1995.txt', folders.documents.items[1].text!)
                  }
                >
                  Notes from 1995
                </button>
                <button onClick={() => navigateBrowser('welcome.local')}>
                  Return to the home page
                </button>
              </div>
              <p className="win95-webpage-footer">
                These pages live entirely inside this time machine.
              </p>
            </>
          )}
          {browserPage === 'history' && (
            <>
              <h3>A Web of Possibilities</h3>
              <hr />
              <p>
                Tim Berners-Lee proposed the World Wide Web at CERN in 1989. The
                first website went online in 1991.
              </p>
              <p>
                By 1995, browsers like Netscape Navigator were helping more
                people discover the web, one hyperlink at a time.
              </p>
              <button
                className="win95-web-link"
                onClick={() => navigateBrowser('welcome.local')}
              >
                ← Back to the welcome page
              </button>
            </>
          )}
          {browserPage === 'missing' && (
            <>
              <h3>This address is beyond our little web.</h3>
              <hr />
              <p>
                This browser is a local simulation. Try one of these addresses:
              </p>
              <div className="win95-web-links">
                <button onClick={() => navigateBrowser('welcome.local')}>
                  http://welcome.local/
                </button>
                <button onClick={() => navigateBrowser('welcome.local/links')}>
                  http://welcome.local/links
                </button>
                <button
                  onClick={() => navigateBrowser('welcome.local/history')}
                >
                  http://welcome.local/history
                </button>
              </div>
            </>
          )}
        </div>
        <div className="win95-statusbar">
          <span>{browserStatus}</span>
          <span>Local simulation</span>
        </div>
      </>
    )
  }

  function renderAbout() {
    if (showDisplay)
      return (
        <div className="win95-dialog-content">
          <div
            className="win95-display-preview"
            style={{
              backgroundColor:
                wallpaper === 'teal'
                  ? '#008080'
                  : wallpaper === 'blue'
                    ? '#315d90'
                    : '#684a6a',
            }}
          >
            <span>Desktop preview</span>
          </div>
          <p>Choose your desktop color:</p>
          <div className="win95-color-options">
            {(['teal', 'blue', 'plum'] as const).map((color) => (
              <button
                key={color}
                className={
                  wallpaper === color
                    ? 'win95-classic-button win95-color-selected'
                    : 'win95-classic-button'
                }
                aria-pressed={wallpaper === color}
                onClick={() => setWallpaper(color)}
              >
                {color[0].toUpperCase() + color.slice(1)}
              </button>
            ))}
          </div>
          <button
            className="win95-classic-button win95-dialog-ok"
            onClick={() => closeWindow('about')}
          >
            OK
          </button>
        </div>
      )
    return (
      <div className="win95-dialog-content">
        <div className="win95-about-heading">
          <PixelIcon variant={variant} name="flag" size={48} />
          <div>
            <strong>{desktopName} desktop</strong>
            <span>An interactive time capsule</span>
          </div>
        </div>
        <hr />
        <p>
          {variant === 'win95'
            ? 'Inspired by the desktop introduced on August 24, 1995.'
            : variant === 'xp'
              ? 'Inspired by Windows XP, released on October 25, 2001.'
              : 'An original contemporary desktop playground, viewed in 2026.'}
        </p>
        <p>
          This is a browser-based reconstruction. All files, pages, and settings
          are simulated.
        </p>
        <button
          className="win95-classic-button win95-dialog-ok"
          onClick={() => closeWindow('about')}
        >
          OK
        </button>
      </div>
    )
  }

  const desktopIcons: { label: string; icon: IconName; action: () => void }[] =
    [
      {
        label: 'My Computer',
        icon: 'computer',
        action: () => goToFolder('computer'),
      },
      {
        label: 'Internet',
        icon: 'internet',
        action: () => openWindow('browser'),
      },
      {
        label: 'Read me',
        icon: 'document',
        action: () => openNote('Read me', readme),
      },
      {
        label: 'Recycle Bin',
        icon: 'recycle',
        action: () => goToFolder('recycle'),
      },
    ]

  return (
    <div
      ref={desktopRef}
      className={`dtm-desktop dtm-desktop-${wallpaper} desktop-variant-${variant}`}
      aria-label={`Interactive simulated ${desktopName} desktop`}
      onPointerDown={() => {
        setStartOpen(false)
        setMenu(null)
      }}
      onKeyDown={(event) => {
        if (event.key === 'Escape') {
          setStartOpen(false)
          setMenu(null)
        }
      }}
    >
      <div className="win95-desktop-icons">
        {desktopIcons.map((icon) => (
          <button
            key={icon.label}
            className="win95-desktop-icon"
            onClick={icon.action}
          >
            <PixelIcon variant={variant} name={icon.icon} />
            <span>{icon.label}</span>
          </button>
        ))}
      </div>
      <div className="win95-desktop-watermark" aria-hidden="true">
        <span>YOU ARE HERE</span>
        <strong>{desktopYear}</strong>
        <small>
          {variant === 'modern' ? 'THE CONNECTED DESKTOP' : 'THE DESKTOP ERA'}
        </small>
      </div>
      {windows.map((window) => (
        <div
          key={window.id}
          className={`win95-window ${activeId === window.id ? 'win95-window-active' : ''} ${window.id === 'shutdown' || window.id === 'about' ? 'win95-window-dialog' : ''}`}
          role="dialog"
          aria-label={window.title}
          hidden={window.minimized}
          style={{ ...geometry(window), zIndex: window.z } as CSSProperties}
          onPointerDown={(event) => {
            event.stopPropagation()
            focusWindow(window.id)
            if (!(
              event.target instanceof Element &&
              event.target.closest('.win95-menu-group')
            ))
              setMenu(null)
          }}
        >
          <div
            className="win95-titlebar"
            role="group"
            tabIndex={0}
            aria-label={`Move ${window.title}`}
            title="Drag to move, or focus this bar and use arrow keys. Hold Shift to move faster."
            onFocus={() => focusWindow(window.id)}
            onKeyDown={(event) => moveWithKeyboard(event, window)}
            onPointerDown={(event) => beginDrag(event, window)}
            onPointerMove={moveDrag}
            onPointerUp={() => {
              drag.current = null
            }}
            onPointerCancel={() => {
              drag.current = null
            }}
            onDoubleClick={() => toggleMaximize(window.id)}
          >
            <div className="win95-window-title">
              <PixelIcon
                variant={variant}
                name={
                  window.id === 'browser'
                    ? 'internet'
                    : window.id === 'notepad'
                      ? 'document'
                      : window.id === 'explorer'
                        ? 'computer'
                        : 'flag'
                }
                size={16}
              />
              <span>{window.title}</span>
            </div>
            <div className="win95-window-controls">
              {variant === 'modern' && (
                <>
                  <button
                    aria-label={`Snap ${window.title} left`}
                    title="Snap left"
                    onClick={() => snapWindow(window.id, 'left')}
                  >
                    ◧
                  </button>
                  <button
                    aria-label={`Snap ${window.title} right`}
                    title="Snap right"
                    onClick={() => snapWindow(window.id, 'right')}
                  >
                    ◨
                  </button>
                </>
              )}
              <button
                aria-label={`Minimize ${window.title}`}
                title="Minimize"
                onClick={() =>
                  setWindows((current) =>
                    current.map((item) =>
                      item.id === window.id
                        ? { ...item, minimized: true }
                        : item,
                    ),
                  )
                }
              >
                <span className="win95-minimize-glyph" />
              </button>
              <button
                aria-label={`${window.maximized ? 'Restore' : 'Maximize'} ${window.title}`}
                title={window.maximized ? 'Restore' : 'Maximize'}
                onClick={() => toggleMaximize(window.id)}
              >
                <span
                  className={
                    window.maximized
                      ? 'win95-restore-glyph'
                      : 'win95-maximize-glyph'
                  }
                />
              </button>
              <button
                aria-label={`Close ${window.title}`}
                title="Close"
                onClick={() => closeWindow(window.id)}
              >
                <span className="win95-close-glyph">×</span>
              </button>
            </div>
          </div>
          {window.id !== 'about' &&
            window.id !== 'shutdown' &&
            renderMenus(window)}
          {window.id === 'explorer' && renderExplorer()}
          {window.id === 'browser' && renderBrowser()}
          {window.id === 'notepad' && (
            <>
              <div className="win95-notepad-toolbar">
                <button className="win95-classic-button" onClick={saveNote}>
                  Save note
                </button>
                <span id="win95-note-scope">
                  Session only · resets on Restart or reload
                </span>
              </div>
              <textarea
                key={note.id}
                className="win95-notepad"
                aria-label={`${note.name} contents`}
                aria-describedby="win95-note-scope"
                value={currentDocument.text}
                spellCheck={false}
                onChange={(event) => {
                  const text = event.target.value
                  setDocuments((current) => ({
                    ...current,
                    [note.id]: {
                      ...(current[note.id] ?? currentDocument),
                      text,
                    },
                  }))
                }}
                onKeyDown={(event) => {
                  if (
                    (event.ctrlKey || event.metaKey) &&
                    event.key.toLowerCase() === 's'
                  ) {
                    event.preventDefault()
                    saveNote()
                  }
                }}
              />
              <div className="win95-statusbar win95-notepad-status">
                <span role="status" aria-live="polite">
                  {noteChanged
                    ? 'Unsaved changes · session only'
                    : currentDocument.saved
                      ? 'Saved for this session'
                      : 'Original template · editable'}
                </span>
                <span>Simulated text file</span>
              </div>
            </>
          )}
          {window.id === 'about' && renderAbout()}
          {window.id === 'shutdown' && (
            <div className="win95-dialog-content">
              <div className="win95-shutdown-message">
                <PixelIcon variant={variant} name="computer" size={40} />
                <p>
                  Ready for a fresh start?
                  <br />
                  <br />
                  Restarting resets this simulated desktop.
                </p>
              </div>
              <div className="win95-dialog-actions">
                <button
                  className="win95-classic-button"
                  onClick={() => {
                    setWindows([{ ...initialWindow, z: ++zCounter.current }])
                    setFolder('computer')
                    setFolderHistory([])
                    setWallpaper('teal')
                    setSelectedFile('')
                    setDetailsView(false)
                    setShowDisplay(false)
                    setBrowserPage('home')
                    setBrowserStatus('Done')
                    setAddress('http://welcome.local/')
                    setBrowserHistory(['http://welcome.local/'])
                    setAppSearch('')
                    setDocuments({})
                    setNote({ id: 'readme', name: 'Read me' })
                  }}
                >
                  Restart
                </button>
                <button
                  className="win95-classic-button"
                  onClick={() => closeWindow('shutdown')}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
      {startOpen && (
        <div
          className="win95-start-menu"
          onPointerDown={(event) => event.stopPropagation()}
        >
          <div className="win95-start-brand">
            {variant === 'modern' ? 'MUSEUM' : 'Windows'}
            <span>
              {variant === 'win95' ? '95' : variant === 'xp' ? 'XP' : 'OS'}
            </span>
          </div>
          {variant === 'modern' ? (
            <div className="modern-launcher">
              <label htmlFor="modern-app-search">Search apps and files</label>
              <input
                id="modern-app-search"
                value={appSearch}
                onChange={(event) => setAppSearch(event.target.value)}
                placeholder="Try Notepad or Welcome.txt"
                autoComplete="off"
              />
              <div className="modern-app-results">
                {[
                  {
                    name: 'Notepad',
                    icon: 'document' as const,
                    action: () => openNote('Read me', readme),
                  },
                  {
                    name: 'Files',
                    icon: 'folder' as const,
                    action: () => goToFolder('computer'),
                  },
                  {
                    name: 'Browser',
                    icon: 'internet' as const,
                    action: () => openWindow('browser'),
                  },
                  {
                    name: 'Documents',
                    icon: 'folder' as const,
                    action: () => goToFolder('documents'),
                  },
                  {
                    name: 'Welcome.txt',
                    icon: 'document' as const,
                    action: () =>
                      openNote('Welcome.txt', folders.documents.items[0].text!),
                  },
                  {
                    name: 'About this desktop',
                    icon: 'settings' as const,
                    action: () => {
                      setShowDisplay(false)
                      openWindow('about')
                    },
                  },
                ]
                  .filter((app) =>
                    app.name
                      .toLowerCase()
                      .includes(appSearch.toLowerCase().trim()),
                  )
                  .map((app) => (
                    <button key={app.name} onClick={app.action}>
                      <PixelIcon variant={variant} name={app.icon} size={25} />
                      <span>{app.name}</span>
                    </button>
                  ))}
              </div>
              {![
                'notepad',
                'files',
                'browser',
                'documents',
                'welcome.txt',
                'about this desktop',
              ].some((name) =>
                name.includes(appSearch.toLowerCase().trim()),
              ) && (
                <p className="modern-empty-search" role="status">
                  No apps or files found. Try Notepad or Documents.
                </p>
              )}
            </div>
          ) : (
            <div className="win95-start-items">
              <button onClick={() => goToFolder('computer')}>
                <PixelIcon variant={variant} name="computer" />
                <span>My Computer</span>
              </button>
              <button onClick={() => openWindow('browser')}>
                <PixelIcon variant={variant} name="internet" />
                <span>Internet Explorer</span>
              </button>
              <button onClick={() => goToFolder('documents')}>
                <PixelIcon variant={variant} name="folder" />
                <span>Documents</span>
              </button>
              <button onClick={() => openNote('Read me', readme)}>
                <PixelIcon variant={variant} name="document" />
                <span>Read me</span>
              </button>
              <div className="win95-start-separator" />
              <button
                onClick={() => {
                  setShowDisplay(false)
                  openWindow('about', 'About Windows')
                }}
              >
                <PixelIcon variant={variant} name="settings" />
                <span>About this desktop</span>
              </button>
              <div className="win95-start-separator" />
              <button onClick={() => openWindow('shutdown')}>
                <PixelIcon variant={variant} name="computer" />
                <span>Shut Down…</span>
              </button>
            </div>
          )}
        </div>
      )}
      <div
        className="win95-taskbar"
        onPointerDown={(event) => event.stopPropagation()}
      >
        <button
          className={`win95-start-button ${startOpen ? 'win95-start-button-pressed' : ''}`}
          aria-expanded={startOpen}
          aria-label="Start menu"
          onClick={() => {
            setStartOpen((open) => !open)
            setMenu(null)
          }}
        >
          <PixelIcon variant={variant} name="flag" size={23} />
          <strong>{variant === 'modern' ? 'Apps' : 'Start'}</strong>
        </button>
        <div className="win95-taskbar-divider" />
        <div className="win95-task-list">
          {windows.map((window) => (
            <button
              key={window.id}
              className={`win95-task-button ${activeId === window.id ? 'win95-task-button-active' : ''}`}
              aria-label={`${window.minimized ? 'Restore' : 'Switch to'} ${window.title}`}
              aria-pressed={activeId === window.id}
              onClick={() => {
                setStartOpen(false)
                setMenu(null)
                if (activeId === window.id && !window.minimized)
                  setWindows((current) =>
                    current.map((item) =>
                      item.id === window.id
                        ? { ...item, minimized: true }
                        : item,
                    ),
                  )
                else focusWindow(window.id)
              }}
            >
              <PixelIcon
                variant={variant}
                name={
                  window.id === 'browser'
                    ? 'internet'
                    : window.id === 'notepad'
                      ? 'document'
                      : 'computer'
                }
                size={16}
              />
              <span>{window.title}</span>
            </button>
          ))}
        </div>
        <div className="win95-clock" aria-label="Simulated time, 9:41 AM">
          <span aria-hidden="true">◖))</span>9:41 AM
        </div>
      </div>
    </div>
  )
}
