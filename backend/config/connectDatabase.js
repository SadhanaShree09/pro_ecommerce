const mongoose = require('mongoose');
let connectionPromise;

const connectDatabase = () =>{
    if (mongoose.connection.readyState === 1) {
        return Promise.resolve(mongoose.connection);
    }

    if (!connectionPromise) {
        connectionPromise = mongoose.connect(process.env.DB_URL).then((con)=>{
        console.log('Database connected to host : '+con.connection.host);
            return con.connection;
        }).catch((error) => {
            connectionPromise = undefined;
            throw error;
        });
    }

    return connectionPromise;
};
module.exports = connectDatabase;