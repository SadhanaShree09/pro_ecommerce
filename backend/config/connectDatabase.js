const mongoose = require('mongoose');
const connectDatabase = () =>{
    return mongoose.connect(process.env.DB_URL).then((con)=>{
        console.log('Database connected to host : '+con.connection.host);
    }).catch((error) => {
        console.error('Database connection failed:', error.message);
        process.exitCode = 1;
    });
};
module.exports = connectDatabase;