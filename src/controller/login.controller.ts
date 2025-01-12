import { validationResult } from 'express-validator';
import { decrypt, encrypt } from '../helper/Encryption';
import { Master } from '../models/master.model';
import { User } from '../models/user.model';
import * as TokenManager from "../utils/tokenManager";
import { clientError, errorMessage } from '../helper/ErrorMessage';
import {   response } from '../helper/commonResponseHandler';

var activity = "Login";

export let loginEmail = async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        try {
            let { email, password } = req.body;
            const master = await Master.findOne({ $and: [{ email: email }, { isDeleted: false }] }, { email: 1, password: 1,name:1, status: 1 })
            const user = await User.findOne({ $and: [{ email: email }, { isDeleted: false }] }, { email: 1, password: 1,name:1, status: 1 })
            if (master) {
                const newHash = await decrypt(master["password"]);
                if (master["status"] === 2) {
                    response(req, res, activity, 'Level-3', 'Login-Email', false, 499, {}, clientError.account.inActive);
                } else if (newHash != password) {
                    response(req, res, activity, 'Level-3', 'Login-Email', false, 403, {}, "Invalid Password !");
                } else {
                    const token = await TokenManager.CreateJWTToken({
                        id: master["_id"],
                        name: master["name"],
                        loginType: 'master'
                    });
                    const details = {}
                    details['_id'] = master._id
                    details['email'] = master.email;
                    let finalResult = {};
                    finalResult["loginType"] = 'master';
                    finalResult["masterDetails"] = details;
                    finalResult["token"] = token;
                    response(req, res, activity, 'Level-2', 'Login-Email', true, 200, finalResult, clientError.success.loginSuccess);
                }
            }
            else if (user) {
                const newHash = await decrypt(user["password"]);
                if (user["status"] === 2) {
                    response(req, res, activity, 'Level-3', 'Login-Email', false, 499, {}, clientError.account.inActive);
                } else if (newHash != password) {
                    response(req, res, activity, 'Level-3', 'Login-Email', false, 403, {}, "Invalid Password !");
                } else {
                    const token = await TokenManager.CreateJWTToken({
                        id: user["_id"],
                        name: user["name"],
                        loginType: 'user'
                    });
                    const details = {}
                    details['_id'] = user._id
                    details['email'] = user.email;
                    let finalResult = {};
                    finalResult["loginType"] = 'user';
                    finalResult["userDetails"] = details;
                    finalResult["token"] = token;
                    response(req, res, activity, 'Level-2', 'Login-Email', true, 200, finalResult, clientError.success.loginSuccess);
                }
            }
            else {
                response(req, res, activity, 'Level-3', 'Login-Email', true, 422, {}, 'Invalid Email Id');
            }
        } catch (err: any) {
            response(req, res, activity, 'Level-3', 'Login-Email', false, 422, {}, errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
        }
    }
};