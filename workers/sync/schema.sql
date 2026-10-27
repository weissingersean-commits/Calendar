CREATE TABLE IF NOT EXISTS state (
  fam TEXT PRIMARY KEY,      -- SHA-256 of the family sync code
  rev INTEGER NOT NULL,      -- bumps on every write (optimistic concurrency)
  data TEXT NOT NULL,        -- JSON: { "hl4_<key>": "<json string>", ... }
  updated INTEGER NOT NULL   -- ms since epoch
);

CREATE TABLE IF NOT EXISTS snapshots (
  fam TEXT NOT NULL,
  day TEXT NOT NULL,         -- YYYY-MM-DD (UTC); latest state of that day
  data TEXT NOT NULL,
  updated INTEGER NOT NULL,
  PRIMARY KEY (fam, day)
);
