import mongoose from "mongoose";

export const connection = async()=>
{
    await mongoose.connect(process.env.MONGO_URI ,{
        dbName: "MERN_AUTHENTICATION"

    }).then(()=>
    {
        console.log("connected to database");   
    }).catch(err => {
        console.log(`some errors occured while connecting to database ${err}`);
    })
};



