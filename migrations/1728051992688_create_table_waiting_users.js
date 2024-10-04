module.exports = {
     "up": "CREATE TABLE waiting_users (id INT NOT NULL AUTO_INCREMENT, PRIMARY KEY id (id), username TEXT, event_ref TEXT, created_at DATE DEFAULT CURRENT_DATE())",
    "down": "DROP TABLE waiting_users"
}