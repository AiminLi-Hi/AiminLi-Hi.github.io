export const REVIEWER_METRICS_CHECKED_ON = '2026-10-16';

const ieee = {
  year: 2025,
  source: 'https://open.ieee.org/wp-content/uploads/IEEE-Title-List-September-2026.pdf',
  sourceLabel: 'IEEE Title List, September 2026',
};

// ScienceDirect's current publisher listings report JIF, but omit its metric year.
const elsevier = {
  year: null,
  source: 'https://www.sciencedirect.com/browse/calls-for-papers?subject=computer-networks-and-communications',
  sourceLabel: 'Elsevier ScienceDirect',
};

// Shared by both languages. These are journal impact factors, not CiteScores.
export const REVIEWER_JOURNAL_METRICS = {
  'IEEE Transactions on Information Theory (TIT)': { ...ieee, value: 2.6 },
  'IEEE Journal on Selected Areas in Communications (JSAC)': { ...ieee, value: 16.8 },
  'IEEE Transactions on Mobile Computing (TMC)': { ...ieee, value: 8.8 },
  'IEEE Internet of Things Journal (IoTJ)': { ...ieee, value: 8.7 },
  'MDPI Electronics': {
    value: 2.9,
    year: 2025,
    source: 'https://www.mdpi.com/journal/electronics/imprint',
    sourceLabel: 'MDPI Electronics journal imprint',
  },
  'Scientific Reports': {
    value: 4.9,
    year: 2025,
    checkedOn: '2026-10-19',
    source: 'https://www.nature.com/srep/about',
    sourceLabel: 'Nature Portfolio, Scientific Reports journal metrics',
  },
  'Elsevier Knowledge-Based Systems (KnoSys)': {
    value: 7.6,
    year: null,
    checkedOn: '2026-10-19',
    source: 'https://www.sciencedirect.com/journal/knowledge-based-systems/about/policies',
    sourceLabel: 'Elsevier ScienceDirect, Knowledge-Based Systems',
  },
  'IEEE Transactions on Communications (TCOM)': { ...ieee, value: 8.4 },
  'IEEE Transactions on Wireless Communications (TWC)': { ...ieee, value: 10.3 },
  'IEEE Transactions on Neural Networks and Learning Systems (TNNLS)': { ...ieee, value: 9.7 },
  'IEEE Transactions on Vehicular Technology (TVT)': { ...ieee, value: 7.5 },
  'IEEE Transactions on Cognitive Communications and Networking (TCCN)': { ...ieee, value: 8.0 },
  'IEEE Communications Letters (CL)': { ...ieee, value: 4.5 },
  'IEEE Wireless Communications Letters (WCL)': { ...ieee, value: 5.1 },
  Engineering: {
    ...elsevier,
    value: 12.2,
    source: 'https://www.sciencedirect.com/browse/calls-for-papers',
  },
  'ACM/IEEE Transactions on Networking (ToN)': { ...ieee, value: 5.3 },
  'Elsevier Computer Networks': { ...elsevier, value: 4.7 },
  'Elsevier Computer Communications': { ...elsevier, value: 4.2 },
  'Elsevier Ad Hoc Networks': { ...elsevier, value: 5.4 },
  'AEÜ - International Journal of Electronics and Communications': { ...elsevier, value: 3.1 },
};
