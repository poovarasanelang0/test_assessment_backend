import {Router} from 'express';
import { saveMasters } from '../controller/master.controller';
import { checkQuery,checkRequestBodyParams } from '../middleware/Validators';
import { basicAuthUser } from '../middleware/checkAuth';
import { checkSession } from '../utils/tokenManager';
const router:Router=Router();

router.post('/', //create masters
basicAuthUser,
checkRequestBodyParams('email'),
saveMasters
)

export default router;