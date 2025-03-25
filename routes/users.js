const mongoose= require('mongoose');
const plm=require('passport-local-mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/pinterestclone");
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  fullname: { type: String, required: true, },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  dp: { type: String, /* assuming the profile picture is stored as url*/ },
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }]
}, { timestamps: true });




userSchema.plugin(plm);
module.exports=mongoose.model('Users', userSchema);