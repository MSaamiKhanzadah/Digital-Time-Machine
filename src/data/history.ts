export type EraYear = 1995 | 2010 | 2026

export type CategoryId =
  'computers' | 'internet' | 'software' | 'programming' | 'mobile'

export interface Era {
  year: EraYear
  label: string
  eyebrow: string
  headline: [string, string]
  intro: string
  signal: string
  stat: { value: string; label: string }
  accent?: string
}

export interface Exhibit {
  id: string
  year: EraYear
  category: CategoryId
  name: string
  subtitle: string
  date: string
  description: string
  facts: string[]
  source: { label: string; url: string }
  tag: string
}

export const eras: Record<EraYear, Era> = {
  1995: {
    year: 1995,
    label: 'The digital dawn',
    eyebrow: 'A NEW WORLD IS LOADING',
    headline: ['Welcome to', 'the world wide web.'],
    intro:
      'Dial-up tones. Desktop towers. A whole new world behind a blinking cursor. Step into a year when the web reached more homes.',
    signal: 'DIAL-UP CONNECTED',
    stat: {
      value: '28.8',
      label: 'kilobits per second · a common modem speed',
    },
    accent: '#bd542f',
  },
  2010: {
    year: 2010,
    label: 'The connected generation',
    eyebrow: 'EVERYTHING IS CONNECTING',
    headline: ['The web', 'gets social.'],
    intro:
      'The laptop gets lighter, the phone gets smarter, and the internet follows us everywhere. Explore a world learning to live online.',
    signal: 'BROADBAND CONNECTED',
    stat: { value: '326', label: 'pixels per inch · the iPhone 4 display' },
    accent: '#426a9b',
  },
  2026: {
    year: 2026,
    label: 'The always-on world',
    eyebrow: 'UNDERSTAND TOMORROW. EXPLORE YESTERDAY.',
    headline: ['The future', 'has a past.'],
    intro:
      'From the first click to a world in your pocket. Travel through the computers, connections, and ideas that shaped how we live today.',
    signal: 'YOU ARE IN THE PRESENT',
    stat: { value: '76', label: 'years of digital history · 1950—2026' },
    accent: '#bd542f',
  },
}

export const timelineYears = [1995, 2000, 2005, 2010, 2015, 2020, 2026] as const

export const categories: {
  id: CategoryId
  label: string
  description: string
}[] = [
  {
    id: 'computers',
    label: 'Computers',
    description: 'The machines that brought the digital world home.',
  },
  {
    id: 'internet',
    label: 'Internet',
    description: 'From a dial-up connection to an always-on world.',
  },
  {
    id: 'software',
    label: 'Software',
    description: 'The interfaces and tools behind everyday computing.',
  },
  {
    id: 'programming',
    label: 'Programming',
    description: 'The languages people use to build what comes next.',
  },
  {
    id: 'mobile',
    label: 'Mobile',
    description: 'A telephone becomes a computer in your pocket.',
  },
]

