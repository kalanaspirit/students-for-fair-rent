import { Schema, model, Document } from 'npm:mongoose';

export interface UserType extends Document {
  firstName: string;
  lastName: string;
  emailAddress: string;
  upi: string;
  studentId: string;
  isAnonymous: boolean;
  isVerified: boolean;
  createdAt: Date;
  hallOfResidence:
    | "O'Rorke"
    | 'Grafton'
    | 'University Hall Towers'
    | 'Waiparuru'
    | 'Carlaw Park Stuart McCutcheon'
    | 'Carlaw Park Nicholls'
    | '55 Symonds'
    | 'Te Tirohanga o te Toangaroa';
}

const userSchema = new Schema<UserType>({
  firstName: {
    type: String,
    required: true,
    maxLength: 20,
    minLength: 2,
  },
  lastName: {
    type: String,
    required: true,
    maxLength: 20,
    minLength: 2,
  },
  emailAddress: {
    type: String,
    unique: true,
    maxLength: 72,
    minLength: 4,
    trim: true,
    lowercase: true,
    required: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please fill a valid email address',
    ],
  },
  upi: {
    type: String,
    required: true,
    unique: true,
  },
  studentId: {
    type: String,
    required: true,
    unique: true,
  },
  isAnonymous: {
    type: Boolean,
    required: true,
    default: false,
  },
  isVerified: {
    type: Boolean,
    required: true,
    default: false,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  hallOfResidence: {
    type: String,
    required: true,
    enum: [
      "O'Rorke",
      'Grafton',
      'University Hall Towers',
      'Waiparuru',
      'Carlaw Park Stuart McCutcheon',
      'Carlaw Park Nicholls',
      '55 Symonds',
      'Te Tirohanga o te Toangaroa',
    ],
  },
});

export const User = model<UserType>('User', userSchema);
