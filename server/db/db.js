const pgp = require('pg-promise')();

const config = {
    connectionString: process.env.DATABASE_URL,
    max: 30,
    ssl:{rejectUnauthorized: false}
 };
 var db = pgp(config);

db.none('CREATE TABLE IF NOT EXISTS bugs  (id SERIAL PRIMARY KEY,  assigned_to VARCHAR(100), bug_name VARCHAR(100) UNIQUE,  created_by VARCHAR(100),  deadline VARCHAR(100),  hours_worked VARCHAR(100),  percent_complete VARCHAR(100),  severity VARCHAR(100),  status VARCHAR(100),  summary VARCHAR(100),  time_estimate VARCHAR(100),  version VARCHAR(100),  created_on DATE NOT NULL);');
db.none('CREATE TABLE IF NOT EXISTS users  (id SERIAL PRIMARY KEY,  email VARCHAR(100) UNIQUE,  name VARCHAR(100),  password VARCHAR(100), created_on DATE NOT NULL);');
db.none('CREATE TABLE IF NOT EXISTS projects_users  (id SERIAL PRIMARY KEY,  project_id SERIAL REFERENCES projects (id), user_id SERIAL REFERENCES users (id), created_on DATE NOT NULL);');
db.none('CREATE TABLE IF NOT EXISTS projects  (id SERIAL PRIMARY KEY,  name VARCHAR(100), image_name VARCHAR(100), version VARCHAR(100),  created_on DATE NOT NULL);');

module.exports = db;