// An exhibit's year identifies its gallery. Its date records the actual debut
// where relevant; the 2026 gallery describes established platforms in use today.
export const exhibits: Exhibit[] = [
  {
    id: 'power-macintosh-9500',
    year: 1995,
    category: 'computers',
    name: 'Power Macintosh 9500',
    subtitle: 'A desktop with room to grow.',
    date: 'Introduced June 1995',
    description:
      'Apple’s expandable tower put the PowerPC 604 processor and PCI expansion on the desktop. For designers and other professionals, the personal computer was becoming a serious creative tool.',
    facts: [
      'PowerPC 604 processor',
      'Initial 120 MHz and 132 MHz models',
      'Six PCI expansion slots',
    ],
    source: {
      label: 'Computer History Museum collection',
      url: 'https://www.computerhistory.org/collections/search/?s=Power+Macintosh+9500',
    },
    tag: 'THE DESKTOP ERA',
  },
  {
    id: 'netscape-navigator',
    year: 1995,
    category: 'internet',
    name: 'Netscape Navigator',
    subtitle: 'The web has a front door.',
    date: 'First released 1994 · widely used in 1995',
    description:
      'A graphical browser made the web something you could explore by clicking. Pages of text, images, and blue links opened a window onto a growing public internet.',
    facts: [
      'Graphical browsing on personal computers',
      'Navigator 1.x was available in 1995',
      'Often reached through a dial-up modem',
    ],
    source: {
      label: 'Computer History Museum · 1994',
      url: 'https://www.computerhistory.org/timeline/1994/',
    },
    tag: 'THE WORLD WIDE WEB',
  },
  {
    id: 'windows-95',
    year: 1995,
    category: 'software',
    name: 'Windows 95',
    subtitle: 'It all starts here.',
    date: 'Released August 24, 1995',
    description:
      'The Start menu and taskbar gave millions of people a new way to find programs and switch between them. Their influence is still visible in desktop interfaces today.',
    facts: [
      'Introduced the Start menu',
      'Taskbar for switching between programs',
      'Long file names became easier to use',
    ],
    source: {
      label: 'Computer History Museum · 1995',
      url: 'https://www.computerhistory.org/timeline/1995/',
    },
    tag: 'A FAMILIAR NEW INTERFACE',
  },
  {
    id: 'java',
    year: 1995,
    category: 'programming',
    name: 'Java',
    subtitle: 'One language. New possibilities.',
    date: 'Publicly introduced May 23, 1995',
    description:
      'Sun Microsystems introduced a language designed to run across different kinds of computers through a virtual machine. Java would grow far beyond its early experiments in web applets.',
    facts: [
      'Programs compile to Java bytecode',
      'A Java Virtual Machine runs the bytecode',
      'Java 1.0 followed in January 1996',
    ],
    source: {
      label: 'Computer History Museum · 1995',
      url: 'https://www.computerhistory.org/timeline/1995/',
    },
    tag: 'WRITE ONCE, RUN ANYWHERE',
  },
  {
    id: 'nokia-2110',
    year: 1995,
    category: 'mobile',
    name: 'Nokia 2110',
    subtitle: 'A connection you could carry.',
    date: 'Introduced 1994 · in use in 1995',
    description:
      'A small monochrome display, physical keys, and an extendable antenna defined a different kind of mobile life. The Nokia 2110 brought calls and SMS to a growing GSM audience.',
    facts: [
      'GSM digital mobile network',
      'Physical numeric keypad',
      'SMS text messaging',
    ],
    source: {
      label: 'Science Museum Group collection',
      url: 'https://collection.sciencemuseumgroup.org.uk/search?q=Nokia%202110',
    },
    tag: 'CALLS. TEXTS. POSSIBILITY.',
  },
  {
    id: 'macbook-air-2010',
    year: 2010,
    category: 'computers',
    name: 'MacBook Air',
    subtitle: 'The future gets lighter.',
    date: 'Redesigned October 20, 2010',
    description:
      'The redesigned Air paired a thin aluminum body with flash storage. Offered in 11-inch and 13-inch sizes, it helped make the light, portable notebook feel like an everyday computer.',
    facts: [
      '11-inch and 13-inch models',
      'Flash storage as standard',
      'No built-in optical disc drive',
    ],
    source: {
      label: 'Apple · MacBook Air introduction',
      url: 'https://www.apple.com/newsroom/2010/10/20Apple-Reinvents-Notebooks-With-New-MacBook-Air/',
    },
    tag: 'TAKE YOUR WORLD WITH YOU',
  },
  {
    id: 'html5',
    year: 2010,
    category: 'internet',
    name: 'The emerging HTML5 web',
    subtitle: 'From pages to experiences.',
    date: 'In development in 2010 · W3C Recommendation in 2014',
    description:
      'Browsers were gaining new tools for video, audio, and interactive graphics. The web was becoming a platform for richer applications, with features arriving gradually across browsers.',
    facts: [
      'Native audio and video elements',
      'Canvas for scripted graphics',
      'The 2010 specification was still a draft',
    ],
    source: {
      label: 'W3C · HTML5 Recommendation (2014)',
      url: 'https://www.w3.org/TR/2014/REC-html5-20141028/',
    },
    tag: 'THE WEB GROWS UP',
  },
  {
    id: 'windows-7',
    year: 2010,
    category: 'software',
    name: 'Windows 7',
    subtitle: 'A familiar desktop, refined.',
    date: 'Released October 22, 2009 · current in 2010',
    description:
      'A redesigned taskbar and window snapping made working across applications easier. Windows 7 shaped the desktop experience of the early 2010s.',
    facts: [
      'Applications could be pinned to the taskbar',
      'Aero Snap arranged windows at screen edges',
      '32-bit and 64-bit editions',
    ],
    source: {
      label: 'Microsoft · Windows 7 lifecycle',
      url: 'https://learn.microsoft.com/en-us/lifecycle/products/windows-7',
    },
    tag: 'THE EVERYDAY DESKTOP',
  },
  {
    id: 'python-27',
    year: 2010,
    category: 'programming',
    name: 'Python 2.7',
    subtitle: 'Readable code. A growing community.',
    date: 'Released July 3, 2010',
    description:
      'Python’s approachable syntax made it a versatile tool for scripts, websites, and scientific work. Version 2.7 became the final major release of the Python 2 series.',
    facts: [
      'General-purpose programming language',
      'Final major Python 2 release',
      'Python 2 support ended in 2020',
    ],
    source: {
      label: 'Python Software Foundation · 2.7 release',
      url: 'https://www.python.org/downloads/release/python-270/',
    },
    tag: 'IDEAS INTO CODE',
  },
  {
    id: 'iphone-4',
    year: 2010,
    category: 'mobile',
    name: 'iPhone 4',
    subtitle: 'Your world, in sharper focus.',
    date: 'First available June 24, 2010',
    description:
      'A high-resolution Retina display, a front-facing camera, and FaceTime made the smartphone feel more personal. Apps were turning a pocket-sized device into many different tools.',
    facts: [
      '3.5-inch Retina display at 326 ppi',
      'Front-facing camera and FaceTime',
      'Apple A4 system on a chip',
    ],
    source: {
      label: 'Apple · iPhone 4 introduction',
      url: 'https://www.apple.com/newsroom/2010/06/07Apple-Presents-iPhone-4/',
    },
    tag: 'THE SMARTPHONE MOMENT',
  },
  {
    id: 'apple-silicon',
    year: 2026,
    category: 'computers',
    name: 'The Apple silicon Mac',
    subtitle: 'More of the computer, on one chip.',
    date: 'Mac transition began in 2020 · 2026 platform snapshot',
    description:
      'Apple silicon combines the CPU, GPU, and other processors in a system on a chip. It represents a move toward tightly integrated computers designed around both performance and power efficiency.',
    facts: [
      'M1 introduced for Macs in November 2020',
      'CPU and GPU share a unified memory architecture',
      'Custom silicon integrates specialized processing',
    ],
    source: {
      label: 'Apple · the M1 announcement',
      url: 'https://www.apple.com/newsroom/2020/11/apple-unleashes-m1/',
    },
    tag: 'SMALLER CHIP. BIGGER IDEAS.',
  },
  {
    id: 'modern-web',
    year: 2026,
    category: 'internet',
    name: 'The modern web',
    subtitle: 'A shared platform, always evolving.',
    date: '2026 platform snapshot · continuously developed standards',
    description:
      'The browser now hosts everything from collaborative documents to video calls. Living standards and shared browser APIs let people build experiences that work across many devices.',
    facts: [
      'HTML is maintained as a Living Standard',
      'Web applications run across device types',
      'Features evolve through standards and browser implementations',
    ],
    source: {
      label: 'WHATWG · HTML Living Standard',
      url: 'https://html.spec.whatwg.org/',
    },
    tag: 'A WINDOW TO EVERYTHING',
  },
  {
    id: 'linux-open-source',
    year: 2026,
    category: 'software',
    name: 'Linux & open source',
    subtitle: 'Built together. Used everywhere.',
    date: 'Linux began in 1991 · 2026 platform snapshot',
    description:
      'The Linux kernel is a foundation for operating systems on servers, personal computers, and other devices. Its public development shows how people and organizations can build shared software together.',
    facts: [
      'Kernel development began in 1991',
      'Source code is publicly available',
      'Distributed under the GNU GPL version 2',
    ],
    source: {
      label: 'The Linux Kernel Archives',
      url: 'https://www.kernel.org/',
    },
    tag: 'THE POWER OF SHARED CODE',
  },
  {
    id: 'ai-assistants',
    year: 2026,
    category: 'software',
    name: 'AI assistants',
    subtitle: 'A new way to work with ideas.',
    date: '2026 platform snapshot · established generative AI technology',
    description:
      'Generative AI can produce text, images, and code from prompts. Conversational assistants bring these capabilities into everyday work, helping people draft, explore ideas, and develop software.',
    facts: [
      'Generate content using patterns learned during training',
      'Can produce plausible but inaccurate information',
      'Important claims and generated code need verification',
    ],
    source: {
      label: 'NIST · Generative AI Profile (2024)',
      url: 'https://doi.org/10.6028/NIST.AI.600-1',
    },
    tag: 'A NEW KIND OF ASSISTANT',
  },
  {
    id: 'typescript',
    year: 2026,
    category: 'programming',
    name: 'TypeScript',
    subtitle: 'JavaScript, with a little more certainty.',
    date: 'First announced October 2012 · in use in 2026',
    description:
      'TypeScript adds a type system to JavaScript, helping developers catch mistakes while they write. It compiles to JavaScript for the browsers and runtimes people already use.',
    facts: [
      'Developed as an open-source project',
      'Type checking happens during development',
      'Types are removed from the generated JavaScript',
    ],
    source: {
      label: 'Microsoft · introducing TypeScript',
      url: 'https://devblogs.microsoft.com/typescript/announcing-typescript/',
    },
    tag: 'BUILDING WHAT COMES NEXT',
  },
  {
    id: 'modern-smartphone',
    year: 2026,
    category: 'mobile',
    name: 'The modern smartphone',
    subtitle: 'A pocket-sized digital world.',
    date: '2026 platform snapshot · established smartphone capabilities',
    description:
      'Cameras, maps, communication, and millions of possible tasks now share one touchscreen. Mobile operating systems and their app ecosystems make the phone a platform people carry through the day.',
    facts: [
      'Touchscreen interface and downloadable apps',
      'Cameras, location sensors, and wireless connectivity',
      'Android is built on the Linux kernel',
    ],
    source: {
      label: 'Android Open Source Project · architecture',
      url: 'https://source.android.com/docs/core/architecture',
    },
    tag: 'THE WORLD IN YOUR POCKET',
  },
]

