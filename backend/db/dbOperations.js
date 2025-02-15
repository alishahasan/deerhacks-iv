// backend/db/dbOperations.js
const pool = require('./config');

const dbOperations = {
  // Create a new user
  createUser: async (role) => {
    try {
      const result = await pool.query(
        'INSERT INTO users (role) VALUES ($1) RETURNING id',
        [role]
      );
      return result.rows[0];
    } catch (err) {
      console.error('Error creating user:', err);
      throw err;
    }
  },

  // Save student responses
  saveStudentResponses: async (userId, responses) => {
    try {
      await pool.query('BEGIN');
      
      for (const response of responses) {
        await pool.query(
          'INSERT INTO student_responses (user_id, question_number, answer_index, learning_preference) VALUES ($1, $2, $3, $4)',
          [userId, response.questionNumber, response.answerIndex, response.learningPreference]
        );
      }
      
      await pool.query('COMMIT');
      return true;
    } catch (err) {
      await pool.query('ROLLBACK');
      console.error('Error saving student responses:', err);
      throw err;
    }
  },

  // Save TA responses
  saveTAResponses: async (userId, responses) => {
    try {
      await pool.query('BEGIN');
      
      for (const response of responses) {
        await pool.query(
          'INSERT INTO ta_responses (user_id, question_number, answer_index, teaching_style) VALUES ($1, $2, $3, $4)',
          [userId, response.questionNumber, response.answerIndex, response.teachingStyle]
        );
      }
      
      await pool.query('COMMIT');
      return true;
    } catch (err) {
      await pool.query('ROLLBACK');
      console.error('Error saving TA responses:', err);
      throw err;
    }
  },

  // Find matches for a student
  findMatches: async (studentId) => {
    try {
      // Get student's learning preferences
      const studentPrefs = await pool.query(
        'SELECT DISTINCT learning_preference FROM student_responses WHERE user_id = $1',
        [studentId]
      );

      // Find TAs with matching teaching styles
      const matches = await pool.query(`
        SELECT DISTINCT 
          u.id as ta_id,
          COUNT(DISTINCT tr.teaching_style) as matching_styles
        FROM users u
        JOIN ta_responses tr ON u.id = tr.user_id
        WHERE u.role = 'ta'
        AND tr.teaching_style = ANY($1)
        GROUP BY u.id
        ORDER BY matching_styles DESC
      `, [studentPrefs.rows.map(p => p.learning_preference)]);

      return matches.rows;
    } catch (err) {
      console.error('Error finding matches:', err);
      throw err;
    }
  },

  // Save a match
  saveMatch: async (studentId, taId, compatibilityScore) => {
    try {
      const result = await pool.query(
        'INSERT INTO matches (student_id, ta_id, compatibility_score) VALUES ($1, $2, $3) RETURNING *',
        [studentId, taId, compatibilityScore]
      );
      return result.rows[0];
    } catch (err) {
      console.error('Error saving match:', err);
      throw err;
    }
  },

  // Get user's responses
  getResponses: async (userId, role) => {
    try {
      const table = role === 'student' ? 'student_responses' : 'ta_responses';
      const result = await pool.query(
        `SELECT * FROM ${table} WHERE user_id = $1 ORDER BY question_number`,
        [userId]
      );
      return result.rows;
    } catch (err) {
      console.error('Error getting responses:', err);
      throw err;
    }
  }
};

module.exports = dbOperations;