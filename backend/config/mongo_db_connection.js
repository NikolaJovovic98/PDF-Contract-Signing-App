import mongoose from 'mongoose';

const connect_to_db = () =>{
    return new Promise((resolve,reject)=>{
        try {
            resolve(
                mongoose.connect(process.env.DB_CONNECTION,{useNewUrlParser:true,useUnifiedTopology:true})
            );
        } catch (error) {
            console.log("Not able to connect to database.");
            reject({msg:error.message});
        }
    });
};

export default connect_to_db;