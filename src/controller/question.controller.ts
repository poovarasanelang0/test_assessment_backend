
import { Question,QuestionDocument} from "../models/questions.model";
import {response,generate} from "../helper/commonResponseHandler";
import{errorMessage,clientError} from "../helper/ErrorMessage";
import{validationResult} from "express-validator";
import * as TokenManager from "../utils/tokenManager";


var activity = "Question";



export let saveCourse = async (req, res, next) => {
    const errors = validationResult(req);
    if(errors.isEmpty()){
        try{
            const createInvestors:QuestionDocument = req.body;
            const createData = new Question(createInvestors);
            const insertData = await createData.save();
            response(req,res,activity,'Level-2','Save-ContactUs',true,200,insertData,clientError.success.savedSuccessfully);
        } catch (err:any){
            response(req,res,activity,'Level-3','Save-ContactUs',false,500,{},errorMessage.internalServer, err.message);
        }
    }
    else{
        response(req, res, activity,  'Level-3','Save-ContactUs', false, 422, {}, errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
    }

}




export let getAllCourse = async(req,res,next)=>{
    try{

        const data = await Question.find({isDeleted:false})
        response(req,res,activity,'Level-1','GetAll-ContactUs',true,200,data,clientError.success.fetchedSuccessfully)
     }
     catch(err:any){
        response(req,res,activity,'Level-3','GetAll-ContactUs',false,500,{},errorMessage.internalServer,err.message)
    }
}


export let updateCourse = async (req,res,next)=>{
    try{
        const updateData : QuestionDocument = req.body;
        const updatedTerms = await Question.findByIdAndUpdate(
            {_id:req.body._id},{
            $set:{
               
                courseName:updateData.courseName,
                question:updateData.question,
                answer:updateData.answer,
                option1:updateData.option1,
                option2:updateData.option2,
                option3:updateData.option3,
                option4:updateData.option4
              
            }
         
            
        })
        response(req,res,activity,'Level-1','Update-ContactUs',true,200,updatedTerms,clientError.success.updateSuccess)
    }catch(err:any){
        response(req, res, activity,'Level-3','Update-ContactUs', false, 500, {}, errorMessage.internalServer, err.message)
    }
} 


   export let getSingleCourse = async (req, res, next) => {
    try {
        const userData = await Question.findById({_id:req.query._id})
        response(req,res,activity,'Level-1','Get-SingleUsers',true,200,userData,clientError.success.fetchedSuccessfully)
    } catch (err:any) {
        response(req, res, activity, 'Level-3', 'Get-SingleUsers', false, 500, {}, errorMessage.internalServer, err.message);
        
    }
}



export const getCourseProgram = async (req, res) => {
    try {

        const data = await Question.find({ courseId: req.query.courseId })

        response(req, res, activity, 'Level-1', 'GetSingle-Program', true, 200, data, clientError.success.fetchedSuccessfully)
    } catch (err: any) {
        response(req, res, activity, 'Level-1', 'GetSingle-Program', false, 500, {}, errorMessage.internalServer, err.message)
    }
}

export let deletedCourse = async (req, res, next) => {
    try {
        let id = req.query._id;
        let {modifiedBy,modifiedOn} = req.body;
        const usersData = await Question.findByIdAndUpdate({_id:id},
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
       if(req.body.courseName)
        {
          andList.push({ courseName: req.body.courseName })
        }
        if(req.body.question)
        {
          andList.push({ question: req.body.question })
        }
        if(req.body.answer)
        {
          andList.push({ answer: req.body.answer })
        }
        if(req.body.option1)
        {
          andList.push({ option1: req.body.option1 })
        }
        if(req.body.option2)
        {
          andList.push({ option2: req.body.option2 })
        }
        if(req.body.option3)
        {
          andList.push({ option3: req.body.option3 })
        }
        if(req.body.option4)
        {
          andList.push({ option4: req.body.option4 })
        }
       
        findQuery = (andList.length > 0) ? { $and: andList } : {}
        const userList = await Question.find(findQuery).sort({ createdOn: -1 }).limit(limit).skip(page)
        const userCount = await Question.find(findQuery).count();
        response(req, res, activity, 'Level-2', 'Get-FilterDeveloper', true, 200, {userList,userCount }, clientError.success.fetchedSuccessfully);
       }
       catch (err)
       {
       response(req, res, activity, 'Level-3', 'Get-FilterDeveloper', false, 500, {}, errorMessage.internalServer, err.message);
      }
    
    };
    