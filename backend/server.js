app.post('/login', async (req, res) => {
    const { email, password, role } = req.body;
    
    try {
      // Select appropriate table based on role
      const tableName = role === 'student' ? 'student_logins' : 'ta_logins';
      
      // Query to check if credentials exist in the database
      const query = {
        text: `SELECT id FROM ${tableName} WHERE email = $1 AND password = $2`,
        values: [email, password]
      };
  
      const result = await pool.query(query);
  
      if (result.rows.length > 0) {
        // Valid credentials found
        res.json({
          success: true,
          userId: result.rows[0].id
        });
      } else {
        // No matching credentials found
        res.json({
          success: false
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  });