// backend/services/userService.js

const supabase = require("../supabaseClient");

async function getUserData(userId) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId);

  if (error) {
    throw new Error(`Error fetching user data: ${error.message}`);
  }

  return data;
}

module.exports = {
  getUserData,
};
