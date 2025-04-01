const mysql = require('mysql2');
const bcrypt = require('bcryptjs');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'database'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connecté à MySQL');

    const adminEmail = 'admin@example.com';
    const adminPassword = 'admin123';
    const adminRole = 'admin';

    bcrypt.hash(adminPassword, 10, (err, hashedPassword) => {
        if (err) throw err;

        const sql = 'INSERT INTO users (email, password, role) VALUES (?, ?, ?)';
        db.execute(sql, [adminEmail, hashedPassword, adminRole], (err) => {
            if (err) throw err;
            console.log('Admin ajouté avec succès');
            db.end();
        });
    });
});
