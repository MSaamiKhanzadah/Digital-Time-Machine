export interface MuseumComputer {
  id: string
  name: string
  manufacturer: string
  year: number
  configuration: string
  cpu: string
  ram: string
  storage: string
  price: string
  significance: string
  note: string
  illustrationEra: 1995 | 2010 | 2026
  source: { label: string; url: string }
}

export const computerSpecLabels = [
  ['manufacturer', 'Manufacturer'],
  ['year', 'Release / snapshot year'],
  ['configuration', 'Configuration'],
  ['cpu', 'CPU'],
  ['ram', 'RAM'],
  ['storage', 'Storage'],
  ['price', 'US launch price'],
] as const

export const museumComputers: MuseumComputer[] = [
  {
    id: 'ibm-pc',
    name: 'IBM PC 5150',
    manufacturer: 'IBM',
    year: 1981,
    configuration: 'Original base system',
    cpu: 'Intel 8088 · 4.77 MHz',
    ram: '16 KB',
    storage: 'No disk drive in the base system; drives were optional',
    price: '$1,565 · base system',
    significance:
      'IBM’s personal computer helped establish an architecture that other manufacturers adopted and extended, shaping the PC-compatible market.',
    note: 'The base price excluded a display and disk drives. More capable configurations cost more.',
    illustrationEra: 1995,
    source: {
      label: 'IBM · The IBM PC',
      url: 'https://www.ibm.com/history/personal-computer',
    },
  },
  {
    id: 'macintosh',
    name: 'Macintosh 128K',
    manufacturer: 'Apple',
    year: 1984,
    configuration: 'Original Macintosh',
    cpu: 'Motorola 68000 · approximately 8 MHz',
    ram: '128 KB',
    storage: 'One 400 KB 3.5-inch floppy drive; no internal hard drive',
    price: '$2,495',
    significance:
      'An integrated display, graphical desktop, and mouse introduced many buyers to a different way of using a personal computer.',
    note: 'Originally sold simply as Macintosh; “128K” distinguishes it from later models. Apple did not invent the graphical interface or mouse.',
    illustrationEra: 1995,
    source: {
      label: 'Computer History Museum · 1984',
      url: 'https://www.computerhistory.org/timeline/1984/',
    },
  },
  {
    id: 'windows-95-pc',
    name: 'Windows 95-compatible PC',
    manufacturer: 'Multiple PC manufacturers',
    year: 1995,
    configuration:
      'Representative OS minimum, not a specific manufactured model',
    cpu: 'Intel 386DX · 20 MHz minimum',
    ram: '4 MB minimum · 8 MB recommended',
    storage: 'Typically 50–55 MB free disk space for a clean OS installation',
    price: 'Hardware configuration dependent; no single product price',
    significance:
      'Windows 95 brought the Start menu and taskbar to an enormous range of compatible PCs, from older upgraded machines to newly purchased systems.',
    note: 'These are Microsoft’s operating-system requirements, not typical retail PC specifications. Free disk space is not total drive capacity.',
    illustrationEra: 1995,
    source: {
      label: 'Archived Microsoft KB 138349 · Windows 95 requirements',
      url: 'https://jeffpar.github.io/kbarchive/kb/138/Q138349/',
    },
  },
  {
    id: 'mac-mini',
    name: 'Mac mini',
    manufacturer: 'Apple',
    year: 2005,
    configuration: 'Original 1.25 GHz base model',
    cpu: 'PowerPC G4 · 1.25 GHz',
    ram: '256 MB',
    storage: '40 GB hard drive',
    price: '$499',
    significance:
      'A compact desktop lowered the entry price for a new Mac while allowing buyers to reuse an existing display, keyboard, and mouse.',
    note: 'Display, keyboard, and mouse were sold separately. A more expensive 1.42 GHz configuration was also offered.',
    illustrationEra: 2010,
    source: {
      label: 'Apple · Mac mini introduction',
      url: 'https://www.apple.com/newsroom/2005/01/11Apple-Introduces-Mac-mini/',
    },
  },
  {
    id: 'macbook-air',
    name: '11-inch MacBook Air',
    manufacturer: 'Apple',
    year: 2010,
    configuration: 'Late-2010 11-inch base model',
    cpu: 'Intel Core 2 Duo · 1.4 GHz',
    ram: '2 GB',
    storage: '64 GB flash storage',
    price: '$999',
    significance:
      'The redesigned Air made flash storage standard in a thin notebook, helping establish a design direction for portable computers.',
    note: 'These specifications describe the 11-inch base model. The 13-inch Air and upgraded configurations had different specifications and prices.',
    illustrationEra: 2010,
    source: {
      label: 'Apple · 2010 MacBook Air introduction',
      url: 'https://www.apple.com/newsroom/2010/10/20Apple-Reinvents-Notebooks-With-New-MacBook-Air/',
    },
  },
  {
    id: 'm1-air',
    name: 'M1 MacBook Air',
    manufacturer: 'Apple',
    year: 2020,
    configuration: 'Original M1 base model',
    cpu: 'Apple M1 · 8-core CPU, 7-core GPU',
    ram: '8 GB unified memory',
    storage: '256 GB SSD',
    price: '$999',
    significance:
      'The first Apple silicon MacBook Air paired an integrated system on a chip with a fanless design, marking the start of the Mac’s processor transition.',
    note: 'Unified memory is shared by the CPU, GPU, and other components. Higher-memory and higher-storage configurations cost more.',
    illustrationEra: 2026,
    source: {
      label: 'Apple · The next generation of Mac',
      url: 'https://www.apple.com/newsroom/2020/11/introducing-the-next-generation-of-mac/',
    },
  },
]
