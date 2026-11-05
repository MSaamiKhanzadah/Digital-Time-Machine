export const htmlStarter = `<!doctype html>
<html>
<head><title>My first homepage</title></head>
<body>
  <!-- Add your heading, paragraph, and link here. -->
</body>
</html>`

export const htmlExample = `<!doctype html>
<html>
<head><title>A little corner of the web</title></head>
<body>
  <h1>Welcome to my homepage!</h1>
  <p>I am collecting the little ideas that make technology interesting.</p>
  <a href="#museum">Visit my technology museum</a>
</body>
</html>`

export const htmlTasks = [
  {
    id: 'heading',
    title: 'Say hello to the web',
    description: 'Add an <h1> with a heading of your own.',
  },
  {
    id: 'paragraph',
    title: 'Share something worth reading',
    description: 'Write a <p> containing at least five words.',
  },
  {
    id: 'link',
    title: 'Make a connection',
    description: 'Add a named link to #museum: <a href="#museum">…</a>.',
  },
  {
    id: 'html',
    title: 'Keep this workshop HTML-only',
    description:
      'Use simple text and links. No scripts, styles, embedded media, or external resources.',
  },
] as const

export const htmlWorkshopSource = {
  label: 'HTML 2.0 · RFC 1866 (November 1995)',
  url: 'https://www.rfc-editor.org/rfc/rfc1866',
}
