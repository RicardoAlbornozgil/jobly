"use strict";
/** Database setup for jobly. */

const { createClient } = require("@supabase/supabase-js");
const { getDatabaseUri, SUPABASE_URL, SUPABASE_ANON_KEY } = require("./config");

let db;

if (process.env.NODE_ENV === "production") {
  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  // Create a wrapper function to mimic the `query` method
  db = {
    query: async (text, params) => {
      const { data, error } = await supabase.rpc(text, params);
      if (error) {
        throw error;
      }
      return { rows: data };
    }
  };
} else {
  const { Client } = require("pg");
  db = new Client({
    connectionString: getDatabaseUri(),
  });
  db.connect();
}

module.exports = db;
