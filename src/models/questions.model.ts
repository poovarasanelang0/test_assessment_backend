import mongoose from 'mongoose';
import { Course } from './course.model';

export interface QuestionDocument extends mongoose.Document{
    _id?:any;
    courseName?:string;
    courseId?:any;
    video?:string;
    question?:string;
    answer?:string;
    option1?:string;
    option2?:string;
    option3?:string;
    option4?:string;
    isDeleted?: boolean;
    status?: number;
    modifiedOn?: Date;
    modifiedBy?: string;
    createdOn?: Date;
    createdBy?: string;

};

const questionSchema = new mongoose.Schema({
    _id:{type:mongoose.Types.ObjectId,required:true,auto:true},
    courseName:{type:String,required:true},
    question:{type:String,required:true},
    courseId:{type:mongoose.Types.ObjectId,required:true},
    video:{type:String,required:true},
    answer:{type:String,required:true},
    option1:{type:String,required:true},
    option2:{type:String,required:true},
    option3:{type:String,required:true},
    option4:{type:String,required:true},
    isDeleted: { type: Boolean, default: false },
    status: { type: Number, default: 1 },
    modifiedOn: { type: Date },
    modifiedBy: { type: String },
    createdOn: { type: Date },
    createdBy: { type: String }
});

export const Question = mongoose.model('Question',questionSchema);
