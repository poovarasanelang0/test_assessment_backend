import {validationResult} from "express-validator";
import {clientError, errorMessage} from "../helper/ErrorMessage";
import {response} from "../helper/commonResponseHandler";
import { User,UserDocument } from "../models/user.model";
import * as TokenManager from "../utils/tokenManager";
import {encrypt,decrypt,hashPassword} from "../helper/Encryption"

var activity = "Users";


export let saveUsers = async (req,res,next)=>{
    const errors = validationResult(req);
    if(errors.isEmpty()){
        try {
            const UsersData = await User.findOne({ $and:[{ isDeleted:false},{email:req.body.email}]});
            if(!UsersData){
                req.body.password = await encrypt(req.body.password)
                const UserDetails: UserDocument = req.body;
                UserDetails.createdOn = new Date();
                UserDetails.createdBy = UserDetails.name
                let date = new Date();
                // UserDetails.date = date?.getDate();
                // UserDetails.month = date?.getMonth() + 1;
                // UserDetails.year = date?.getFullYear()
                const createData = new User(UserDetails);
                let insertData = await createData.save();
                const token = await TokenManager.CreateJWTToken({
                    id: insertData["_id"],
                    name: insertData["name"],
                });
                const result = {}
                result['_id'] = insertData._id
                result['UserName'] = insertData.name;
                let finalResult = {};
                finalResult["loginType"] = 'User';
                finalResult["UserDetails"] = result;
                finalResult["token"] = token;
                response(req, res, activity, 'Level-2', 'Save-User', true, 200, finalResult, clientError.success.registerSuccessfully);
            }
            else {
                response(req, res, activity, 'Level-3', 'Save-User', true, 422, {}, 'Email already registered');
            }
 
        } catch (err: any) {
            response(req, res, activity, 'Level-3', 'Save-User', false, 500, {}, errorMessage.internalServer, err.message);
        }
    } else {
        response(req, res, activity, 'Level-3', 'Save-User', false, 422, {}, errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
    }
};
 

export let getAllCourse = async(req,res,next)=>{
    try{

        const data = await User.find({isDeleted:false})
        response(req,res,activity,'Level-1','GetAll-ContactUs',true,200,data,clientError.success.fetchedSuccessfully)
     }
     catch(err:any){
        response(req,res,activity,'Level-3','GetAll-ContactUs',false,500,{},errorMessage.internalServer,err.message)
    }
}


export let updateCourse = async (req,res,next)=>{
    try{
        const updateData : UserDocument = req.body;
        const updatedTerms = await User.findByIdAndUpdate(
            {_id:req.body._id},{
            $set:{
               
        name:updateData.name,
               
              
            }
         
            
        })
        response(req,res,activity,'Level-1','Update-ContactUs',true,200,updatedTerms,clientError.success.updateSuccess)
    }catch(err:any){
        response(req, res, activity,'Level-3','Update-ContactUs', false, 500, {}, errorMessage.internalServer, err.message)
    }
} 


   export let getSingleCourse = async (req, res, next) => {
    try {
        const userData = await User.findById({_id:req.query._id})
        response(req,res,activity,'Level-1','Get-SingleUsers',true,200,userData,clientError.success.fetchedSuccessfully)
    } catch (err:any) {
        response(req, res, activity, 'Level-3', 'Get-SingleUsers', false, 500, {}, errorMessage.internalServer, err.message);
        
    }
}



export let deletedCourse = async (req, res, next) => {
    try {
        let id = req.query._id;
        let {modifiedBy,modifiedOn} = req.body;
        const usersData = await User.findByIdAndUpdate({_id:id},
            {$set:{isDeleted:true,
             modifiedBy:modifiedBy,
             modifiedOn:modifiedOn
    }});
    response(req, res, activity, 'Level-2', 'Delete-Users', true, 200, usersData, clientError.success.deleteSuccess);
    } catch (error: any) {
        response(req, res, activity, 'Level-3', 'Delete-Users', false, 500, {}, errorMessage.internalServer, error.message);
    }
}


export let getFilterCourse = async (req, res, next) => {
    try {
           var findQuery;
           var andList: any = [];
           var limit = req.body.limit ? req.body.limit : 0;
           var page = req.body.page ? req.body.page : 0;
           andList.push({ isDeleted: false })
           andList.push({ status: 1 })
           andList.push({ user: req.body.loginId })
       if(req.body.name)
        {
          andList.push({ name: req.body.name })
        }
        if(req.body.email)
        {
          andList.push({ email: req.body.email })
        }
        if(req.body.password)
        {
          andList.push({ password: req.body.password })
        }
        if(req.body.mobileNo)
        {
          andList.push({ mobileNo: req.body.mobileNo })
        }
        
       
        findQuery = (andList.length > 0) ? { $and: andList } : {}
        const userList = await User.find(findQuery).sort({ createdOn: -1 }).limit(limit).skip(page)
        const userCount = await User.find(findQuery).count();
        response(req, res, activity, 'Level-2', 'Get-FilterDeveloper', true, 200, {userList,userCount }, clientError.success.fetchedSuccessfully);
       }
       catch (err)
       {
       response(req, res, activity, 'Level-3', 'Get-FilterDeveloper', false, 500, {}, errorMessage.internalServer, err.message);
      }
    
    };