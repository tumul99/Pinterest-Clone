const mongoose = require('mongoose');
const plm = require('passport-local-mongoose');

const dbURL = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/pinterestclone";

mongoose.connect(dbURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  fullname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  dp: { type: String },
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }]
}, { timestamps: true });

userSchema.plugin(plm);

module.exports = mongoose.model('Users', userSchema);


userSchema.plugin(plm);
module.exports=mongoose.model('Users', userSchema);
