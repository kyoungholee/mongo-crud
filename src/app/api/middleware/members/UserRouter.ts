import { Router } from 'express';
import {RegisterJWT} from '../../controllers/UserController'
const router = Router();


router.use('/signup', RegisterJWT);
// router.use('/login', UserController.logIn);

export default router;
 