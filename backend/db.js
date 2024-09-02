"use strict";
/** Database setup for jobly. */
const { createClient } = require("@supabase/supabase-js");
const { getDatabaseUri, getSupabaseUrl, getSupabaseAnonKey } = require("./config");

let db;

if (process.env.NODE_ENV === "production") {
  db = createClient(getSupabaseUrl(), getSupabaseAnonKey());
} else {
  const { Client } = require("pg");
  db = new Client({
    connectionString: getDatabaseUri(),
  });
  db.connect();
}

module.exports = db;
