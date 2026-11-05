export interface EvolutionNode {
  id: string
  name: string
  year: string
  summary: string
  origin: string
  creator: string
  purpose: string
  milestones: string[]
  relatedTech: string[]
  historicalInfluence: string
  source: { label: string; url: string }
}

export interface EvolutionBranch {
  nodeId: string
  relationship?: string
  children?: EvolutionBranch[]
}

export interface EvolutionTree {
  id: string
  title: string
  subtitle: string
  root: EvolutionBranch
}

export const evolutionNodes: Record<string, EvolutionNode> = {
  bcpl: {
    id: 'bcpl',
    name: 'BCPL',
    year: '1967',
    summary: 'A compact language for writing compilers and systems software.',
    origin:
      'Designed by Martin Richards in the mid-1960s and first implemented during his visit to MIT.',
    creator: 'Martin Richards',
    purpose:
      'Make compiler construction and systems programming portable and practical.',
    milestones: [
      'First implemented in 1967.',
      'Its compact design helped inspire B.',
    ],
    relatedTech: ['CPL', 'B', 'C'],
    historicalInfluence:
      'BCPL supplied important ideas to B, an ancestor of C. This family helped establish the style of many later systems languages.',
    source: {
      label: 'Dennis Ritchie · The Development of the C Language',
      url: 'https://www.bell-labs.com/usr/dmr/www/chist.html',
    },
  },
  b: {
    id: 'b',
    name: 'B',
    year: 'c. 1969',
    summary: 'A smaller descendant of BCPL, built for early Unix work.',
    origin:
      'Developed at Bell Labs while the first Unix system was taking shape.',
    creator: 'Ken Thompson, with contributions from Dennis Ritchie',
    purpose:
      'Provide a compact higher-level language on the limited hardware available to early Unix developers.',
    milestones: [
      'Adapted ideas from BCPL to the PDP-7 environment.',
      'Its successor added types and became C in the early 1970s.',
    ],
    relatedTech: ['BCPL', 'Unix', 'C'],
    historicalInfluence:
      'B carried BCPL’s expression syntax into the direct ancestry of C, including familiar operators and control structures.',
    source: {
      label: 'Dennis Ritchie · The Development of the C Language',
      url: 'https://www.bell-labs.com/usr/dmr/www/chist.html',
    },
  },
  c: {
    id: 'c',
    name: 'C',
    year: '1972',
    summary: 'A typed systems language closely linked with Unix.',
    origin: 'Evolved from B at Bell Labs in the early 1970s.',
    creator: 'Dennis Ritchie',
    purpose:
      'Combine efficient access to a machine with enough abstraction to write a portable operating system.',
    milestones: [
      'Unix was substantially rewritten in C in 1973.',
      'The first ANSI C standard appeared in 1989.',
    ],
    relatedTech: ['B', 'Unix', 'C++', 'Objective-C'],
    historicalInfluence:
      'C became a foundation of operating systems and embedded software. Many later languages borrowed its syntax without being direct descendants.',
    source: {
      label: 'Dennis Ritchie · The Development of the C Language',
      url: 'https://www.bell-labs.com/usr/dmr/www/chist.html',
    },
  },
  cpp: {
    id: 'cpp',
    name: 'C++',
    year: '1985',
    summary: 'C extended with classes and a growing set of abstraction tools.',
    origin:
      'Began as “C with Classes” at Bell Labs in 1979; the name C++ followed in 1983.',
    creator: 'Bjarne Stroustrup',
    purpose:
      'Support efficient systems programming alongside stronger facilities for organizing large programs.',
    milestones: [
      'First commercial release in 1985.',
      'The first ISO C++ standard was published in 1998.',
    ],
    relatedTech: ['C', 'Simula', 'Templates', 'Generic programming'],
    historicalInfluence:
      'C++ combined C compatibility with ideas including Simula-style classes, influencing large-scale software, games, and systems development.',
    source: {
      label: 'Bjarne Stroustrup · C++ FAQ',
      url: 'https://www.stroustrup.com/bs_faq.html',
    },
  },
  unix: {
    id: 'unix',
    name: 'Unix',
    year: '1969',
    summary:
      'A portable, multi-user operating system with small composable tools.',
    origin: 'Started as an experimental operating system at Bell Labs.',
    creator: 'Ken Thompson, Dennis Ritchie, and Bell Labs colleagues',
    purpose:
      'Provide an interactive computing environment that could support programming, files, and multiple users.',
    milestones: [
      'First implementation on a PDP-7 in 1969.',
      'Rewritten substantially in C in 1973.',
    ],
    relatedTech: ['C', 'BSD', 'POSIX', 'Linux'],
    historicalInfluence:
      'Unix shaped operating-system interfaces, command-line tools, and software design. Linux follows many Unix ideas but is an independent implementation.',
    source: {
      label: 'Dennis Ritchie · The Evolution of the Unix Time-sharing System',
      url: 'https://www.bell-labs.com/usr/dmr/www/hist.html',
    },
  },
  bsd: {
    id: 'bsd',
    name: 'BSD',
    year: '1977',
    summary:
      'Berkeley’s distribution of Unix software grew into a major Unix lineage.',
    origin:
      'Developed at the University of California, Berkeley, initially as additions to licensed Unix.',
    creator: 'UC Berkeley’s Computer Systems Research Group and contributors',
    purpose:
      'Extend Unix with research software, tools, networking, and operating-system improvements.',
    milestones: [
      'The first Berkeley Software Distribution appeared in 1977.',
      '4.2BSD, released in 1983, helped spread TCP/IP networking.',
    ],
    relatedTech: ['Unix', 'TCP/IP', 'FreeBSD', 'macOS'],
    historicalInfluence:
      'BSD contributed networking and operating-system ideas that persist across modern Unix systems and independently maintained BSD descendants.',
    source: {
      label: 'FreeBSD Handbook · A Brief History of FreeBSD',
      url: 'https://docs.freebsd.org/en/books/handbook/introduction/',
    },
  },
  freebsd: {
    id: 'freebsd',
    name: 'FreeBSD',
    year: '1993',
    summary: 'A complete open-source operating system in the BSD family.',
    origin:
      'The project emerged from the 386BSD community and BSD source tradition.',
    creator: 'The FreeBSD Project and its contributors',
    purpose:
      'Maintain a freely available, integrated Unix-like operating system for general-purpose computing.',
    milestones: [
      'The project began in 1993.',
      'The system continues to develop its kernel, userland, and documentation together.',
    ],
    relatedTech: ['BSD', 'Unix', 'ZFS', 'Jails'],
    historicalInfluence:
      'FreeBSD carries the BSD lineage into servers, networking appliances, storage systems, and other products.',
    source: {
      label: 'FreeBSD Handbook · Introduction',
      url: 'https://docs.freebsd.org/en/books/handbook/introduction/',
    },
  },
  linux: {
    id: 'linux',
    name: 'Linux',
    year: '1991',
    summary: 'An independently written Unix-like kernel.',
    origin:
      'Started as Linus Torvalds’s personal kernel project in Helsinki and developed through online collaboration.',
    creator: 'Linus Torvalds and a worldwide contributor community',
    purpose:
      'Provide a freely developed kernel that manages hardware and runs software within a Unix-like environment.',
    milestones: [
      'First announced and released in 1991.',
      'Combined with GNU and other software in many operating-system distributions.',
    ],
    relatedTech: ['Unix', 'GNU', 'Android', 'Containers'],
    historicalInfluence:
      'Linux became central to servers, cloud infrastructure, embedded devices, and Android. It is Unix-like by design, not a branch of the original Unix source tree.',
    source: {
      label: 'The Linux Kernel Archives · About',
      url: 'https://www.kernel.org/category/about.html',
    },
  },
  transistor: {
    id: 'transistor',
    name: 'Transistor',
    year: '1947',
    summary: 'A small solid-state device for switching and amplifying signals.',
    origin:
      'The first working point-contact transistor was demonstrated at Bell Labs.',
    creator: 'John Bardeen and Walter Brattain, working with William Shockley',
    purpose:
      'Control electrical current with a smaller, lower-power alternative to vacuum tubes.',
    milestones: [
      'Demonstrated in December 1947.',
      'Transistors were adopted in computers during the 1950s.',
    ],
    relatedTech: ['Vacuum tubes', 'Semiconductors', 'Integrated circuits'],
    historicalInfluence:
      'Transistors made smaller and more reliable electronic computers possible. Modern chips contain vast numbers of integrated transistors.',
    source: {
      label: 'Computer History Museum · Timeline: 1947',
      url: 'https://www.computerhistory.org/timeline/1947/',
    },
  },
  ic: {
    id: 'ic',
    name: 'Integrated circuit',
    year: '1958–1959',
    summary:
      'Multiple electronic components fabricated together on a semiconductor.',
    origin:
      'Jack Kilby demonstrated an integrated circuit at Texas Instruments in 1958; Robert Noyce developed a practical silicon approach at Fairchild in 1959.',
    creator: 'Jack Kilby and Robert Noyce, in separate developments',
    purpose:
      'Connect components within a compact manufactured device, reducing size and assembly complexity.',
    milestones: [
      'Kilby’s working demonstration in 1958.',
      'Noyce’s planar silicon approach followed in 1959.',
    ],
    relatedTech: ['Transistors', 'Semiconductors', 'Microprocessors'],
    historicalInfluence:
      'Integrated circuits enabled the growing density and falling cost of electronics, eventually allowing an entire CPU to fit on one chip.',
    source: {
      label: 'Computer History Museum · Timeline: 1958',
      url: 'https://www.computerhistory.org/timeline/1958/',
    },
  },
  intel4004: {
    id: 'intel4004',
    name: 'Intel 4004',
    year: '1971',
    summary: 'A pioneering commercial single-chip microprocessor.',
    origin:
      'Developed for a Busicom calculator project and introduced by Intel.',
    creator: 'Federico Faggin, Ted Hoff, Stan Mazor, and Masatoshi Shima',
    purpose:
      'Implement a programmable processor on one chip, initially for calculators.',
    milestones: [
      'Introduced commercially in November 1971.',
      'Its four-bit architecture helped demonstrate the general-purpose potential of microprocessors.',
    ],
    relatedTech: ['Integrated circuits', 'Busicom', 'Intel 8008'],
    historicalInfluence:
      'The 4004 was an early landmark in bringing programmable computing into compact products. Later CPU families used different architectures.',
    source: {
      label: 'Intel · The Story of the Intel 4004',
      url: 'https://www.intel.com/content/www/us/en/history/museum-story-of-intel-4004.html',
    },
  },
  arm1: {
    id: 'arm1',
    name: 'ARM1',
    year: '1985',
    summary: 'The first working processor in the ARM architecture family.',
    origin:
      'Designed at Acorn Computers in Cambridge as part of the Acorn RISC Machine project.',
    creator:
      'Acorn’s engineering team, including Sophie Wilson and Steve Furber',
    purpose:
      'Build an efficient processor using a reduced instruction set design.',
    milestones: [
      'The first ARM1 silicon ran in April 1985.',
      'Later ARM designs spread through mobile and embedded computing.',
    ],
    relatedTech: ['RISC', 'Acorn Archimedes', 'Mobile computing'],
    historicalInfluence:
      'ARM’s efficiency-oriented architecture became widely used in phones and embedded devices. ARM1 is a separate architecture, not a descendant of the Intel 4004.',
    source: {
      label: 'Arm · Company history',
      url: 'https://www.arm.com/company/history',
    },
  },
  packets: {
    id: 'packets',
    name: 'Packet switching',
    year: '1960s',
    summary:
      'Messages split into pieces that can share a communications network.',
    origin:
      'Developed through independent research, notably by Paul Baran in the United States and Donald Davies in the United Kingdom.',
    creator: 'Paul Baran, Donald Davies, and other networking researchers',
    purpose:
      'Allow many communications to share network links and route data in small units.',
    milestones: [
      'Independent research programs developed in the 1960s.',
      'Packet networking became a foundation of ARPANET and later the Internet.',
    ],
    relatedTech: ['ARPANET', 'NPL network', 'Internet Protocol'],
    historicalInfluence:
      'Packet switching is a foundational idea of the Internet; its research history includes multiple independent contributions.',
    source: {
      label: 'Internet Society · A Brief History of the Internet',
      url: 'https://www.internetsociety.org/internet/history-internet/brief-history-internet/',
    },
  },
  arpanet: {
    id: 'arpanet',
    name: 'ARPANET',
    year: '1969',
    summary: 'A research network connecting computers across institutions.',
    origin:
      'Funded by the US Advanced Research Projects Agency and built by research institutions and contractors.',
    creator: 'ARPA, BBN, and participating university research teams',
    purpose: 'Connect distant computers and support shared research resources.',
    milestones: [
      'Its first host-to-host message was sent in October 1969.',
      'The network adopted TCP/IP on 1 January 1983.',
    ],
    relatedTech: ['Packet switching', 'NCP', 'TCP/IP'],
    historicalInfluence:
      'ARPANET was a major precursor and testbed for the Internet, though the Internet grew from interconnecting many distinct networks.',
    source: {
      label: 'Internet Society · A Brief History of the Internet',
      url: 'https://www.internetsociety.org/internet/history-internet/brief-history-internet/',
    },
  },
  tcpip: {
    id: 'tcpip',
    name: 'TCP/IP Internet',
    year: '1983',
    summary:
      'Common protocols let different networks communicate as one internetwork.',
    origin:
      'Research on internetworking in the 1970s led to the TCP and IP protocols and coordinated adoption.',
    creator: 'Vint Cerf, Bob Kahn, and the wider networking research community',
    purpose:
      'Move packets across different networks and provide reliable communication between hosts.',
    milestones: [
      'Cerf and Kahn published their internetworking paper in 1974.',
      'ARPANET switched from NCP to TCP/IP on 1 January 1983.',
    ],
    relatedTech: ['ARPANET', 'IP addresses', 'DNS', 'World Wide Web'],
    historicalInfluence:
      'TCP/IP made an interoperable network of networks practical. The Web later used this infrastructure as an application.',
    source: {
      label: 'Internet Society · A Brief History of the Internet',
      url: 'https://www.internetsociety.org/internet/history-internet/brief-history-internet/',
    },
  },
  web: {
    id: 'web',
    name: 'World Wide Web',
    year: '1989',
    summary: 'Linked documents and resources accessed over the Internet.',
    origin:
      'Proposed by Tim Berners-Lee at CERN to help researchers share information.',
    creator:
      'Tim Berners-Lee, with early collaboration from Robert Cailliau and others',
    purpose:
      'Make information accessible through hypertext links using common addresses and protocols.',
    milestones: [
      'The original proposal was written in March 1989.',
      'The first browser and server were working by the end of 1990.',
      'CERN released Web software into the public domain in 1993.',
    ],
    relatedTech: ['Internet', 'HTML', 'HTTP', 'URLs'],
    historicalInfluence:
      'The Web created a common platform for linked information and, later, applications. It is one service running on the Internet.',
    source: {
      label: 'CERN · The birth of the Web',
      url: 'https://home.cern/science/computing/birth-web',
    },
  },
  ai: {
    id: 'ai',
    name: 'Artificial intelligence',
    year: '1956',
    summary:
      'A research field exploring machines that perform tasks associated with intelligence.',
    origin:
      'The 1956 Dartmouth summer research project helped establish the field and its name.',
    creator:
      'John McCarthy, Marvin Minsky, Nathaniel Rochester, Claude Shannon, and a broader research community',
    purpose:
      'Study and build computational methods for reasoning, learning, perception, language, and action.',
    milestones: [
      'The Dartmouth proposal used the term “artificial intelligence” in 1955.',
      'The associated summer project took place in 1956.',
    ],
    relatedTech: [
      'Symbolic reasoning',
      'Machine learning',
      'Expert systems',
      'Neural networks',
    ],
    historicalInfluence:
      'AI includes many parallel approaches. Its history is not a single chain from symbolic systems to today’s neural networks.',
    source: {
      label: 'Dartmouth · Artificial Intelligence',
      url: 'https://home.dartmouth.edu/about/artificial-intelligence-ai-coined-dartmouth',
    },
  },
  expert: {
    id: 'expert',
    name: 'Expert systems',
    year: '1960s–1980s',
    summary: 'Programs that apply explicitly represented specialist knowledge.',
    origin:
      'Early systems such as DENDRAL at Stanford showed the value of domain-specific knowledge.',
    creator:
      'Multiple research teams, including Edward Feigenbaum and colleagues at Stanford',
    purpose:
      'Use knowledge bases and inference rules to support decisions in a narrow domain.',
    milestones: [
      'DENDRAL began in the 1960s.',
      'Expert systems attracted substantial commercial interest in the 1980s.',
    ],
    relatedTech: ['Symbolic AI', 'Knowledge bases', 'Inference rules'],
    historicalInfluence:
      'Expert systems demonstrated the power and maintenance costs of encoding human expertise as explicit knowledge and rules.',
    source: {
      label: 'Computer History Museum · AI and Robotics Timeline',
      url: 'https://www.computerhistory.org/timeline/ai-robotics/',
    },
  },
  deep: {
    id: 'deep',
    name: 'Deep learning',
    year: '2012 milestone',
    summary:
      'Multi-layer neural networks learn useful representations from data.',
    origin:
      'Built on decades of neural-network research; AlexNet’s 2012 ImageNet result was a prominent turning point.',
    creator:
      'A broad research community; AlexNet was developed by Alex Krizhevsky, Ilya Sutskever, and Geoffrey Hinton',
    purpose:
      'Learn patterns and representations for tasks such as recognizing images, speech, and language.',
    milestones: [
      'Neural networks long predate 2012.',
      'AlexNet achieved a major ImageNet image-classification result in 2012.',
    ],
    relatedTech: ['Neural networks', 'GPUs', 'Backpropagation', 'Transformers'],
    historicalInfluence:
      'Larger datasets, faster hardware, and improved training made deep learning practical across many tasks. The 2012 date marks a milestone, not its invention.',
    source: {
      label: 'AlexNet paper · NeurIPS 2012',
      url: 'https://proceedings.neurips.cc/paper/2012/hash/c399862d3b9d6b76c8436e924a68c45b-Abstract.html',
    },
  },
  transformer: {
    id: 'transformer',
    name: 'Transformer',
    year: '2017',
    summary: 'A neural-network architecture centered on attention mechanisms.',
    origin: 'Introduced in the research paper “Attention Is All You Need.”',
    creator: 'Ashish Vaswani and seven coauthors',
    purpose:
      'Model relationships within sequences while enabling efficient parallel training.',
    milestones: [
      'The architecture was introduced in 2017.',
      'Transformer variants became central to many large language models.',
    ],
    relatedTech: ['Attention', 'Deep learning', 'Language models'],
    historicalInfluence:
      'Transformers helped enable increasingly capable language and multimodal models. Their behavior is learned from training rather than fixed conversational rules.',
    source: {
      label: 'Attention Is All You Need · Original paper',
      url: 'https://arxiv.org/abs/1706.03762',
    },
  },
  html: {
    id: 'html',
    name: 'HTML',
    year: '1990s',
    summary:
      'The markup language that describes the structure of Web documents.',
    origin:
      'Created alongside the first Web browser and server, drawing on existing markup ideas.',
    creator: 'Tim Berners-Lee, followed by standards communities',
    purpose:
      'Describe linked documents with headings, paragraphs, lists, and other structural elements.',
    milestones: [
      'Early HTML appeared with the first Web implementations.',
      'The language evolved through standards into the living HTML specification.',
    ],
    relatedTech: ['World Wide Web', 'HTTP', 'CSS', 'JavaScript'],
    historicalInfluence:
      'HTML remains the structural foundation of Web pages, alongside CSS for presentation and JavaScript for programming.',
    source: {
      label: 'CERN · The birth of the Web',
      url: 'https://home.cern/science/computing/birth-web',
    },
  },
  css: {
    id: 'css',
    name: 'CSS',
    year: '1996',
    summary:
      'A language for describing the presentation of structured documents.',
    origin:
      'Developed through early Web proposals and W3C work to separate document structure from presentation.',
    creator: 'Håkon Wium Lie, Bert Bos, and the Web standards community',
    purpose:
      'Control typography, color, spacing, and layout through reusable cascading rules.',
    milestones: [
      'Håkon Wium Lie proposed cascading style sheets in 1994.',
      'CSS Level 1 became a W3C Recommendation in December 1996.',
    ],
    relatedTech: ['HTML', 'DOM', 'Responsive design'],
    historicalInfluence:
      'CSS made presentation reusable across pages and evolved into a sophisticated system for responsive Web layouts.',
    source: {
      label: 'W3C · A brief history of CSS',
      url: 'https://www.w3.org/Style/CSS20/history.html',
    },
  },
  javascript: {
    id: 'javascript',
    name: 'JavaScript',
    year: '1995',
    summary: 'A programming language that brought scripting to Web pages.',
    origin: 'Created at Netscape for its Navigator browser.',
    creator:
      'Brendan Eich; subsequently developed by the ECMAScript standards community',
    purpose:
      'Let authors add programmable behavior and interaction to Web pages.',
    milestones: [
      'First introduced at Netscape in 1995.',
      'ECMAScript’s first standard was published in 1997.',
    ],
    relatedTech: ['HTML', 'DOM', 'ECMAScript', 'Node.js'],
    historicalInfluence:
      'JavaScript became a core Web technology and expanded beyond browsers. It complements HTML and CSS; it is not a descendant of either language.',
    source: {
      label: 'MDN · JavaScript technology overview',
      url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/JavaScript_technologies_overview',
    },
  },
}

