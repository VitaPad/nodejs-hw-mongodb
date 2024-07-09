import { Schema, model } from 'mongoose';
import { mongooseSaveError, setUpdateSetting } from './hooks.js';
import { emailRegexp } from '../../constants/user-constans.js';

export const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: emailRegexp,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

userSchema.post('save', mongooseSaveError);

userSchema.pre('findOneAndUpdate', setUpdateSetting);
userSchema.post('findOneAndUpdate', mongooseSaveError);

export const User = model('user', userSchema);
