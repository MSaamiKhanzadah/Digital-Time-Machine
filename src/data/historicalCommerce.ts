/** Original museum sample content, never an archive of real uploads or retail offers. */
export interface MuseumVideo {
  id: string
  title: string
  creator: string
  description: string
  subject: 'computer' | 'mouse' | 'modem' | 'phone'
  availableFrom: number
  duration: number
  views: string
}

export const museumVideos: MuseumVideo[] = [
  {
    id: 'room-sized-computer',
    title: 'A room-sized computer',
    creator: 'The Computing Museum',
    description:
      'An original animated museum illustration of early room-sized computing. Watch the indicator lights and imagine programming a machine before a screen was ordinary.',
    subject: 'computer',
    availableFrom: 2005,
    duration: 48,
    views: '1,248',
  },
  {
    id: 'mouse-finds-way',
    title: 'How a mouse finds its way',
    creator: 'The Computing Museum',
    description:
      'A tiny museum animation about pointing, clicking, and the shift from typed commands to graphical interfaces. This is original sample content, not a historical upload.',
    subject: 'mouse',
    availableFrom: 2005,
    duration: 36,
    views: '864',
  },
  {
    id: 'dial-up-connection',
    title: 'The sound of a dial-up connection',
    creator: 'The Computing Museum',
    description:
      'Follow a visual signal from a home computer to a modem and the web. This silent original animation explains a connection that once occupied the household phone line.',
    subject: 'modem',
    availableFrom: 2005,
    duration: 42,
    views: '2,106',
  },
  {
    id: 'pages-to-pockets',
    title: 'From pages to pockets',
    creator: 'The Computing Museum',
    description:
      'A simple original illustration of the web moving between desktop and pocket-sized screens. The clip is museum sample content presented inside each interface era.',
    subject: 'phone',
    availableFrom: 2010,
    duration: 54,
    views: '1,732',
  },
]

export interface MuseumProduct {
  id: string
  title: string
  kind: 'book' | 'mouse' | 'player' | 'headphones'
  availableFrom: number
  price: number
  description: string
  details: string[]
  color: string
  coverTitle: string
}

export const museumProducts: MuseumProduct[] = [
  {
    id: 'early-web-guide',
    title: 'A Field Guide to the Early Web',
    kind: 'book',
    availableFrom: 1995,
    price: 18.95,
    description:
      'An imaginary illustrated guide to links, home pages, and the delight of finding something new online. Created as original sample inventory for this museum.',
    details: [
      'Fictional museum edition',
      'Paperback · 192 sample pages',
      'Topic: discovering the early web',
    ],
    color: '#174e72',
    coverTitle: 'A FIELD GUIDE\nTO THE\nEARLY WEB',
  },
  {
    id: 'computing-atlas',
    title: 'The Pocket Atlas of Computing',
    kind: 'book',
    availableFrom: 1995,
    price: 14.5,
    description:
      'A fictional pocket companion to the ideas behind computers, from switches to software. A friendly sample book for our reconstructed bookstore.',
    details: [
      'Fictional museum edition',
      'Paperback · 144 sample pages',
      'Topic: computing fundamentals',
    ],
    color: '#a64026',
    coverTitle: 'THE POCKET\nATLAS OF\nCOMPUTING',
  },
  {
    id: 'home-page-workshop',
    title: 'Build Your First Home Page',
    kind: 'book',
    availableFrom: 1998,
    price: 22,
    description:
      'A fictional workshop book celebrating hand-written HTML, personal links pages, and the creative early web. Original museum sample inventory.',
    details: [
      'Fictional museum edition',
      'Paperback · 224 sample pages',
      'Topic: HTML and personal websites',
    ],
    color: '#4b6633',
    coverTitle: 'BUILD YOUR\nFIRST\nHOME PAGE',
  },
  {
    id: 'usb-mouse',
    title: 'Everyday USB Optical Mouse',
    kind: 'mouse',
    availableFrom: 2005,
    price: 16.99,
    description:
      'A fictional wired optical mouse, illustrating the broader electronics selection of a growing online marketplace. It is a museum prop, not an item for sale.',
    details: [
      'Sample electronics',
      'Wired USB connection',
      'Original museum illustration',
    ],
    color: '#46515c',
    coverTitle: 'POINT. CLICK. EXPLORE.',
  },
  {
    id: 'pocket-music-player',
    title: 'Pocket Digital Music Player',
    kind: 'player',
    availableFrom: 2005,
    price: 49.95,
    description:
      'A fictional portable music player with a tiny screen and click controls. Sample inventory showing how digital music entered everyday life.',
    details: [
      'Sample electronics',
      'Pocket-sized design',
      'Original museum illustration',
    ],
    color: '#c5d8dc',
    coverTitle: 'A LITTLE MUSIC. EVERYWHERE.',
  },
  {
    id: 'wireless-headphones',
    title: 'Everyday Wireless Headphones',
    kind: 'headphones',
    availableFrom: 2015,
    price: 39.5,
    description:
      'Fictional wireless headphones for our modern marketplace. An original museum prop about the move toward portable, connected devices.',
    details: [
      'Sample electronics',
      'Over-ear design',
      'Original museum illustration',
    ],
    color: '#334936',
    coverTitle: 'ROOM TO LISTEN.',
  },
]

export const samplePrice = (price: number) => `$${price.toFixed(2)}`

export function readMuseumRoute(path: string): URL {
  try {
    return new URL(
      path.startsWith('/') ? path : `/${path}`,
      'https://museum.invalid',
    )
  } catch {
    return new URL('/unknown', 'https://museum.invalid')
  }
}
