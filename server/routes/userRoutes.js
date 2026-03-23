import express from 'express'
import { applyForJob, getUserData, getUserJobApplications, updateuserResume } from '../controllers/userController.js'
import upload from '../config/multer.js'
import { protectUser } from '../middleware/authMiddleware.js'

const router = express.Router()

router.use(protectUser)

//get user daata
router.get('/user',getUserData)

//apply for a job
router.post('/apply',applyForJob)

//get applied jobs data
router.get('/application' , getUserJobApplications)

//update usser profile (resume)
router.post('/update-resume',upload.single('resume'),updateuserResume)

export default router;
