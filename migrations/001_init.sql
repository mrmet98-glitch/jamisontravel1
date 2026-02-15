-- Family Travel Tracker schema (D1 / SQLite)

PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS travelers (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS bookings (
  id TEXT PRIMARY KEY,
  booking_type TEXT NOT NULL, -- oneway|roundtrip|multicity
  pnr TEXT NOT NULL DEFAULT '',
  class_main TEXT NOT NULL DEFAULT '',
  class_secondary TEXT,
  ticket_issue_date TEXT NOT NULL,
  ticket_end_date TEXT NOT NULL,
  cost_note TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS booking_travelers (
  booking_id TEXT NOT NULL,
  traveler_id TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active', -- active|canceled
  payment_type TEXT NOT NULL, -- cash|miles
  cash_usd REAL,
  miles_used REAL,
  fees_usd REAL,
  refund_method TEXT,
  refund_amount_usd REAL,
  refund_notes TEXT,
  canceled_at TEXT,
  PRIMARY KEY (booking_id, traveler_id),
  FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE CASCADE,
  FOREIGN KEY (traveler_id) REFERENCES travelers(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS legs (
  id TEXT PRIMARY KEY,
  booking_id TEXT NOT NULL,
  kind TEXT NOT NULL, -- outbound|return|leg
  label TEXT NOT NULL,
  sort_index INTEGER NOT NULL,
  FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS segments (
  id TEXT PRIMARY KEY,
  leg_id TEXT NOT NULL,
  sort_index INTEGER NOT NULL,
  flight_number TEXT NOT NULL DEFAULT '',
  airline TEXT NOT NULL DEFAULT '',
  dep_airport TEXT NOT NULL,
  arr_airport TEXT NOT NULL,
  dep_date TEXT NOT NULL,
  dep_time TEXT NOT NULL,
  arr_date TEXT NOT NULL,
  arr_time TEXT NOT NULL,
  FOREIGN KEY (leg_id) REFERENCES legs(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS layovers (
  id TEXT PRIMARY KEY,
  leg_id TEXT NOT NULL,
  between_index INTEGER NOT NULL,
  airport TEXT NOT NULL,
  minutes INTEGER NOT NULL,
  overridden INTEGER NOT NULL DEFAULT 0,
  FOREIGN KEY (leg_id) REFERENCES legs(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_legs_booking ON legs(booking_id, sort_index);
CREATE INDEX IF NOT EXISTS idx_segments_leg ON segments(leg_id, sort_index);
CREATE INDEX IF NOT EXISTS idx_bt_traveler ON booking_travelers(traveler_id);
