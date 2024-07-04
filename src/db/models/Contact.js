import { Schema, model } from 'mongoose';
import { typeEmail, typeList } from '../../constants/contacts-constans.js';
import { mongooseSaveError, setUpdateSetting } from './hooks.js';

export const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      match: typeEmail,
    },
    isFavourite: {
      type: Boolean,
      default: false,
    },
    contactType: {
      type: String,
      enum: typeList,
      required: true,
      default: 'personal',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

contactSchema.post('save', mongooseSaveError);

contactSchema.pre('findOneAndUpdate', setUpdateSetting);
contactSchema.post('findOneAndUpdate', mongooseSaveError);

export const Contact = model('contacts', contactSchema);
