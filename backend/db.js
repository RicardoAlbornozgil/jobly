"use strict";
/** Database setup for jobly. */

const { createClient } = require("@supabase/supabase-js");
const { getDatabaseUri, SUPABASE_URL, SUPABASE_ANON_KEY } = require("./config");

let db;

if (process.env.NODE_ENV === "production") {
  db = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
} else {
  const { Client } = require("pg");
  db = new Client({
    connectionString: getDatabaseUri(),
  });
  db.connect();
}

module.exports = db;
