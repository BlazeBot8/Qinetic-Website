// Cohort status, kept in one place so every surface reads the same thing and
// there is a single value to change when applications reopen.
//
// The form URL is deliberately deleted rather than hidden behind a flag: while
// applications are closed, nothing on the site should be able to link to it.
export const APPLICATIONS_OPEN = false;
export const CURRENT_COHORT = 2;

// Cohort 1's rate was already published on the site; cohort 2's was supplied
// when applications closed.
export const COHORTS = [
  { number: 1, acceptanceRate: "18%" },
  { number: 2, acceptanceRate: "21%" },
];

// Where the lab aims its work, same list as the "Top-Tier or Nothing" card.
// Each links to the journal's own page; "IEEE" is unqualified on the site, so
// it points at the institute rather than guessing a specific transaction.
export const TARGET_VENUES = [
  { name: "PRA", href: "https://journals.aps.org/pra/" },
  { name: "PRX Quantum", href: "https://journals.aps.org/prxquantum/" },
  { name: "npj Quantum Information", href: "https://www.nature.com/npjqi/" },
  { name: "IEEE", href: "https://www.ieee.org/" },
];
