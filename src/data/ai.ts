export interface AIMilestone {
  id: string
  period: string
  title: string
  category: string
  description: string
  significance: string
  source: { label: string; url: string }
}

export const aiMilestones: AIMilestone[] = [
  {
    id: 'turing',
    period: '1950',
    title: 'A question of intelligence',
    category: 'FOUNDATIONS',
    description:
      'Alan Turing’s paper “Computing Machinery and Intelligence” proposed the imitation game as a way to discuss machine intelligence through observable conversation.',
    significance:
      'The paper reframed a philosophical question as an experimental one. Passing a conversational test is not proof of understanding.',
    source: {
      label: 'Turing’s original paper · Mind',
      url: 'https://doi.org/10.1093/mind/LIX.236.433',
    },
  },
  {
    id: 'dartmouth',
    period: '1956',
    title: 'A field gets a name',
    category: 'FOUNDATIONS',
    description:
      'The Dartmouth summer research project brought researchers together around the term “artificial intelligence.” Its proposal was written in 1955 by John McCarthy, Marvin Minsky, Nathaniel Rochester, and Claude Shannon.',
    significance:
      'A shared research agenda emerged, rather than a single invention or a finished intelligent machine.',
    source: {
      label: 'Dartmouth proposal · John McCarthy archive',
      url: 'https://www-formal.stanford.edu/jmc/history/dartmouth/dartmouth.html',
    },
  },
  {
    id: 'eliza',
    period: '1966',
    title: 'ELIZA and the conversational illusion',
    category: 'LANGUAGE',
    description:
      'Joseph Weizenbaum described ELIZA, a program that used decomposition and reassembly rules. Its famous DOCTOR script echoed a nondirective psychotherapist.',
    significance:
      'People could attribute understanding to a program that was transforming text with rules. The demonstration below illustrates that distinction with its own original rules.',
    source: {
      label: 'Weizenbaum’s ELIZA paper · ACM',
      url: 'https://doi.org/10.1145/365153.365168',
    },
  },
  {
    id: 'expert',
    period: '1970s',
    title: 'Knowledge becomes a rulebook',
    category: 'EXPERT SYSTEMS',
    description:
      'Expert systems encoded specialist knowledge as rules. Stanford’s MYCIN explored recommendations for bacterial infections; its work was research, not routine clinical deployment.',
    significance:
      'These systems could give useful advice in narrow domains, but depended on carefully maintained human-authored knowledge.',
    source: {
      label: 'Rule-Based Expert Systems · Stanford',
      url: 'https://shortliffe.su.domains/Buchanan-Shortliffe-1984/',
    },
  },
  {
    id: 'winters',
    period: '1970s / 1980s',
    title: 'Expectations meet limits',
    category: 'AI WINTERS',
    description:
      'Periods often called “AI winters” involved reduced enthusiasm and funding in parts of the field. Common accounts place one in the 1970s and another in the late 1980s into the 1990s.',
    significance:
      'Progress was uneven: ambitious promises, limited computing resources, and brittle systems affected different research communities at different times.',
    source: {
      label: 'AI and robotics history · Computer History Museum',
      url: 'https://www.computerhistory.org/revolution/artificial-intelligence-robotics/13',
    },
  },
  {
    id: 'deep-blue',
    period: '1997',
    title: 'Deep Blue wins the match',
    category: 'SEARCH',
    description:
      'IBM’s Deep Blue defeated world chess champion Garry Kasparov in a six-game rematch. Specialized hardware, search, and chess evaluation powered its play.',
    significance:
      'A landmark in a precisely defined task, rather than a demonstration of general intelligence.',
    source: {
      label: 'Deep Blue · IBM history',
      url: 'https://www.ibm.com/history/deep-blue',
    },
  },
  {
    id: 'alexnet',
    period: '2012',
    title: 'Deep learning sees a breakthrough',
    category: 'NEURAL NETWORKS',
    description:
      'Alex Krizhevsky, Ilya Sutskever, and Geoffrey Hinton’s deep convolutional network achieved a major improvement in the ImageNet image classification competition, using GPUs for training.',
    significance:
      'AlexNet helped accelerate the use of learned representations in computer vision. Neural networks themselves were already decades old.',
    source: {
      label: 'ImageNet classification paper · NeurIPS',
      url: 'https://papers.nips.cc/paper/4824-imagenet-classification-with-deep-convolutional-neural-networks',
    },
  },
  {
    id: 'alphago',
    period: '2016',
    title: 'AlphaGo changes the board',
    category: 'LEARNING + SEARCH',
    description:
      'DeepMind’s AlphaGo defeated Lee Sedol 4–1 in Seoul. The system combined neural networks with tree search, learning from human games and self-play.',
    significance:
      'Learning and search worked together on a game whose enormous space of possible positions had resisted earlier approaches.',
    source: {
      label: 'AlphaGo · Google DeepMind',
      url: 'https://deepmind.google/research/breakthroughs/alphago/',
    },
  },
  {
    id: 'transformer',
    period: '2017',
    title: 'Attention becomes an architecture',
    category: 'LANGUAGE MODELS',
    description:
      'The paper “Attention Is All You Need,” by Ashish Vaswani and colleagues, introduced the Transformer for sequence transduction, using attention without recurrence or convolutions.',
    significance:
      'Transformer architectures became central to many later language models and expanded into other types of data.',
    source: {
      label: 'Attention Is All You Need · original paper',
      url: 'https://arxiv.org/abs/1706.03762',
    },
  },
  {
    id: 'generative',
    period: '2022',
    title: 'Generative AI reaches a wider public',
    category: 'PUBLIC ADOPTION',
    description:
      'The public release of ChatGPT in November 2022 made conversational access to a large language model widely visible. Image generation tools also drew broad attention during this period.',
    significance:
      'Generative AI predates 2022. This moment marks wider public adoption, along with new questions about reliability, authorship, and appropriate use.',
    source: {
      label: 'Introducing ChatGPT · OpenAI',
      url: 'https://openai.com/index/chatgpt/',
    },
  },
  {
    id: 'today',
    period: '2026',
    title: 'A platform landscape',
    category: 'PRESENT-DAY SNAPSHOT',
    description:
      'In this museum’s 2026 snapshot, AI is encountered through assistants, developer APIs, and tools that work with text, images, and audio. This is a view of the landscape, not a claim of one new invention in 2026.',
    significance:
      'Modern language models use parameters learned during training and generate outputs from context. They can produce convincing errors; capability varies by model and task.',
    source: {
      label: 'Current platform capabilities · OpenAI documentation',
      url: 'https://platform.openai.com/docs/overview',
    },
  },
]

