const express = require('express');
const app = express();
const notes = require('./data/note');
const dotenv = require('dotenv').config();
const cors = require('cors');
const connectDb = require('./config/db')
const {notFound,errorHandler } = require('./middleware/errorMiddleware')
const userRoutes = require('./routes/userRoutes')
const noteRoutes = require('./routes/noteRoutes')
connectDb()
app.use(cors());
app.use(express.json())
const PORT = process.env.PORT || 5000
app.get('/',(req,res)=>{
  res.send('api running ')
  console.log(req.headers.authorization)
})
app.get('/api/notes',(req,res)=>{
  res.send(notes)

})
app.get('/api/notes/:id',(req,res)=>{
  const note = notes.find((note)=> note._id === req.params.id)
   res.send(note)
})
app.get('/api/user',(req,res)=>{
  res.json({mes:'hello'})
})
app.use('/api/user',userRoutes)
app.use('/api/note',noteRoutes)
app.use(notFound)
app.use(errorHandler)


app.listen(PORT,console.log(`start listening to port ${PORT}`))