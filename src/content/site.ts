// Every word on the site lives here. Voice rules: .ulpi/design/DESIGN.md "Voice".
// Sources for each fact: .ulpi/design/site.md "Content facts". TODO(confirm) marks anything Tony
// has not signed off yet.

export const site = {
  name: 'TONY Skate Club',
  url: 'https://tony-woodland-skates.vercel.app', // TODO(confirm): final domain
  description:
    'Free group skates on Nashville greenways, started by Tony Woodland: Rollerblade team skater and model.',
  instagram: { handle: '@ynotwoodland', url: 'https://www.instagram.com/ynotwoodland/' },
  facebook: 'https://www.facebook.com/anthony.woodland.739',
  email: 'woodland.anthony@gmail.com', // TODO(confirm): public booking address
  city: 'Nashville, Tennessee',
} as const;

export const nav = {
  left: [
    { href: '/club', label: 'Club' },
    { href: '/edits', label: 'Edits' },
  ],
  right: [
    { href: '/tony', label: 'Tony' },
    { href: `mailto:${site.email}`, label: 'Book' },
  ],
} as const;

export const home = {
  heroLabel: 'TONY Skate Club. Tony skating down a wooded road, from his film French Class.',
  split: {
    club: {
      word: 'Skate',
      line: 'Free group skates on Nashville greenways. Any level, any wheels.',
      link: 'How the club works',
      href: '/club',
    },
    tony: {
      word: 'Tony',
      line: 'Street and freeride on the Rollerblade team, and in front of the camera when he is not.',
      link: 'Meet Tony',
      href: '/tony',
    },
  },
  club: {
    title: 'Roll with us',
    body: 'No sign-up, no fee, no level check. Bring skates and a helmet, and roll at your own pace.',
  },
  edits: { title: 'Watch Tony skate', link: 'All edits' },
  sheet: { title: 'Contact sheet', body: 'Skate days and shoot days.' },
} as const;

export const club = {
  title: 'Skate with Tony',
  lead:
    'TONY Skate Club is a free group skate on Nashville greenways. Tony started it so more people would get on wheels. Show up, roll at your pace, leave with a crew.',
  // TODO(confirm): Nashville Scene (May 2026) says Austin Black of Skate Nashville now hosts the
  // greenway skates. Confirm the club name, host, schedule and meet spot with Tony.
  // TODO(confirm): Eris's mockup listed "Group lessons", "Freestyle training" and "Events". If
  // those are real offers, they replace the greenway-only copy below.
  facts: [
    { term: 'Who', detail: 'Anyone. Inlines or quads, first day or tenth year.' },
    { term: 'Cost', detail: 'Free.' },
    { term: 'Where', detail: 'Nashville greenways. The meet spot changes, and it goes up on Instagram.' },
    { term: 'When', detail: 'Posted on Instagram before every skate.' },
    { term: 'Bring', detail: 'Skates, a helmet, wrist guards if you are new, and water.' },
  ],
  etiquette: {
    title: 'Greenway manners',
    items: [
      'Keep right and pass on the left.',
      'Call your pass out loud before you make it.',
      'Walkers, strollers and dogs get the path first.',
      'Nobody gets left behind. The group waits at every turn.',
    ],
  },
  cta: 'Follow for the next skate',
} as const;

