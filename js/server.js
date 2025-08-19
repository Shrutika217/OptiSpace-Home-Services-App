const express = require("express");
const mysql2 = require("mysql2");
const bodyParser = require("body-parser");
const bcrypt = require('bcryptjs');
const cors=require("cors");

const app = express();
const port = 3900;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.use(cors());
// Database connection
const db = mysql2.createConnection({
    host: "localhost",
    user: "root",        // Your MySQL username
    password: "shrutika21",        // Your MySQL password
    database: "optispace" // Your database name
});

db.connect(err => {
    if (err) throw err;
    console.log('Connected to MySQL Database!');
});

// Signup Route
app.post("/signup", (req, res) => {
    const data = req.body;
  
    // Hash the password
    // bcrypt.hash(password, 10, (err, hashedPassword) => {
    //     if (err) throw err;
    //     console.log("Hashed password:", hash);
  
      // Insert user into database
      const query = "INSERT INTO users (first_name, last_name, email, phone, address1, address2, state, city, pincode, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
      db.query(query, [
        data.firstName, data.lastName, data.email, data.phone, 
        data.address1, data.address2, data.state, data.city, 
        data.pincode, data.password
    ], (err) => {
        if (err) {
            console.error(err);
            res.status(500).json({ success: false, message: "Failed to save user." });
        } else {
            res.json({ success: true, message: "Sign-up successful!" });
        }
    });
    });
  // });

  // Login Route

app.post("/login", (req, res) => {
    const { email, password } = req.body;
  
    // Retrieve user from database
    const sql = "SELECT * FROM users WHERE email = ?";
    db.query(sql, [email], (err, results) => {
      if (err || results.length === 0) {
        return res.status(401).send("User not found");
      }
  
      const user = results[0];
  
      // Compare hashed password
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err || !isMatch) {
          return res.status(401).send("Invalid password");
        }
        res.status(200).send("Login successful!");
      });
    });
  });


// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});