export interface RuleReply {
  text: string
  rule: string
  pattern: string
  explanation: string
}

const reflect = (input: string) =>
  input
    .replace(/\b(i|me|my|am|you|your)\b/gi, (word) => {
      const reflected: Record<string, string> = {
        i: 'you',
        me: 'you',
        my: 'your',
        am: 'are',
        you: 'I',
        your: 'my',
      }
      return reflected[word.toLowerCase()] ?? word
    })
    .replace(/[.!?]+$/, '')

/** An original, deterministic teaching toy; not an implementation of historical ELIZA. */
export function replyToPattern(input: string): RuleReply {
  const normalized = input.trim().replace(/\s+/g, ' ')
  if (/\b(hello|hi|hey)\b/i.test(normalized))
    return {
      text: 'Hello. What would you like to explore?',
      rule: 'Greeting',
      pattern: '\\b(hello|hi|hey)\\b',
      explanation: 'A greeting word matched. The response is a fixed sentence.',
    }
  const feeling = normalized.match(/\bI feel\s+(.+?)[.!?]*$/i)
  if (feeling)
    return {
      text: `What makes you feel ${reflect(feeling[1])}?`,
      rule: 'Feeling echo',
      pattern: '\\bI feel\\s+(.+?)[.!?]*$',
      explanation:
        'The text after “I feel” was captured, pronouns were swapped, and the result was inserted into a fixed question.',
    }
  const reason = normalized.match(/\bbecause\s+(.+?)[.!?]*$/i)
  if (reason)
    return {
      text: `Is ${reflect(reason[1])} the only reason?`,
      rule: 'Reason echo',
      pattern: '\\bbecause\\s+(.+?)[.!?]*$',
      explanation:
        'The text after “because” was captured and inserted into a question template.',
    }
  if (/\b(mother|father|family|sister|brother)\b/i.test(normalized))
    return {
      text: 'What comes to mind when you think about your family?',
      rule: 'Family keyword',
      pattern: '\\b(mother|father|family|sister|brother)\\b',
      explanation:
        'A family-related word triggered this fixed response. No personal relationship was inferred.',
    }
  if (/\b(computer|machine|robot|ai)\b/i.test(normalized))
    return {
      text: 'What do you expect a computer to understand?',
      rule: 'Machine keyword',
      pattern: '\\b(computer|machine|robot|ai)\\b',
      explanation:
        'A machine-related word triggered this fixed response. The program has no model of your expectations.',
    }
  if (/\?\s*$/.test(normalized))
    return {
      text: 'What answer would you expect?',
      rule: 'Question ending',
      pattern: '\\?\\s*$',
      explanation:
        'The message ended with a question mark. The program did not interpret the question.',
    }
  return {
    text: 'Tell me a little more about that.',
    rule: 'Fallback',
    pattern: 'No earlier pattern matched',
    explanation:
      'No listed pattern matched, so the same default sentence is returned.',
  }
}
