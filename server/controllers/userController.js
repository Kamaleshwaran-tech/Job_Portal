import JobApplication from "../models/JobApplication.js"
import User from "../models/User.js"
import Job from "../models/Job.js"
import {v2 as cloudinary} from 'cloudinary'
import { syncClerkUser } from "../utils/syncClerkUser.js"

const getOrSyncUser = async (userId) => {
    let user = await User.findById(userId)

    if (!user) {
        user = await syncClerkUser(userId)
    }

    return user
}


//get user data
export const getUserData = async(req,res) =>{

    const userId = req.auth?.userId
    if (!userId) {
        return res.json({ success: false, message: 'Unauthorized' })
    }

    try {
        
        const user = await getOrSyncUser(userId)

        if(!user){
            return res.json({ success:false, message:'User not found.'})
        }

        res.json({success:true,user})
    } catch (error) {
        res.json({success:false, message:error.message})
    }
}


//apply for job

export const applyForJob = async(req,res) =>{

    const {jobId} = req.body

    const userId = req.auth?.userId
    if (!userId) {
        return res.json({ success: false, message: 'Unauthorized' })
    }

    try {

        const userData = await getOrSyncUser(userId)
        if (!userData) {
            return res.json({ success: false, message: 'User not found.' })
        }

        if (!userData.resume) {
            return res.json({ success: false, message: 'Please upload your resume before applying.' })
        }
        
        const isAlreadyApplied = await JobApplication.find({jobId,userId})

        if(isAlreadyApplied.length >0){
            return res.json({success:false, message:'Already Applied'})
        }

        const jobData = await Job.findById(jobId)

        if(!jobData){
            return res.json({success:false , message:'Job Not Found'})
        }
        await JobApplication.create({
            companyId: jobData.companyId,
            userId,
            jobId,
            date:Date.now() 
        })

        res.json({success:true , message:'Applied Success'})

    } catch (error) {
        res.json({success:false, message:error.message})
    }


}

//get user applied application
export const getUserJobApplications = async(req,res) =>{

    try {

        const userId = req.auth?.userId
        if (!userId) {
            return res.json({ success: false, message: 'Unauthorized' })
        }

        await getOrSyncUser(userId)

        const applications = await JobApplication.find({userId})
        .populate('companyId','name email image')
        .populate('jobId','title description location category level salary')
        .exec()

        if(!applications){
            return res.json({success:false ,message:'No job application founded'})
        }

        return res.json({success:true, applications})

    } catch (error) {
        res.json({success:false, message:error.message})
        
    }

}

//update user profile(resume)
export const updateuserResume = async(req,res) =>{

    try {
        
        const userId = req.auth?.userId
        if (!userId) {
            return res.json({ success: false, message: 'Unauthorized' })
        }

        const resumeFile = req.file

        const userData = await getOrSyncUser(userId)
        if (!userData) {
            return res.json({ success: false, message: 'User not found.' })
        }

        if(resumeFile){
            const resumeUpload = await cloudinary.uploader.upload(resumeFile.path)
            userData.resume = resumeUpload.secure_url 
        } else {
            return res.json({ success: false, message: 'Resume file is required' })
        }

        await userData.save()

        res.json({success:true, message:'Resume updated'})

    } catch (error) {

        res.json({success:false, message:error.message})
        
    }

}
