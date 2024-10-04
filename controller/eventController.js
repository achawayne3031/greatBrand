const { resData } = require('../response/resData')
const { validateCreateEvent } = require('../validation/event')
const { generateRandom } = require('../helpers/generator')
const mysqlDatabase  = require('../database/mySqlDatabase')




const eventController = {

    getEvent: async (req, res) => {
    
       try{
            const { event } = req.params
            const selectQuery = [event]

            let databaseResData = await mysqlDatabase.query('SELECT * FROM events WHERE id = ?', selectQuery).then(async eventData => {
                let databaseRes = {
                    status: true,
                    message: '',
                    data: null
                }
               
                if(eventData.length <= 0){
                    databaseRes.message = "Event not found"
                }else{
                    databaseRes.message = "Event fetched successfully"
                    let currentData = eventData[0]
                    let waitingUserQuery = [currentData.event_ref]
                    let databaseResData = await mysqlDatabase.query('SELECT * FROM waiting_users WHERE event_ref = ?', waitingUserQuery)

                    databaseRes.data = currentData
                    databaseRes.data.waitingList = databaseResData
                }

                return databaseRes
            }).catch((error) => {
                throw error
            })

            return res.status(200).send(resData(true, true, databaseResData.message, databaseResData, null, null))

        }catch(error){
            return res.status(404).send(resData(false, false, "Server Error", error, null, null))
        }
    },

    createEvent: async (req, res) => {
        const { error } = validateCreateEvent(req.body);
        if(error){
            return res.status(403).send(resData(false, false, "Validation Error", error.message, null, null))
        }

       try{

            const { name, total } = req.body
            const insertValues = [name, total, total, generateRandom(20)]

           let mysqlDataRes = await mysqlDatabase.connection.beginTransaction().then(result => {

                let databaseRes = {
                    status: true,
                    message: ''
                }

                let existQuery = [name]
               return mysqlDatabase.query('SELECT * FROM events WHERE name = ?', existQuery).then(eventData => {
                    if(eventData.length <= 0){
                        mysqlDatabase.query('INSERT INTO events (name, total_tickets, pending_tickets, event_ref) VALUES (?, ?, ?, ?)', insertValues).then(
                            result => {
                                databaseRes.message = "Event created successfully"

                                mysqlDatabase.connection.commit()

                            }
                        ).catch((error) => {
                            mysqlDatabase.connection.rollback();
                            throw error;
                        });
                    }else{
                        databaseRes.message = "event has already been added to the system"
                    }

                    return databaseRes

                })


            }).catch((error) => {
                throw error
            })
            
            return res.status(200).send(resData(true, true, mysqlDataRes.message, mysqlDataRes, null, null))

        }catch(error){
            return res.status(404).send(resData(false, false, "Server Error", error, null, null))
        }
    },


}

module.exports = eventController


