const asyncHandler = require('express-async-handler')
const Note = require('../models/notesModel')
const getNotes = asyncHandler( async (req,res)=>{
  const notes = await Note.find({user:req.user._id})
  res.json(notes)
})
const createNotes = asyncHandler( async (req,res)=>{
  const {title,content,category} = req.body
  if(!title || !content || !category){
    res.status(400)
    throw new Error('please fill all the field')
  }else{
    const note = new Note({user:req.user._id,title,content,category})
    const createdNote = await note.save()
    res.status(201).json(createdNote)
  }
})
const getNoteById = asyncHandler(async (req,res)=>{
  const note = await Note.findById(req.params.id)
  if(note){
    res.json(note)
  }else{
    res.status(404).json({message:'note not found'})
  }

})

const updateNote = asyncHandler(async (req,res)=>{
  const {title,content,category}  = req.body
  const note = await Note.findById(req.params.id)
  if(note.user.toString() !== req.user._id.toString()){
    res.status(401)
    throw new Error('you cant perform this action')
  }

  if(note){
    note.title = title;
    note.content =content;
    note.category = category

    const updateNote = await note.save()
    res.json(updateNote)
  }else{
    res.status(404)
    throw new Error('note not found')
  }
})

// const deleteNote = asyncHandler(async (req, res) => {
//   const note = await Note.findById(req.params.id);
//   if (note.user.toString() !== req.user._id.toString()) {
//     res.status(401);
//     throw new Error('You cannot perform this action');
//   }
//   if (note) {
//     await note.remove();
//     res.json({ message: 'Note removed' });
//   } else {
//     res.status(404);
//     throw new Error('Note not found');
//   }
// });


// const deleteNote = asyncHandler(async (req,res)=>{
//    const note = await Note.findById(req.params.id)
//    if(note.user.toString() !== req.user._id.toString()){
//     res.status(401)
//     throw new Error('you cant perform this action')
//    }
//    if(note){
//     await note.remove()
//     res.json({message:'note remove'})
//    }else{
//     res.status(404)
//     throw new Error('not not found')
//    }
// })

const deleteNote = asyncHandler(async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      // If the note doesn't exist, return an error
      res.status(404);
      throw new Error('Note not found');
    }

    if (note.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('You cannot perform this action');
    }

    // await note.remove(); //! when this fail i used .deleteOne()
    await note.deleteOne();
    res.json({ message: 'Note removed' });
  } catch (error) {
  
    res.status(500).json({ error: error.message });
  }
});


module.exports= {getNotes,createNotes,getNoteById,updateNote ,deleteNote}