export interface Comparison {
  id: 'computers' | 'internet' | 'mobile'
  label: string
  description: string
  thenLabel: string
  nowLabel: string
  rows: { label: string; then: string; now: string }[]
}

export const comparisons: Comparison[] = [
  {
    id: 'computers',
    label: 'Computers',
    description:
      'From an expandable desktop tower to an integrated silicon platform.',
    thenLabel: '1995 · Power Macintosh 9500',
    nowLabel: '2026 · Apple silicon Mac',
    rows: [
      {
        label: 'Processing',
        then: 'PowerPC 604 processor',
        now: 'CPU, GPU, and more on a system on a chip',
      },
      {
        label: 'Storage',
        then: 'Spinning hard drive',
        now: 'Solid-state storage',
      },
      {
        label: 'Design focus',
        then: 'Tower with internal expansion slots',
        now: 'Integrated hardware and energy efficiency',
      },
    ],
  },
  {
    id: 'internet',
    label: 'Internet',
    description:
      'A collection of linked pages grows into a platform for everyday life.',
    thenLabel: '1995 · Early consumer web',
    nowLabel: '2026 · Modern web',
    rows: [
      {
        label: 'Connection',
        then: 'Dial-up was common at home',
        now: 'Broadband, Wi-Fi, and mobile networks',
      },
      {
        label: 'Experience',
        then: 'Mostly linked pages of text and images',
        now: 'Interactive apps, streaming, and collaboration',
      },
      {
        label: 'Devices',
        then: 'Usually a desktop computer',
        now: 'Computers, phones, tablets, and more',
      },
    ],
  },
  {
    id: 'mobile',
    label: 'Mobile',
    description:
      'A tool for calls and texts becomes a general-purpose pocket computer.',
    thenLabel: '1995 · Nokia 2110',
    nowLabel: '2026 · Modern smartphone',
    rows: [
      {
        label: 'Interface',
        then: 'Monochrome display and numeric keys',
        now: 'Color touchscreen and apps',
      },
      {
        label: 'Everyday tasks',
        then: 'Calls and SMS messages',
        now: 'Communication, navigation, photography, and more',
      },
      {
        label: 'Connectivity',
        then: 'GSM mobile network',
        now: 'Mobile data, Wi-Fi, and Bluetooth',
      },
    ],
  },
]
