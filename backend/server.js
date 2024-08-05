import express from 'express';
import cors from 'cors';
import pool from './db.js'; 

const app = express();
const PORT = 3000;

app.use(cors("*"));
app.use(express.json());

// Define a route handler for the root URL
app.get('/', (req, res) => {
  res.send('Welcome to the backend server!');
});

// Define the login route handler
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password]);
    connection.release();

    if (rows.length > 0) {
      // Login successful
      res.status(200).json({ message: 'Login successful' });
    } else {
      // Incorrect credentials
      res.status(401).json({ message: 'Incorrect email or password' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Define the register route handler
app.post('/register', async (req, res) => {
  const { fullName, idNumber, mobileContact, age, location, role, maritalStatus } = req.body;

  try {
    const connection = await pool.getConnection();

    // Check if the user already exists
    const [existingUser] = await connection.query('SELECT * FROM members WHERE id_number = ?', [idNumber]);

    if (existingUser.length > 0) {
      connection.release();
      return res.status(409).json({ message: 'User already exists' });
    }

    const sql = `
      INSERT INTO members (full_name, id_number, contact_number, age, location, role, marital_status)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    await connection.query(sql, [fullName, idNumber, mobileContact, age, location, role, maritalStatus]);
    connection.release();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error inserting data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Define the fetch-member route handler
app.get('/fetch-member', async (req, res) => {
  const { ID_number } = req.query;

  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query('SELECT * FROM members WHERE id_number = ?', [ID_number]);
    connection.release();

    if (rows.length > 0) {
      // Member found
      res.status(200).json(rows[0]);
    } else {
      // Member not found
      res.status(404).json({ message: 'Member does not exist' });
    }
  } catch (error) {
    console.error('Error fetching member:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Start the server
app.listen(PORT, async () => {
  try {
    await pool.getConnection(); // Test database connection
    console.log(`Backend Server is running on: http://localhost:${PORT}`);
    console.log('Connected to MySQL databases');
  } catch (error) {
    console.error('Unable to connect to MySQL:', error);
  }
});
