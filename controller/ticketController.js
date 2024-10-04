const { resData } = require('../response/resData')
const { validateBookTicket, validateCancelTicket } = require('../validation/ticket')
const { generateRandom } = require('../helpers/generator')
const mysqlDatabase  = require('../database/mySqlDatabase')








const ticketController = {


    
    cancelTicket: async (req, res) => {
        const { error } = validateCancelTicket(req.body);
        if(error){
            return res.status(403).send(resData(false, false, "Validation Error", error.message, null, null))
        }

        try{

            const { username, event_ref } = req.body
            const filterQuery = [event_ref, username, 1]

           let newQuery = await mysqlDatabase.connection.beginTransaction().then(result => {
               return mysqlDatabase.query('SELECT * FROM booked_tickets WHERE event_ref = ? AND username = ? AND status = ?', filterQuery).then(
                    result => {
                        let databaseRes = {
                            status: true,
                            soldOut: false,
                            message: ''
                        }

                        if(result.length <= 0){
                            databaseRes.message = "user booked ticket not found"
                            databaseRes.status = false;
                        }else{

                            let event = result[0];
                            //// cancel ticket /////
                            let cancelQuery = [0, event_ref, username]
                            mysqlDatabase.query("UPDATE booked_tickets SET status = ? WHERE event_ref = ? AND username = ?", cancelQuery)
                        

                            /// check users on waiting list ///
                            let waitingUsersQuery = [event_ref]
                            mysqlDatabase.query('SELECT * FROM waiting_users WHERE event_ref = ?', waitingUsersQuery).then(waitingUser => {
                                
                                if(waitingUser.length <= 0){
                                    /// update event data ////
                                    mysqlDatabase.query('SELECT * FROM events WHERE event_ref = ?', waitingUsersQuery).then(eventRes => {
                                        let booked_tickets = eventRes.booked_tickets - 1;
                                        let pending_tickets = eventRes.pending_tickets + 1;
                                        let updateQuery = [booked_tickets, pending_tickets, event_ref]
                                        mysqlDatabase.query("UPDATE events SET booked_tickets = ?, pending_tickets = ? WHERE event_ref = ?", updateQuery)
                                        databaseRes.message = "Ticket cancelled"
                                    })

                                }else{
                                    /// assign first user to the event ///
                                    let waitingUserData = waitingUser[0]
                                    let insertWaitingUserQuery = [waitingUserData.username, event_ref]
                                    let deleteWaitingUserQuery = [waitingUserData.username, event_ref]

                                    mysqlDatabase.query('INSERT INTO booked_tickets (username, event_ref) VALUES (?, ?)', insertWaitingUserQuery)
                                    mysqlDatabase.query('DELETE INTO waiting_users WHERE username = ? AND event_ref = ?', deleteWaitingUserQuery)
                                    databaseRes.message = "Ticket cancelled, new user assigned to the event successfully"
                                }
                            })


                            mysqlDatabase.connection.commit()

                    }

                    return databaseRes;

                    }
                ).catch((error) => {
                    mysqlDatabase.connection.rollback();
                    throw error;
                });
            }).catch((error) => {
                throw error
            })

            return res.status(200).send(resData(true, true, newQuery.message, newQuery, null, null))

        }catch(error){
            return res.status(200).send(resData(false, false, "Server Error", error, null, null))

        }
    },




    bookTicket: async (req, res) => {
        const { error } = validateBookTicket(req.body);
        if(error){
            return res.status(403).send(resData(false, false, "Validation Error", error.message, null, null))
        }

        try{

            const { username, event_ref } = req.body
            const filterQuery = [event_ref]

           let newQuery = await mysqlDatabase.connection.beginTransaction().then(result => {
               return mysqlDatabase.query('SELECT * FROM events WHERE event_ref = ?', filterQuery).then(
                    result => {
                        let databaseRes = {
                            status: true,
                            soldOut: false,
                            message: ''
                        }

                        if(result.length <= 0){
                            databaseRes.message = "event not found"
                            databaseRes.status = false;
                        }else{

                        let event = result[0];
                        if(event.pending_tickets == 0){
                            let insertQuery = [username, event_ref]
                            mysqlDatabase.query('INSERT INTO waiting_users (username, event_ref) VALUES (?, ?)', insertQuery)

                            databaseRes.soldOut = true;
                            databaseRes.message = "Ticket sold out, you have been logged in to the waiting list"                            
                        }else{
                            let booked_tickets = event.booked_tickets + 1;
                            let pending_tickets = event.pending_tickets - 1;
                            let updateQuery = [booked_tickets, pending_tickets, event_ref]
                            let insertQuery = [username, event_ref]

                            let filterBookedUser = [event_ref, username]

                            mysqlDatabase.query('SELECT * FROM booked_tickets WHERE event_ref = ? AND username = ?', filterBookedUser).then(bookedUser => {
                                
                                if(bookedUser.length <= 0){
                                    mysqlDatabase.query("UPDATE events SET booked_tickets = ?, pending_tickets = ? WHERE event_ref = ?", updateQuery)
                                    mysqlDatabase.query('INSERT INTO booked_tickets (username, event_ref) VALUES (?, ?)', insertQuery)
                                    
                                    databaseRes.message = "Ticket booked successfully"

                                }else{
                                    databaseRes.message = "user has already bought ticket on this event"
                                }
                            })

                        }
                        mysqlDatabase.connection.commit()

                    }

                    return databaseRes;

                    }
                ).catch((error) => {
                    mysqlDatabase.connection.rollback();
                    throw error;
                });
            }).catch((error) => {
                throw error
            })

            return res.status(200).send(resData(true, true, newQuery.message, newQuery, null, null))

        }catch(error){
            return res.status(200).send(resData(false, false, "Server Error", error, null, null))

        }
    },


    getAllTickets: async (req, res) => {
        try{
            return res.status(200).send(resData(true, true, "All ticket fetched successfully", [], null, null))

        }catch(error){
            return res.status(200).send(resData(false, false, "Server Error", error, null, null))

        }
    },


}

module.exports = ticketController


