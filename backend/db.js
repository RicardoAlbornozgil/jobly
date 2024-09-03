"use strict";
/** Database setup for Jobly. */

const { createClient } = require("@supabase/supabase-js");
const { getDatabaseUri, SUPABASE_URL, SUPABASE_ANON_KEY } = require("./config");
const { Client } = require("pg");

let db;

if (process.env.NODE_ENV === "production") {
  // Connect to Supabase in production
  db = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
} else {
  // Connect to PostgreSQL locally for development and testing
  db = new Client({
    connectionString: getDatabaseUri(),
  });
  db.connect();
}

module.exports = db;
