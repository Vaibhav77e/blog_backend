const mongoose = require('mongoose');


const mongooseConnect=()=>{
    mongoose.connect(process.env.DB_WEB_URI).then(con=>{
        console.log(`Mongodb dataBase with host : ${con.connection.host}`);
    }).catch(error=>{
        console.log(err);
    })
}

module.exports = mongooseConnect;