export const tony = {
  title: 'Tony Woodland',
  lead: 'Street and freeride skater on the Rollerblade team, and a working model, based in Nashville.',
  // TODO(confirm): bio wording with Tony.
  bio: [
    'Tony grew up in Nashville and has been on skates since he was 13. Before he owned a pair he was reading about aggressive skating in books from his school library, and the first skates he got were the ones he asked for at Christmas.',
    'Now he skates streets, parks and long mountain roads for Rollerblade, and spends the rest of his time on set: fashion, fragrance, western and motorcycle shoots.',
  ],
  quote: {
    text: 'Do what you love and love what you do.',
    source: 'Tony, asked by Rollerblade for his best tip for any skater',
  },
  aside: {
    q: 'If he could be any animal on skates?',
    a: 'A horse. "Imagine how fast and powerful that thing would be."',
  },
  skate: {
    title: 'Skate',
    facts: [
      { term: 'Team', detail: 'Rollerblade' },
      { term: 'Style', detail: 'Street and freeride' },
      { term: 'Setup', detail: 'Blank SK, Twister XT' },
      { term: 'Home', detail: 'Nashville, Tennessee' },
    ],
    link: 'Watch the edits',
  },
  model: {
    title: 'Model',
    body: 'Studio, western, motorcycle and lifestyle work. Tony shoots in Nashville and travels for the right job.',
    cta: 'Email Tony to book',
    reel: {
      src: '/hero/rooted.mp4',
      poster: '/hero/rooted.jpg',
      caption: 'Rooted, for Rhude and Honda.', // TODO(confirm): credit and whether it may be shown here
    },
  },
  film: {
    title: 'French Class',
    body: 'A short skate film: Tony on a wooded road in plaid, with a French lesson for subtitles.',
    // TODO(confirm): who made it, and where it lives online so it can be linked or embedded.
  },
  press: {
    title: 'Press',
    items: [
      {
        outlet: 'Rollerblade',
        title: 'My Escape: Tony’s World',
        url: 'https://www.rollerblade.com/uk/en/the-rollerblade-experience/urban/my-escape-tony-s-world',
      },
      {
        outlet: 'Rollerblade',
        title: 'Team profile: Tony Woodland',
        url: 'https://www.rollerblade.com/usa/en/the-rollerblade-experience/team/tony-woodland',
      },
      {
        outlet: 'Nashville Scene',
        title: 'Summer Guide 2026: skating and skateboarding',
        url: 'https://www.nashvillescene.com/arts_culture/coverstory/summer-guide-skating-skateboarding/article_96ed4abc-4261-4c0a-a206-52910f88c6d6.html',
      },
    ],
  },
} as const;

export type Edit = {
  id: string;
  title: string;
  channel: string;
  note: string;
  vertical?: boolean;
};

export const edits: Edit[] = [
  { id: '1j8R7Y7CJHs', title: 'Rockit', channel: 'Rollerblade', note: 'Nashville street, filmed by Zach Leavell. 2025.' },
  { id: 'U6aXyUZ9cEw', title: 'Tony Woodland', channel: 'Rollerblade', note: 'His Rollerblade team part.' },
  { id: 'hraOpDyJZ0o', title: 'Los Angeles', channel: 'SK Films', note: 'A trip edit from LA.' },
  { id: '_YQfCCO5nvw', title: 'Tony Woodland 2025', channel: 'Rollerblade', note: 'One minute, vertical.', vertical: true },
  { id: 'cc2pZo5FazI', title: 'Twister XT unboxing', channel: 'Rollerblade', note: 'Tony sets up his skates. 2022.' },
];

export const footer = {
  ladder: ['Skate', 'Skate', 'Skate', 'Club'],
  columns: [
    { title: 'Watch', links: [{ href: '/edits', label: 'Edits' }, { href: 'https://www.youtube.com/@Rollerblade', label: 'Rollerblade on YouTube' }] },
    { title: 'Skate', links: [{ href: '/club', label: 'How the club works' }, { href: site.instagram.url, label: `Instagram ${site.instagram.handle}` }] },
    { title: 'Book', links: [{ href: '/tony', label: 'About Tony' }, { href: `mailto:${site.email}`, label: 'Email Tony' }] },
  ],
  credit: { label: 'Site by Syntra AI', href: 'https://syntraai.tech' },
} as const;

export const notFound = {
  ladder: ['Lost', 'Lost', 'Lost', 'Tony'],
  body: 'That page rolled off. The club and the edits are still here.',
  link: 'Back to the start',
} as const;