export const evolutionTrees: EvolutionTree[] = [
  {
    id: 'languages',
    title: 'Programming languages',
    subtitle:
      'A direct language family, with influences arriving from outside the branch.',
    root: {
      nodeId: 'bcpl',
      children: [
        {
          nodeId: 'b',
          relationship: 'Simplified from BCPL',
          children: [
            {
              nodeId: 'c',
              relationship: 'Direct successor to B',
              children: [
                {
                  nodeId: 'cpp',
                  relationship: 'Extends C; classes influenced by Simula',
                },
              ],
            },
          ],
        },
      ],
    },
  },
  {
    id: 'systems',
    title: 'Operating systems',
    subtitle:
      'Source-code descent and independent reimplementation are different relationships.',
    root: {
      nodeId: 'unix',
      children: [
        {
          nodeId: 'bsd',
          relationship: 'Grew from a Unix distribution',
          children: [
            { nodeId: 'freebsd', relationship: 'BSD lineage, through 386BSD' },
          ],
        },
        {
          nodeId: 'linux',
          relationship: 'Independent Unix-like implementation',
        },
      ],
    },
  },
  {
    id: 'hardware',
    title: 'Hardware',
    subtitle:
      'Enabling technologies and distinct processor designs, not one CPU family.',
    root: {
      nodeId: 'transistor',
      children: [
        {
          nodeId: 'ic',
          relationship: 'Integrates transistors and other components',
          children: [
            {
              nodeId: 'intel4004',
              relationship: 'A CPU implemented on one chip',
            },
            {
              nodeId: 'arm1',
              relationship: 'A separate single-chip RISC architecture',
            },
          ],
        },
      ],
    },
  },
  {
    id: 'internet',
    title: 'Internet',
    subtitle:
      'An infrastructure story: ideas, research networks, protocols, then applications.',
    root: {
      nodeId: 'packets',
      children: [
        {
          nodeId: 'arpanet',
          relationship: 'Research network using packet switching',
          children: [
            {
              nodeId: 'tcpip',
              relationship: 'Adopted by ARPANET; connects many networks',
              children: [
                {
                  nodeId: 'web',
                  relationship: 'An application built on the Internet',
                },
              ],
            },
          ],
        },
      ],
    },
  },
  {
    id: 'ai',
    title: 'Artificial intelligence',
    subtitle:
      'Parallel research approaches, with a neural-network branch shown in more detail.',
    root: {
      nodeId: 'ai',
      children: [
        {
          nodeId: 'expert',
          relationship: 'A knowledge-based approach within AI',
        },
        {
          nodeId: 'deep',
          relationship: 'A neural approach within machine learning',
          children: [
            {
              nodeId: 'transformer',
              relationship: 'One deep-learning architecture',
            },
          ],
        },
      ],
    },
  },
  {
    id: 'web',
    title: 'Web development',
    subtitle:
      'Complementary Web technologies: structure, presentation, and programmable behavior.',
    root: {
      nodeId: 'web',
      children: [
        {
          nodeId: 'html',
          relationship: 'Document structure for the Web',
          children: [
            {
              nodeId: 'css',
              relationship: 'Styles HTML and other structured documents',
            },
            {
              nodeId: 'javascript',
              relationship: 'Adds behavior; complements HTML and CSS',
            },
          ],
        },
      ],
    },
  },
]
