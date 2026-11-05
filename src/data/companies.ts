export interface CompanyMilestone {
  year: number
  title: string
  description: string
  product: string
  evolution: string
}

export interface CompanyHistory {
  id: string
  name: string
  founded: string
  founders: string
  originalBusiness: string
  earlyChallenge: string
  innovation: string
  source: { label: string; url: string }
  milestones: CompanyMilestone[]
}

export const companies: CompanyHistory[] = [
  {
    id: 'apple',
    name: 'Apple',
    founded: '1976',
    founders: 'Steve Jobs, Steve Wozniak, and Ronald Wayne',
    originalBusiness:
      'Selling the Apple I, a single-board personal computer designed by Wozniak.',
    earlyChallenge:
      'The Apple I required buyers to supply a case, keyboard, and display. Reaching a wider audience meant offering a more complete computer.',
    innovation:
      'Integrated personal computers, graphical desktop interfaces, and later a tightly connected hardware and software ecosystem.',
    source: {
      label: 'Computer History Museum · Apple history',
      url: 'https://www.computerhistory.org/revolution/personal-computers/17/300',
    },
    milestones: [
      {
        year: 1976,
        title: 'A board becomes a business',
        description:
          'Apple began with the Apple I. It was sold as an assembled circuit board, rather than the complete desktop system familiar today.',
        product: 'Apple I',
        evolution:
          'A hobbyist board that still needed a keyboard, display, and enclosure.',
      },
      {
        year: 1977,
        title: 'A more complete personal computer',
        description:
          'The Apple II combined a case, keyboard, color graphics, and expansion slots. It became an important platform for homes, schools, and business software.',
        product: 'Apple II',
        evolution: 'From a bare board to an expandable personal computer.',
      },
      {
        year: 1984,
        title: 'Point, click, and explore',
        description:
          'The Macintosh brought a graphical interface and mouse to Apple’s new all-in-one computer. Earlier research and products had already pioneered these ideas.',
        product: 'Macintosh',
        evolution:
          'A graphical desktop made applications accessible through windows, icons, and menus.',
      },
      {
        year: 2007,
        title: 'A computer in your pocket',
        description:
          'Apple introduced the iPhone with a touchscreen interface combining a phone, music player, and internet communicator. The App Store followed in 2008.',
        product: 'iPhone',
        evolution:
          'Personal computing expanded from the desktop to a mobile platform.',
      },
    ],
  },
  {
    id: 'microsoft',
    name: 'Microsoft',
    founded: '1975',
    founders: 'Bill Gates and Paul Allen',
    originalBusiness:
      'Developing a BASIC interpreter for the MITS Altair 8800.',
    earlyChallenge:
      'Early personal computers had limited memory and no common software platform. Microsoft’s first product adapted BASIC to the Altair’s constraints.',
    innovation:
      'Licensing software across PC manufacturers, developing Windows, and building developer and productivity platforms.',
    source: {
      label: 'Microsoft · Company history',
      url: 'https://news.microsoft.com/facts-about-microsoft/',
    },
    milestones: [
      {
        year: 1975,
        title: 'BASIC for the Altair',
        description:
          'Gates and Allen developed Altair BASIC, giving owners of the early microcomputer a programming language.',
        product: 'Altair BASIC',
        evolution:
          'A language interpreter was the company’s first commercial software.',
      },
      {
        year: 1981,
        title: 'Software for the IBM PC',
        description:
          'Microsoft supplied PC DOS for IBM’s new personal computer and licensed MS-DOS to other computer makers.',
        product: 'PC DOS / MS-DOS',
        evolution:
          'Operating-system licensing connected software to a growing market of compatible PCs.',
      },
      {
        year: 1985,
        title: 'Windows begins',
        description:
          'Windows 1.0 provided a graphical environment running on MS-DOS. It was the start of a product family, rather than the mature desktop that followed.',
        product: 'Windows 1.0',
        evolution:
          'A graphical environment added windows and mouse interaction to DOS-based PCs.',
      },
      {
        year: 1995,
        title: 'A new desktop routine',
        description:
          'Windows 95 introduced the Start menu and taskbar, giving PC users a familiar way to launch applications and switch between them.',
        product: 'Windows 95',
        evolution:
          'The interface evolved into a desktop organized around the Start menu and taskbar.',
      },
    ],
  },
  {
    id: 'google',
    name: 'Google',
    founded: '1998',
    founders: 'Larry Page and Sergey Brin',
    originalBusiness:
      'A web search engine developed from a Stanford research project.',
    earlyChallenge:
      'A rapidly growing web made finding useful pages difficult. Page and Brin researched using links between pages as a signal for ranking search results.',
    innovation:
      'Link-based search ranking, large-scale web services, browser software, and machine learning tools.',
    source: {
      label: 'Google · Our story',
      url: 'https://about.google/our-story/',
    },
    milestones: [
      {
        year: 1998,
        title: 'Research becomes a company',
        description:
          'Page and Brin incorporated Google in 1998. Its search engine grew out of their work at Stanford, where the project was initially called BackRub.',
        product: 'Google Search',
        evolution:
          'A university research project became a public web search service.',
      },
      {
        year: 2004,
        title: 'Email on the web',
        description:
          'Gmail launched as an invitation-only beta with 1 GB of storage, bringing search and conversation grouping to webmail.',
        product: 'Gmail',
        evolution:
          'The search company expanded into a browser-based communication service.',
      },
      {
        year: 2008,
        title: 'A browser for web applications',
        description:
          'Google released the first Chrome beta for Windows. Its tabs and combined address and search field supported an increasingly interactive web.',
        product: 'Chrome',
        evolution:
          'Google moved from services inside the browser to developing the browser itself.',
      },
      {
        year: 2015,
        title: 'A shared machine learning toolkit',
        description:
          'Google open-sourced TensorFlow, a library originating with the Google Brain team for numerical computation and machine learning.',
        product: 'TensorFlow',
        evolution:
          'Internal research tools became a software platform available to other developers.',
      },
    ],
  },
  {
    id: 'amazon',
    name: 'Amazon',
    founded: '1994',
    founders: 'Jeff Bezos',
    originalBusiness:
      'An online bookstore; the website opened to customers in July 1995.',
    earlyChallenge:
      'Selling books online required both a searchable catalog and physical order fulfillment. Amazon built its retail business around those linked tasks.',
    innovation:
      'Large-scale online retail, digital reading devices, and on-demand cloud infrastructure.',
    source: {
      label: 'Amazon · Who we are',
      url: 'https://www.aboutamazon.com/about-us',
    },
    milestones: [
      {
        year: 1994,
        title: 'A company before the storefront',
        description:
          'Bezos founded the business in 1994. Its online bookstore began serving customers in July 1995; the founding and website opening are different dates.',
        product: 'Online bookstore',
        evolution:
          'A company formed in 1994 became a working retail website in 1995.',
      },
      {
        year: 1998,
        title: 'Beyond books',
        description:
          'Amazon expanded into music and video, broadening its catalog beyond the category that had started the company.',
        product: 'A wider online store',
        evolution:
          'A specialist bookstore grew toward a general online retailer.',
      },
      {
        year: 2006,
        title: 'Computing as a service',
        description:
          'AWS launched Amazon S3 and Amazon EC2 in 2006, offering storage and computing resources as services.',
        product: 'Amazon Web Services',
        evolution:
          'The company added infrastructure services alongside its retail business.',
      },
      {
        year: 2007,
        title: 'A dedicated reading device',
        description:
          'The first Kindle combined an electronic-paper display with wireless access to a digital bookstore.',
        product: 'Kindle',
        evolution:
          'Books became a digital service connected to a dedicated reading device.',
      },
    ],
  },
  {
    id: 'ibm',
    name: 'IBM',
    founded: '1911 · founded as CTR',
    founders: 'Charles Ranlett Flint organized the merger that created CTR',
    originalBusiness:
      'Punched-card tabulating machines, employee time recorders, and commercial scales.',
    earlyChallenge:
      'CTR brought together businesses with different industrial products. Its subsequent development increasingly focused on machines for business information processing.',
    innovation:
      'Business-data processing, compatible mainframe families, and the influential IBM PC architecture.',
    source: { label: 'IBM · History', url: 'https://www.ibm.com/history' },
    milestones: [
      {
        year: 1911,
        title: 'Three businesses combine',
        description:
          'Flint organized the merger of the Tabulating Machine Company, International Time Recording Company, and Computing Scale Company of America into Computing-Tabulating-Recording Company. Thomas J. Watson Sr. joined in 1914, rather than founding it.',
        product: 'Computing-Tabulating-Recording Company',
        evolution:
          'Tabulators, time recorders, and scales formed the original industrial business.',
      },
      {
        year: 1924,
        title: 'A new name',
        description:
          'CTR adopted the name International Business Machines, or IBM, in 1924.',
        product: 'International Business Machines',
        evolution:
          'The company’s identity increasingly centered on business machines and information processing.',
      },
      {
        year: 1964,
        title: 'A compatible family',
        description:
          'System/360 introduced a compatible family of mainframe computers, allowing customers to move between models while preserving software investments.',
        product: 'System/360',
        evolution:
          'Compatibility across a product family changed how organizations planned computing systems.',
      },
      {
        year: 1981,
        title: 'The IBM personal computer',
        description:
          'The IBM PC 5150 used an Intel 8088 processor and commercially available components. Its architecture became a reference point for the expanding PC-compatible market.',
        product: 'IBM PC 5150',
        evolution:
          'IBM’s computing range extended from large business systems to desktop personal computers.',
      },
    ],
  },
]
