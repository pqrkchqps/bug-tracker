const pgp = require('pg-promise')();

let config = {
    connectionString: process.env.DATABASE_URL,
    max: 30,
    ssl:{rejectUnauthorized: false}
 };

if (process.env.development){
    config = {
        connectionString: process.env.DATABASE_URL,
        max: 30,
        ssl: null
     };
}

 var db = pgp(config);

db.none('CREATE TABLE IF NOT EXISTS users  (id SERIAL PRIMARY KEY,  email VARCHAR(100) UNIQUE,  name VARCHAR(100),  password VARCHAR(100), created_on DATE NOT NULL);');
db.none('CREATE TABLE IF NOT EXISTS projects_users  (id SERIAL PRIMARY KEY,  project_id SERIAL REFERENCES projects (id), user_id SERIAL REFERENCES users (id), created_on DATE NOT NULL);');
db.none('CREATE TABLE IF NOT EXISTS projects  (id SERIAL PRIMARY KEY,  name VARCHAR(100), image_name VARCHAR(100), version VARCHAR(100),  created_on DATE NOT NULL);');

module.exports = db;
