// backend/db/config.js
require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  // Uses environment variables by default with these names
  // so we don't need to explicitly specify them
});

module.exports = pool;