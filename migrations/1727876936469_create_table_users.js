module.exports = {
   "up": "CREATE TABLE users (id INT NOT NULL AUTO_INCREMENT, PRIMARY KEY id (id), name TEXT, email TEXT, password TEXT)",
    "down": "DROP TABLE users"
}