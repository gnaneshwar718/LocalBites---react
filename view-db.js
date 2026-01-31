import sqlite3 from 'sqlite3';
import { resolve } from 'path';
import { STATIC_PATHS } from './constants.js';

const dbPath = resolve(STATIC_PATHS.DATABASE);
const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READONLY, (err) => {
    if (err) {
        console.error('Error opening database. It might not exist yet.', err.message);
        process.exit(1);
    }
});

db.all("SELECT * FROM users", [], (err, rows) => {
    if (err) {
        throw err;
    }
    console.log("Users found:", rows.length);
    console.table(rows);
    db.close();
});