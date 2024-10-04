module.exports = {
    "up": "CREATE TABLE events (id INT NOT NULL AUTO_INCREMENT, PRIMARY KEY id (id), name TEXT, total_tickets INT DEFAULT 0, booked_tickets INT DEFAULT 0, pending_tickets INT DEFAULT 0, event_ref TEXT, created_at DATE DEFAULT CURRENT_DATE())",
    "down": "DROP TABLE events"
}