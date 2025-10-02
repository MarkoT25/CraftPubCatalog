import mongoose from 'mongoose';


const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    match: [/.+@.+\..+/, 'Please enter a valid email address']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  favorites: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Beer' }
  ],
  cart: [
    {
      beer: { type: mongoose.Schema.Types.ObjectId, ref: 'Beer' },
      qty: { type: Number, default: 1 }
    }
  ]
}, { timestamps: true });


const User = mongoose.model("User", UserSchema);

export default User;