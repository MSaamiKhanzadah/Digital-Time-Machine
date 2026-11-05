/** Original museum writing. Dates select the information shown in each scene. */
export interface CommunitySource {
  id: string
  title: string
  url: string
}
export interface WikiFact {
  year: number
  text: string
  source: string
}
export interface WikiSection {
  id: string
  title: string
  facts: WikiFact[]
}
export interface WikiArticle {
  id: string
  title: string
  subtitle: string
  keywords: string[]
  introduction: string
  sections: WikiSection[]
  related: string[]
}

export const communitySources: CommunitySource[] = [
  {
    id: 'cern',
    title: 'CERN — The birth of the Web',
    url: 'https://home.cern/science/computing/birth-web',
  },
  {
    id: 'w3c',
    title: 'W3C — A little history of the World Wide Web',
    url: 'https://www.w3.org/History.html',
  },
  {
    id: 'wikimedia',
    title: 'Wikimedia Foundation — Wikipedia',
    url: 'https://wikimediafoundation.org/our-work/wikipedia/',
  },
  {
    id: 'wiki20',
    title: 'Wikimedia Foundation — 20 years of Wikipedia',
    url: 'https://wikimediafoundation.org/wikipedia20/',
  },
  {
    id: 'internet',
    title: 'Internet Society — A brief history of the Internet',
    url: 'https://www.internetsociety.org/internet/history-internet/brief-history-internet/',
  },
  {
    id: 'computer',
    title: 'Computer History Museum — Timeline of computer history',
    url: 'https://www.computerhistory.org/timeline/',
  },
  {
    id: 'google',
    title: 'Google — Our story',
    url: 'https://about.google/our-story/',
  },
  {
    id: 'dartmouth',
    title: 'Dartmouth — Artificial intelligence',
    url: 'https://home.dartmouth.edu/about/artificial-intelligence-ai-coined-dartmouth',
  },
  {
    id: 'ibm',
    title: 'IBM — Deep Blue',
    url: 'https://www.ibm.com/history/deep-blue',
  },
  {
    id: 'transformer',
    title: 'Vaswani et al. — Attention Is All You Need (2017)',
    url: 'https://arxiv.org/abs/1706.03762',
  },
  {
    id: 'chatgpt',
    title: 'OpenAI — Introducing ChatGPT (2022)',
    url: 'https://openai.com/index/chatgpt/',
  },
]

