import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import { API_ROUTES, STATIC_PATHS, SERVER_DEFAULTS, STATUS_CODES, MESSAGES, SUPPORT_EMAIL, LOCAL_ORIGIN } from './constants.js';

const app = express();
const PORT = process.env.PORT || SERVER_DEFAULTS.PORT;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.resolve(__dirname, STATIC_PATHS.DATABASE);
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error connecting to database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
        db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            email TEXT UNIQUE,
            password TEXT
        )`);
    }
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get(API_ROUTES.CONFIG, (req, res) => {
    res.json({
        contactEmail: process.env.CONTACT_EMAIL || SUPPORT_EMAIL,
        googleMapsApiKey: (process.env.GOOGLE_MAPS_API_KEY || '').trim(),
    });
});

app.post(API_ROUTES.SIGNUP, (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(STATUS_CODES.BAD_REQUEST).json({ message: MESSAGES.FIELDS_REQUIRED });
    }
    const sql = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`;
    db.run(sql, [name, email, password], function (err) {
        if (err) {
            if (err.message.includes('UNIQUE constraint failed')) {
                return res.status(STATUS_CODES.BAD_REQUEST).json({ message: MESSAGES.USER_EXISTS });
            }
            return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: MESSAGES.SIGNUP_ERROR });
        }
        res.status(STATUS_CODES.CREATED).json({ message: MESSAGES.SIGNUP_SUCCESS, userId: this.lastID });
    });
});

app.post(API_ROUTES.SIGNIN, (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(STATUS_CODES.BAD_REQUEST).json({ message: MESSAGES.FIELDS_REQUIRED });
    }
    const sql = `SELECT * FROM users WHERE email = ? AND password = ?`;
    db.get(sql, [email, password], (err, row) => {
        if (err) {
            return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: MESSAGES.SIGNIN_ERROR });
        }
        if (row) {
            res.status(STATUS_CODES.OK).json({ message: MESSAGES.SIGNIN_SUCCESS, user: row });
        } else {
            res.status(STATUS_CODES.UNAUTHORIZED).json({ message: MESSAGES.INVALID_CREDENTIALS });
        }
    });
});

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, STATIC_PATHS.FRONTEND_DIST)));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, STATIC_PATHS.FRONTEND_DIST, STATIC_PATHS.INDEX_HTML));
    });
}

app.listen(PORT, () => {
    console.log(`Server running at ${LOCAL_ORIGIN}:${PORT}`);
});
