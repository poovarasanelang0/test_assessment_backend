
import { Result, ResultDocument } from '../models/result.model';
import { validationResult } from 'express-validator'
import { response } from '../helper/commonResponseHandler'
import { clientError, errorMessage } from '../helper/ErrorMessage'


var activity = "Result";

// Controller function to save answers
export let createResult = async (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
      try {
          // Check if a Result with the same title already exists for the same university
          const existingResult = await Result.findOne({
              courseName: req.body.courseName,
              userName: req.body.userName
          });

          if (!existingResult) {
              const ResultDetails: ResultDocument = req.body;

             

              
              const newResult = new Result(ResultDetails);
              let insertedData = await newResult.save();

              // Respond with success
              response(req, res, activity, 'Level-2', 'Create-Result', true, 200, insertedData, clientError.success.savedSuccessfully);
          } else {
              // Respond with error if Result title is already registered for the same university
              response(req, res, activity, 'Level-3', 'Create-Result', true, 422, {}, 'Result Title Already Registered For Same University');
          }
      } catch (err: any) {
          console.log(err);
          response(req, res, activity, 'Level-3', 'Create-Result', false, 500, {}, errorMessage.internalServer, err.message);
      }
  } else {
      response(req, res, activity, 'Level-3', 'Create-Result', false, 422, {}, errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
  }
};



