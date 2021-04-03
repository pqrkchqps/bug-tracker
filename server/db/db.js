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
db.none('CREATE TABLE IF NOT EXISTS projects_users  (id SERIAL PRIMARY KEY,  project_id SERIAL REFERENCES projects (id), user_id SERIAL REFERENCES users (id), created_by_id SERIAL REFERENCES users (id),'
+'delete_project BOOLEAN NOT NULL, edit_project_page BOOLEAN NOT NULL, add_users BOOLEAN NOT NULL, remove_users BOOLEAN NOT NULL, edit_users BOOLEAN NOT NULL, edit_own_users BOOLEAN NOT NULL, add_bugs BOOLEAN NOT NULL, remove_bugs BOOLEAN NOT NULL, edit_bugs BOOLEAN NOT NULL, edit_own_bugs BOOLEAN NOT NULL, created_on DATE NOT NULL);');
db.none('CREATE TABLE IF NOT EXISTS projects  (id SERIAL PRIMARY KEY,  name VARCHAR(100), image_name VARCHAR(100), version VARCHAR(100),  created_on DATE NOT NULL);');

module.exports = db;
