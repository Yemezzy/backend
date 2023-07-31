import mongoose  from "mongoose";

const connect = async ()=>{
    const URI =  process.env.MONGODB_URI as string
    console.log('connecting  to db ....')
    try {
        mongoose.connect(URI).then(()=>{
            console.log('connected ')
        })

        const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});
    } catch (error) {
        console.log(error)
    }

}

export default connect

