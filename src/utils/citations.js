import { CITATION_METADATA } from '../data/citationMetadata.js';

export const getAuthorList = (authors = '') => String(authors)
  .split(',')
  .map(author => author.trim())
  .filter(Boolean);

const getCitationData = (publication = {}) => ({
  ...publication,
  ...CITATION_METADATA[publication.id],
  authors: publication.authors,
  type: publication.type,
});

const escapeBibtex = (value = '') => String(value)
  .replace(/\\/g, '\\textbackslash{}')
  .replace(/([&%_$#])/g, '\\$1');

const protectBibtexTitle = (value = '') => `{${escapeBibtex(value)}}`;

const makeCitationKey = (publication = {}) => {
  const data = getCitationData(publication);
  const firstAuthorSurname = getAuthorList(data.authors)[0]?.split(/\s+/).pop() || 'Author';
  const firstTitleWord = String(data.title || 'Title').match(/[A-Za-z0-9]+/)?.[0] || 'Title';
  return `${firstAuthorSurname}${data.year}${firstTitleWord}`
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/[^A-Za-z0-9]/g, '');
};

const bibtexField = (name, value) => value ? `  ${name} = {${escapeBibtex(value)}}` : '';

export const generateBibtex = (publication = {}) => {
  const data = getCitationData(publication);
  const entryType = data.type === 'Journal' ? 'article' : data.type === 'Thesis' ? 'phdthesis' : 'inproceedings';
  const fields = [
    `  title = {${protectBibtexTitle(data.title)}}`,
    bibtexField('author', getAuthorList(data.authors).join(' and ')),
  ];

  if (data.type === 'Journal') fields.push(bibtexField('journal', data.containerTitle || data.venue));
  if (data.type === 'Conference') fields.push(bibtexField('booktitle', data.containerTitle || data.venue));
  if (data.type === 'Thesis') {
    fields.push(bibtexField('school', data.school || data.venue?.replace(/^Ph\.D\. Dissertation,\s*/i, '')));
    fields.push(bibtexField('address', data.address));
  }

  fields.push(
    bibtexField('year', String(data.year || publication.year || '')),
    bibtexField('volume', data.volume),
    bibtexField('number', data.issue),
    bibtexField('pages', data.pages?.replace('-', '--')),
    bibtexField('doi', data.doi),
  );

  if (data.status === 'accepted') fields.push(bibtexField('note', 'Accepted for presentation'));
  if (data.status === 'early-access') fields.push(bibtexField('note', 'Early Access'));
  if (!data.doi && publication.url) fields.push(bibtexField('url', publication.url));

  return `@${entryType}{${makeCitationKey(publication)},\n${fields.filter(Boolean).join(',\n')}\n}`;
};

const toIeeeAuthor = (name = '') => {
  const tokens = String(name).trim().split(/\s+/).filter(Boolean);
  if (tokens.length < 2) return tokens[0] || '';
  const familyName = tokens.at(-1);
  const initials = tokens.slice(0, -1).map((token) => {
    const letters = token.match(/\p{Letter}/gu) || [];
    if (/^[\p{Letter}]\.$/u.test(token)) return token;
    if (token.includes('.')) return letters.map(letter => `${letter.toUpperCase()}.`).join(' ');
    return letters[0] ? `${letters[0].toUpperCase()}.` : '';
  }).filter(Boolean);
  return `${initials.join(' ')} ${familyName}`.trim();
};

const formatIeeeAuthors = (authors = '') => {
  const names = getAuthorList(authors).map(toIeeeAuthor);
  if (names.length > 6) return `${names[0]} et al.`;
  if (names.length === 1) return names[0];
  if (names.length === 2) return `${names[0]} and ${names[1]}`;
  return `${names.slice(0, -1).join(', ')}, and ${names.at(-1)}`;
};

const ieeePages = (pages = '') => String(pages).replace(/(\d)\s*-\s*(\d)/g, '$1–$2');

export const generateIeeeCitation = (publication = {}) => {
  const data = getCitationData(publication);
  const authors = formatIeeeAuthors(data.authors);
  const title = `“${data.title},”`;
  const year = data.year || publication.year;

  if (data.type === 'Thesis') {
    return `${authors}, ${title} Ph.D. dissertation, ${data.school}, ${data.address}, ${year}.`;
  }

  if (data.type === 'Conference' && data.status === 'accepted') {
    return `${authors}, ${title} accepted for presentation at the ${data.containerTitle || data.venue}, ${year}.`;
  }

  if (data.type === 'Conference') {
    const details = [
      `in Proc. ${data.containerTitle || data.venue}`,
      String(year),
      data.pages ? `pp. ${ieeePages(data.pages)}` : '',
      data.doi ? `doi: ${data.doi}` : '',
    ].filter(Boolean).join(', ');
    return `${authors}, ${title} ${details}.`;
  }

  const details = [
    data.abbreviation || data.containerTitle || data.venue,
    data.status === 'early-access' ? 'early access' : '',
    data.volume ? `vol. ${data.volume}` : '',
    data.issue ? `no. ${data.issue}` : '',
    data.pages ? `pp. ${ieeePages(data.pages)}` : '',
    String(year),
    data.doi ? `doi: ${data.doi}` : '',
  ].filter(Boolean).join(', ');
  return `${authors}, ${title} ${details}.`;
};

export const getCitationFormats = (publication = {}) => ({
  ieee: generateIeeeCitation(publication),
  bibtex: generateBibtex(publication),
});