export const wikiArticles: WikiArticle[] = [
  {
    id: 'web',
    title: 'World Wide Web',
    subtitle: 'Linked documents, a shared language, and an open idea',
    keywords: [
      'www',
      'html',
      'hypertext',
      'tim berners lee',
      'web history',
      'browser',
    ],
    introduction:
      'The World Wide Web is a system of linked information reached through the Internet. A web address identifies a resource; a browser requests it and displays its contents. Following a hyperlink turns one document into a starting point for another.',
    sections: [
      {
        id: 'origins',
        title: 'Origins',
        facts: [
          {
            year: 1989,
            text: 'At CERN, Tim Berners-Lee proposed an information system to help researchers share documents across different computers. Hypertext supplied the connecting idea: a document could point directly to another document.',
            source: 'cern',
          },
          {
            year: 1990,
            text: 'By the end of 1990, the first web server and browser were running at CERN. HTML described documents, HTTP carried requests, and addresses identified the resources being requested.',
            source: 'cern',
          },
        ],
      },
      {
        id: 'opening',
        title: 'An open network of pages',
        facts: [
          {
            year: 1993,
            text: 'CERN made the Web software available in the public domain on 30 April 1993. Developers could build compatible tools without paying CERN a royalty, helping the idea spread.',
            source: 'cern',
          },
          {
            year: 1994,
            text: 'The World Wide Web Consortium was established in 1994 to develop shared web standards. Common rules helped pages work across browsers and computer systems.',
            source: 'w3c',
          },
        ],
      },
      {
        id: 'reading',
        title: 'Reading and finding information',
        facts: [
          {
            year: 1998,
            text: 'Directories and search engines offered ways to find pages beyond links already known to a reader. A browser, a search engine, and the Web itself were different parts of this experience.',
            source: 'computer',
          },
          {
            year: 2004,
            text: 'Blogs, collaborative wikis, and social services made publishing on the Web accessible to more people. Readers increasingly contributed the material they came to read.',
            source: 'computer',
          },
          {
            year: 2007,
            text: 'The arrival of the iPhone in 2007 helped make a full web browser part of everyday mobile computing. Designers increasingly had to consider small touch screens alongside desktop monitors.',
            source: 'computer',
          },
        ],
      },
    ],
    related: ['internet', 'search', 'wikipedia', 'computer'],
  },
  {
    id: 'wikipedia',
    title: 'Wikipedia',
    subtitle: 'An encyclopedia written through collaboration',
    keywords: [
      'encyclopedia',
      'wiki',
      'knowledge',
      'jimmy wales',
      'larry sanger',
    ],
    introduction:
      'Wikipedia is a free online encyclopedia built through contributions from volunteers. Its wiki model lets people improve a shared article, while a page history makes earlier versions part of the record. This exhibit uses original summaries rather than Wikipedia article text.',
    sections: [
      {
        id: 'beginnings',
        title: 'Beginnings',
        facts: [
          {
            year: 2001,
            text: 'Jimmy Wales and Larry Sanger launched Wikipedia on 15 January 2001. The project used wiki software to make creating and revising encyclopedia articles faster and more open.',
            source: 'wikimedia',
          },
          {
            year: 2001,
            text: 'Wikipedia began in English and added other language editions during its first year. Each edition could develop its own community of contributors.',
            source: 'wiki20',
          },
        ],
      },
      {
        id: 'collaboration',
        title: 'Building shared knowledge',
        facts: [
          {
            year: 2001,
            text: 'A wiki page can be revised repeatedly rather than treated as a finished publication. This makes checking claims, comparing versions, and discussing wording important parts of collaborative reference work.',
            source: 'wikimedia',
          },
          {
            year: 2003,
            text: 'The nonprofit Wikimedia Foundation was established in 2003 to support Wikipedia and related free knowledge projects. Volunteers continued to write and maintain the encyclopedia.',
            source: 'wikimedia',
          },
          {
            year: 2021,
            text: 'Wikipedia marked its twentieth anniversary in 2021. Its growth illustrates how a modest web publishing idea could become a reference work used across many languages.',
            source: 'wiki20',
          },
        ],
      },
      {
        id: 'reading',
        title: 'Reading critically',
        facts: [
          {
            year: 2001,
            text: 'An encyclopedia entry is a starting point for investigation. A reader can follow related subjects, examine references, and distinguish a statement from the evidence offered for it. The same habits are useful throughout the Web.',
            source: 'wikimedia',
          },
        ],
      },
    ],
    related: ['web', 'internet', 'search', 'computer'],
  },
  {
    id: 'internet',
    title: 'Internet',
    subtitle: 'Networks that agree on how to exchange data',
    keywords: ['network', 'networks', 'arpanet', 'tcp', 'ip', 'packet'],
    introduction:
      'The Internet is a network of interconnected computer networks. Shared protocols let different machines exchange data. The World Wide Web is one service that uses this infrastructure; email and other network applications use it too.',
    sections: [
      {
        id: 'packets',
        title: 'Packets and early networks',
        facts: [
          {
            year: 1969,
            text: 'ARPANET connected its first sites in 1969. Research in packet switching explored how messages could be split into smaller units and carried across a shared network.',
            source: 'internet',
          },
          {
            year: 1974,
            text: 'Vint Cerf and Bob Kahn described a method for communication across different packet networks. Their work helped establish the internetworking approach behind the Internet.',
            source: 'internet',
          },
        ],
      },
      {
        id: 'protocols',
        title: 'Common protocols',
        facts: [
          {
            year: 1983,
            text: 'ARPANET switched to TCP/IP on 1 January 1983. An agreed protocol suite let unlike networks work together without requiring every network to have the same internal design.',
            source: 'internet',
          },
          {
            year: 1984,
            text: 'The Domain Name System introduced a distributed way to connect readable domain names with network addresses. Users could remember a name while computers handled the addressing underneath.',
            source: 'internet',
          },
        ],
      },
      {
        id: 'applications',
        title: 'The network and its applications',
        facts: [
          {
            year: 1991,
            text: 'The Web added linked documents to the Internet’s existing uses. Keeping the distinction clear explains why the Internet can carry both web pages and applications that do not use a browser.',
            source: 'cern',
          },
          {
            year: 2000,
            text: 'By the turn of the millennium, the Internet connected research, commercial, and personal uses. Its history reflects contributions from many organizations rather than a single invention in one moment.',
            source: 'internet',
          },
        ],
      },
    ],
    related: ['web', 'computer', 'search', 'wikipedia'],
  },
  {
    id: 'computer',
    title: 'Personal computer',
    subtitle: 'Computing moves onto the desk',
    keywords: [
      'pc',
      'computers',
      'apple',
      'ibm',
      'desktop',
      'hardware',
      'microcomputer',
    ],
    introduction:
      'A personal computer is designed for direct use by an individual. A keyboard, display, processor, memory, and storage make up a familiar arrangement, but the cost, size, software, and ways of interacting have changed considerably.',
    sections: [
      {
        id: 'microcomputers',
        title: 'Microcomputers',
        facts: [
          {
            year: 1975,
            text: 'The Altair 8800 attracted hobbyists in 1975. Early microcomputers often asked their owners to assemble hardware or learn technical commands before they could do useful work.',
            source: 'computer',
          },
          {
            year: 1977,
            text: 'The Apple II, Commodore PET, and TRS-80 helped bring ready-made personal computing systems to a wider audience in 1977.',
            source: 'computer',
          },
        ],
      },
      {
        id: 'interfaces',
        title: 'Platforms and interfaces',
        facts: [
          {
            year: 1981,
            text: 'IBM introduced its Personal Computer in 1981. Compatible hardware and a growing software market helped establish the PC as a widely used platform.',
            source: 'computer',
          },
          {
            year: 1984,
            text: 'Apple introduced the Macintosh in 1984, bringing a graphical interface and mouse to a prominent consumer product. Windows, icons, and menus offered an alternative to typing every command.',
            source: 'computer',
          },
        ],
      },
      {
        id: 'connected',
        title: 'Connected computers',
        facts: [
          {
            year: 1993,
            text: 'Graphical web browsers helped turn networked personal computers into tools for exploring linked information. The computer became both a place to create documents and a window onto documents elsewhere.',
            source: 'computer',
          },
          {
            year: 2007,
            text: 'Smartphones brought increasingly capable computing into pockets. The boundary between a personal computer and a mobile device became a useful question for designers and users.',
            source: 'computer',
          },
        ],
      },
    ],
    related: ['internet', 'web', 'ai', 'search'],
  },
  {
    id: 'search',
    title: 'Web search engine',
    subtitle: 'Finding a page in a growing web',
    keywords: [
      'google',
      'searching',
      'index',
      'ranking',
      'crawler',
      'search engines',
    ],
    introduction:
      'A web search engine helps people find online documents by entering words or questions. Crawling discovers pages, indexing organizes information about them, and ranking selects an order for the results. A search result is a route to a source, not proof that its claims are true.',
    sections: [
      {
        id: 'finding',
        title: 'From links to indexes',
        facts: [
          {
            year: 1994,
            text: 'As the Web expanded in the 1990s, directories and automated search tools offered different ways to find information. A directory organized chosen links; an automated index could cover pages discovered by software.',
            source: 'computer',
          },
          {
            year: 1998,
            text: 'Larry Page and Sergey Brin founded Google in 1998 after working on search at Stanford. Their early work considered links between pages as a signal for organizing results.',
            source: 'google',
          },
        ],
      },
      {
        id: 'process',
        title: 'How a query becomes a result',
        facts: [
          {
            year: 1998,
            text: 'A search service usually answers from its prepared index rather than visiting the entire Web after each query. This distinction helps explain why a changed page may not appear immediately in results.',
            source: 'computer',
          },
          {
            year: 2000,
            text: 'The wording of a query shapes the pages retrieved. Specific terms, names, and dates can help a reader narrow a broad subject and compare sources.',
            source: 'computer',
          },
        ],
      },
      {
        id: 'judgment',
        title: 'A reader still makes judgments',
        facts: [
          {
            year: 2000,
            text: 'Rankings reflect a system’s selection and ordering rules. Readers still need to ask who wrote a page, what evidence it provides, and whether another source supports it. This exhibit’s search looks only through six local museum articles.',
            source: 'computer',
          },
        ],
      },
    ],
    related: ['web', 'wikipedia', 'internet', 'ai'],
  },
  {
    id: 'ai',
    title: 'Artificial intelligence',
    subtitle: 'Machines, reasoning, and learning from examples',
    keywords: [
      'ai',
      'machine learning',
      'intelligence',
      'turing',
      'deep blue',
      'neural',
      'chatbot',
      'transformer',
    ],
    introduction:
      'Artificial intelligence is a field of computing concerned with tasks associated with intelligence, such as reasoning, recognizing patterns, and using language. Systems can follow explicit rules or learn patterns from examples. Their abilities depend on the task, the design, and the evidence used to assess them.',
    sections: [
      {
        id: 'origins',
        title: 'A research field takes shape',
        facts: [
          {
            year: 1956,
            text: 'A summer research project at Dartmouth in 1956 helped establish artificial intelligence as a named field. Its ambitious questions connected computing with ideas about language, learning, and reasoning.',
            source: 'dartmouth',
          },
        ],
      },
      {
        id: 'milestones',
        title: 'Tasks and milestones',
        facts: [
          {
            year: 1997,
            text: 'IBM’s Deep Blue defeated world chess champion Garry Kasparov in a six-game match in 1997. Its success was a milestone in a well-defined game; it did not make the machine a general human thinker.',
            source: 'ibm',
          },
          {
            year: 2017,
            text: 'The 2017 paper “Attention Is All You Need” introduced the Transformer architecture. Attention mechanisms offered a way to model relationships within sequences, influencing later language models.',
            source: 'transformer',
          },
          {
            year: 2022,
            text: 'OpenAI released ChatGPT as a research preview in November 2022. The conversational interface brought large language models to a broad public audience.',
            source: 'chatgpt',
          },
        ],
      },
      {
        id: 'evaluation',
        title: 'Evaluating an intelligent system',
        facts: [
          {
            year: 1997,
            text: 'A useful evaluation begins with a defined task. Winning at chess measures something different from understanding a document or acting safely in an unfamiliar setting. Performance in one setting does not settle every question about intelligence.',
            source: 'ibm',
          },
          {
            year: 2022,
            text: 'A fluent answer can still contain an error. The ChatGPT research preview described limitations including plausible-sounding but incorrect answers, making independent checking essential.',
            source: 'chatgpt',
          },
        ],
      },
    ],
    related: ['computer', 'search', 'web', 'wikipedia'],
  },
]

export function searchWikiArticles(query: string, year: number) {
  const words = query.toLowerCase().trim().split(/\s+/).filter(Boolean)
  if (!words.length) return wikiArticles
  return wikiArticles
    .map((article) => {
      const visibleText = [
        article.title,
        article.introduction,
        ...article.sections.flatMap((section) =>
          section.facts
            .filter((fact) => fact.year <= year)
            .map((fact) => fact.text),
        ),
      ]
        .join(' ')
        .toLowerCase()
      // Search terms for future milestones are only indexed when their facts exist.
      const keywords = article.keywords
        .filter(
          (keyword) =>
            !['chatbot', 'transformer'].includes(keyword) ||
            year >= (keyword === 'transformer' ? 2017 : 2022),
        )
        .join(' ')
      const haystack = `${visibleText} ${keywords}`
      const score = words.reduce(
        (sum, word) =>
          sum +
          (article.title.toLowerCase().includes(word)
            ? 4
            : haystack.includes(word)
              ? 1
              : 0),
        0,
      )
      return { article, score }
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .map(({ article }) => article)
}
