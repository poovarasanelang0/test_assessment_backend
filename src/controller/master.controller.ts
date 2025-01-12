import {validationResult} from "express-validator";
import {clientError, errorMessage} from "../helper/ErrorMessage";
import {response} from "../helper/commonResponseHandler";
import { Master,MasterDocument } from "../models/master.model";
import * as TokenManager from "../utils/tokenManager";
import {encrypt,decrypt,hashPassword} from "../helper/Encryption"

var activity = "Masters";

/**
 * @author Balaji Murahari
 * @date   27-10-2023
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to save masters
 */
export let saveMasters = async (req,res,next)=>{
    const errors = validationResult(req);
    if(errors.isEmpty()){
        try {
            const mastersData = await Master.findOne({ $and:[{ isDeleted:false},{email:req.body.email}]});
            if(!mastersData){
                req.body.password = await encrypt(req.body.password)
                const masterDetails: MasterDocument = req.body;
                masterDetails.createdOn = new Date();
                masterDetails.createdBy = masterDetails.name
                let date = new Date();
                // masterDetails.date = date?.getDate();
                // masterDetails.month = date?.getMonth() + 1;
                // masterDetails.year = date?.getFullYear()
                const createData = new Master(masterDetails);
                let insertData = await createData.save();
                const token = await TokenManager.CreateJWTToken({
                    id: insertData["_id"],
                    name: insertData["name"],
                });
                const result = {}
                result['_id'] = insertData._id
                result['masterName'] = insertData.name;
                let finalResult = {};
                finalResult["loginType"] = 'master';
                finalResult["masterDetails"] = result;
                finalResult["token"] = token;
                response(req, res, activity, 'Level-2', 'Save-master', true, 200, finalResult, clientError.success.registerSuccessfully);
            }
            else {
                response(req, res, activity, 'Level-3', 'Save-master', true, 422, {}, 'Email already registered');
            }
 
        } catch (err: any) {
            response(req, res, activity, 'Level-3', 'Save-master', false, 500, {}, errorMessage.internalServer, err.message);
        }
    } else {
        response(req, res, activity, 'Level-3', 'Save-master', false, 422, {}, errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
    }
};
 