module.exports = {
   "up": "CREATE TABLE booked_tickets (id INT NOT NULL AUTO_INCREMENT, PRIMARY KEY id (id), username TEXT,  event_ref TEXT, status INT DEFAULT 1 created_at DATE DEFAULT CURRENT_DATE())",
    "down": "DROP TABLE booked_tickets"
}