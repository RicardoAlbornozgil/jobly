"use strict";

const { createClient } = require("@supabase/supabase-js");
const { SUPABASE_URL, SUPABASE_ANON_KEY } = require("./config");

// Initialize Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Function to check connection
async function checkConnection() {
  try {
    const { data, error } = await supabase
      .from('users') // Replace 'users' with your actual table name
      .select('*')
      .limit(1);

    if (error) throw error;
    
    console.log('Connection successful:', data);
  } catch (err) {
    console.error('Connection error:', err.message);
  }
}

// Call the function to check connection
checkConnection();

module.exports = supabase;
