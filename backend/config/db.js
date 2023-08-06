const mongoose = require('mongoose')


const connectDb = async ()=>{
    try{
                const conn =await mongoose.connect(process.env.MOONGO_URL,{
                     useUnifiedTopology: true,
                     useNewUrlParser: true,
               
                })
                console.log(`mongodb connection ${conn.connection.host}`)
    }catch(err){
        console.log(err)
      
    }
}


module.exports = connectDb