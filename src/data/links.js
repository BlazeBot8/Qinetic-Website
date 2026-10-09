// Applications are rolling. Google Form for applicants.
export const APPLY_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSeB6F1iNPnECqlABwebfAEzDYQhAhxb4BWQom3C4O3OJmG1dA/viewform?usp=dialog";

// Where the lab aims its work, same list as the "Top-Tier or Nothing" card.
// Each links to the journal's own page; "IEEE" is unqualified on the site, so
// it points at the institute rather than guessing a specific transaction.
export const TARGET_VENUES = [
  { name: "PRA", href: "https://journals.aps.org/pra/" },
  { name: "PRX Quantum", href: "https://journals.aps.org/prxquantum/" },
  { name: "npj Quantum Information", href: "https://www.nature.com/npjqi/" },
  { name: "IEEE", href: "https://www.ieee.org/" },
];
