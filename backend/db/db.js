const mongoose=require('mongoose');

const db=async ()=>{
    try{
        mongoose.set("strictQuery",false);
        await mongoose.connect(process.env.MONGO_URL);
        console.log("DATABASE CONNECTION SUCCESS");
    }catch(error){
        console.log("DB CONNECTION ERROR");
    }
}
module.exports={db}