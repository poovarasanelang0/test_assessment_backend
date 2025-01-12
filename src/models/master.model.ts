import mongoose from 'mongoose';

export interface MasterDocument extends mongoose.Document{
    _id?:any;
    name?:string;
    email?:string;
    mobileNo?:number;
    companyName?:string;
    password?:string;
    isDeleted?: boolean;
    status?: number;
    modifiedOn?: Date;
    modifiedBy?: string;
    createdOn?: Date;
    createdBy?: string;

};

const masterSchema = new mongoose.Schema({
    _id:{type:mongoose.Types.ObjectId,required:true,auto:true},
    name:{type:String,required:true},
    email:{type:String,required:true},
    mobileNo:{type:Number,required:true},
    companyName:{type:String,required:true},
    password:{type:String,required:true},
    isDeleted: { type: Boolean, default: false },
    status: { type: Number, default: 1 },
    modifiedOn: { type: Date },
    modifiedBy: { type: String },
    createdOn: { type: Date },
    createdBy: { type: String }
});

export const Master = mongoose.model('Master',masterSchema);
