export const timelineStops = [
  1950, 1960, 1970, 1980, 1990, 1995, 2000, 2005, 2010, 2015, 2020, 2026,
] as const

export type TimelineYear = (typeof timelineStops)[number]

// A stop is a snapshot of its year. Earlier launch dates remain explicit.
export const milestones: Record<
  TimelineYear,
  {
    year: TimelineYear
    title: string
    subtitle: string
    description: string
    facts: string[]
    source: { label: string; url: string }
    immersive?: 1995 | 2010 | 2026
  }
> = {
  1950: {
    year: 1950,
    title: 'Can machines think?',
    subtitle: 'Early computers meet a lasting question.',
    description:
      'As electronic computers began moving beyond wartime projects, Alan Turing proposed an imitation game in his 1950 paper “Computing Machinery and Intelligence.” It offered a new way to discuss machine intelligence.',
    facts: [
      'Turing’s paper was published in October 1950',
      'The imitation game became known as the Turing test',
      'Computers of this period filled rooms and used vacuum tubes',
    ],
    source: {
      label: 'Computer History Museum · 1950',
      url: 'https://www.computerhistory.org/timeline/1950/',
    },
  },
  1960: {
    year: 1960,
    title: 'The transistor generation',
    subtitle: 'Computing begins to get smaller.',
    description:
      'By 1960, transistors were replacing vacuum tubes in a new generation of computers. Machines such as DEC’s PDP-1 brought more compact hardware and interactive computing to research laboratories.',
    facts: [
      'The transistor was invented at Bell Labs in 1947',
      'DEC introduced the transistor-based PDP-1 in 1960',
      'Transistors used less power than vacuum tubes',
    ],
    source: {
      label: 'Computer History Museum · 1960',
      url: 'https://www.computerhistory.org/timeline/1960/',
    },
  },
  1970: {
    year: 1970,
    title: 'Computers start connecting',
    subtitle: 'ARPANET grows from its first links.',
    description:
      'In 1970, ARPANET was expanding a research network that had connected its first four sites in 1969. Packet switching let distant computers exchange data, laying groundwork for the internet.',
    facts: [
      'The first ARPANET message was sent on October 29, 1969',
      'Four research sites were connected by the end of 1969',
      'Data traveled in packets across the network',
    ],
    source: {
      label: 'Internet Society · A Brief History of the Internet',
      url: 'https://www.internetsociety.org/internet/history-internet/brief-history-internet/',
    },
  },
  1980: {
    year: 1980,
    title: 'A computer of your own',
    subtitle: 'Personal computing reaches homes and offices.',
    description:
      'By 1980, machines such as the Apple II were helping establish a market for personal computers. Introduced in 1977, the Apple II combined a keyboard, color graphics, and expansion slots in a ready-to-use machine.',
    facts: [
      'The Apple II was introduced in 1977',
      'Expansion slots let owners add new capabilities',
      'VisiCalc, released in 1979, brought spreadsheets to the Apple II',
    ],
    source: {
      label: 'Computer History Museum · 1977',
      url: 'https://www.computerhistory.org/timeline/1977/',
    },
  },
  1990: {
    year: 1990,
    title: 'The web takes its first shape',
    subtitle: 'A browser, a server, and linked documents.',
    description:
      'At CERN in 1990, Tim Berners-Lee built the first web browser and web server. The project connected documents through hyperlinks; the web would become publicly available in 1991.',
    facts: [
      'The first browser was called WorldWideWeb',
      'The browser also worked as an editor',
      'The first web server ran on a NeXT computer at CERN',
    ],
    source: {
      label: 'CERN · The birth of the Web',
      url: 'https://home.cern/science/computing/birth-web',
    },
  },
  1995: {
    year: 1995,
    title: 'The desktop becomes familiar',
    subtitle: 'Windows 95 gives everyday computing a new interface.',
    description:
      'Released on August 24, 1995, Windows 95 introduced the Start menu and taskbar. Meanwhile, graphical browsers and dial-up connections were bringing the growing web into more homes.',
    facts: [
      'Windows 95 introduced the Start menu',
      'The taskbar made switching between programs easier',
      'Graphical browsers helped people explore the web',
    ],
    source: {
      label: 'Computer History Museum · 1995',
      url: 'https://www.computerhistory.org/timeline/1995/',
    },
    immersive: 1995,
  },
  2000: {
    year: 2000,
    title: 'The web becomes everyday',
    subtitle: 'Search, shopping, and email reach a wider audience.',
    description:
      'Around 2000, the web was becoming part of daily life for a growing consumer audience. Search engines, online shops, and webmail made the browser a gateway to useful services, even as the dot-com boom began to collapse.',
    facts: [
      'Amazon had opened its online bookstore in 1995',
      'Google was founded in 1998',
      'Home connections included dial-up and emerging broadband',
    ],
    source: {
      label: 'Computer History Museum · The Web',
      url: 'https://www.computerhistory.org/revolution/the-web/20',
    },
  },
  2005: {
    year: 2005,
    title: 'Pages become applications',
    subtitle: 'The participatory web gains momentum.',
    description:
      'In 2005, “Web 2.0” described a growing web of shared content and interactive services. Jesse James Garrett coined “Ajax” for techniques that updated parts of a page without reloading the whole document.',
    facts: [
      'The term Ajax was coined in February 2005',
      'Its underlying browser technologies already existed',
      'Asynchronous requests supported more responsive web interfaces',
    ],
    source: {
      label: 'MDN Web Docs · Ajax',
      url: 'https://developer.mozilla.org/en-US/docs/Glossary/AJAX',
    },
  },
  2010: {
    year: 2010,
    title: 'A sharper mobile world',
    subtitle: 'The smartphone becomes a platform for everyday life.',
    description:
      'The iPhone 4 went on sale on June 24, 2010, bringing a high-resolution Retina display and a front-facing camera. Apps and mobile internet were turning phones into cameras, maps, communication tools, and more.',
    facts: [
      '3.5-inch Retina display at 326 pixels per inch',
      'Apple A4 system on a chip',
      'FaceTime introduced video calling between supported devices',
    ],
    source: {
      label: 'Apple · iPhone 4 introduction',
      url: 'https://www.apple.com/newsroom/2010/06/07Apple-Presents-iPhone-4/',
    },
    immersive: 2010,
  },
  2015: {
    year: 2015,
    title: 'Machine learning opens up',
    subtitle: 'TensorFlow gives developers a shared toolkit.',
    description:
      'Google released TensorFlow as open-source software in November 2015. The machine learning library gave researchers and developers tools to build and train models for tasks such as image recognition and language processing.',
    facts: [
      'TensorFlow was open-sourced on November 9, 2015',
      'It originated with the Google Brain team',
      'Its tools support numerical computation and machine learning',
    ],
    source: {
      label: 'Google · TensorFlow open-source announcement',
      url: 'https://blog.google/technology/ai/tensorflow-smarter-machine-learning-for/',
    },
  },
  2020: {
    year: 2020,
    title: 'The Mac moves to Apple silicon',
    subtitle: 'M1 brings more of the computer onto one chip.',
    description:
      'Apple introduced M1 in November 2020, beginning the Mac’s transition from Intel processors to Apple-designed silicon. Its integrated design combined processing, graphics, and specialized engines with a unified memory architecture.',
    facts: [
      'M1 was announced on November 10, 2020',
      'The first M1 Macs included MacBook Air, MacBook Pro, and Mac mini',
      'CPU, GPU, and other components share unified memory',
    ],
    source: {
      label: 'Apple · M1 announcement',
      url: 'https://www.apple.com/newsroom/2020/11/apple-unleashes-m1/',
    },
  },
  2026: {
    year: 2026,
    title: 'A connected platform',
    subtitle: 'A present-day snapshot of established technologies.',
    description:
      'The 2026 gallery looks at established platforms: integrated computers, modern browsers, open-source software, smartphones, and generative AI. Their foundations were built across earlier decades and continue to evolve.',
    facts: [
      'HTML is maintained as a Living Standard',
      'Browsers support interactive applications across many devices',
      'This stop describes platforms in use, rather than a single 2026 launch',
    ],
    source: {
      label: 'WHATWG · HTML Living Standard',
      url: 'https://html.spec.whatwg.org/',
    },
    immersive: 2026,
  },
}
