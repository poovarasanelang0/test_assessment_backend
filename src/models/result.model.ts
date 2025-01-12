import mongoose from 'mongoose';

export interface ResultDocument extends mongoose.Document {
  _id?: any;
 
  answers?: any[];
  isDeleted?: boolean;
  status?: number;
  modifiedOn?: Date;
  modifiedBy?: string;
  createdOn?: Date;
  createdBy?: string;
}

const ResultSchema = new mongoose.Schema(
  {
    _id: { type: mongoose.Types.ObjectId, required: true, auto: true },
    correctAnswers: { type: Number, default: 0 },
    totalQuestions: { type: Number, default: 0 },
    answers: [{
        questionId: {type: String,},
        question: {type: String, },
        selectedAnswer: {type: String,},
        correctAnswer: {type: String},
      }],
    isDeleted: { type: Boolean, default: false },
    status: { type: Number, default: 1 },
    modifiedOn: { type: Date },
    modifiedBy: { type: String },
    createdOn: { type: Date },
    createdBy: { type: String },
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
  }
);

export const Result = mongoose.model<ResultDocument>('Result', ResultSchema);
