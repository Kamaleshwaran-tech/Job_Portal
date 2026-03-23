import Company from "../models/Company.js";
import {v2 as cloudinary  } from 'cloudinary'
import bcrypt from 'bcrypt'
import generateToken from "../utils/generateToken.js";
import Job from "../models/Job.js";
import JobApplication from "../models/JobApplication.js";

//register a new company
export const registerCompany =  async(req,res) =>{

    const {name, email, password} = req.body

    const imageFile = req.file;
    const normalizedEmail = email?.trim().toLowerCase()

    if(!name || !normalizedEmail || !password || !imageFile){
        return res.json({success:false,message:"Missing details"})
    }

    try{

        const companyExists = await Company.findOne({email: normalizedEmail})

        if(companyExists){
            return res.json({success:false , message:'Company already registered'})
        }

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password,salt)

        const imageUpload = await cloudinary.uploader.upload(imageFile.path)

        const company = await Company.create({
            name,
            email: normalizedEmail,
            password: hashPassword,
            image: imageUpload.secure_url
        })

        res.json({
            success:true,
            company: {
                _id: company._id,
                name: company.name,
                email: company.email,
                image: company.image
            },
            token: generateToken(company._id)
        })

    }catch (error){
        res.json({success:false, message: error.message })

    }

}

//company login
export const loginCompany = async(req,res) => {

    const {email, password} = req.body
    const normalizedEmail = email?.trim().toLowerCase()

    try{

        if(!normalizedEmail || !password){
            return res.json({success:false, message:'Email and password are required'})
        }

        const company = await Company.findOne({email: normalizedEmail})

        if(!company){
            return res.json({success:false, message:'Invalid email or password'})
        }

        const isPasswordValid = await bcrypt.compare(password, company.password)
        const isLegacyPlainTextPassword = company.password === password

        if(isPasswordValid || isLegacyPlainTextPassword){
            if(isLegacyPlainTextPassword){
                const salt = await bcrypt.genSalt(10)
                company.password = await bcrypt.hash(password, salt)
                await company.save()
            }

            res.json({
                success: true,
                company:{
                     _id: company._id,
                    name: company.name,
                    email: company.email,
                    image: company.image
                },
                token: generateToken(company._id)
            })
        }
        else{
            res.json({success:false, message:'Invalid email or password'})
        }

    }catch(error){
        res.json({success:false , message: error.message})

    }


}

// get company data
export const getCompanyData = async(req,res) => {

    

    try{
        const company = req.company
        res.json({success:true, company})
    }catch(error){

        res.json({
            success:false, message:error.message
        })
    }

}

//post a new job
export const postJob = async(req,res) => {

    const {title,description,location,salary,level,category} = req.body

    const companyId = req.company._id

    // console.log(companyId,{title,description, location,salary})

    try{
        const newJob = new Job({
            title,
            description,
            location,
            salary,
            companyId,
            date:Date.now(),
            level,
            category
        })

        await newJob.save()

        res.json({success:true , newJob})


    }catch(error){
        res.json({success:false, message:error.message})

    }


}

//get company job applicanta
export const getCompanyJobApplicants = async(req,res) => {
    try {
        const companyId = req.company._id

        const applications = await JobApplication.find({ companyId })
            .populate('jobId', 'title location category level')
            .populate('userId', 'name email image resume')
            .sort({ date: -1 })
            .lean()

        const applicants = applications.filter((application) => application.jobId && application.userId)

        res.json({ success: true, applicants })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }

}

//get company posted jobs
export const getCompanyPostedJobs = async(req,res) => {

    try{

        const companyId= req.company._id 

        const jobs = await Job.find({companyId})

        //(todo) Adding no of applicants info in data

        const jobsData = await Promise.all(jobs.map(async (job) =>{
            const applicants = await JobApplication.countDocuments({jobId: job._id})
            return {...job.toObject(),applicants}
        }))

        res.json({success:true, jobsData})
   }catch(error){
    res.json({success:false, message: error.message})
   }

}

//change job applications status
export const ChangeJobApplicationsStatus = async(req,res) => {
    try {
        const { id, status } = req.body
        const companyId = req.company._id

        if (!id || !status) {
            return res.json({ success: false, message: 'Application id and status are required' })
        }

        if (!['Pending', 'Accepted', 'Rejected'].includes(status)) {
            return res.json({ success: false, message: 'Invalid status value' })
        }

        const application = await JobApplication.findById(id)
        if (!application) {
            return res.json({ success: false, message: 'Application not found' })
        }

        if (application.companyId.toString() !== companyId.toString()) {
            return res.json({ success: false, message: 'Not authorized for this application' })
        }

        application.status = status
        await application.save()

        res.json({ success: true, message: `Application ${status.toLowerCase()}` })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }

}

//change job visibility
export const changeVisibility  = async(req,res) => {

    try {
        
        const {id} = req.body
        const companyId = req.company._id

        const job =  await Job.findById(id)
        if (!job) {
            return res.json({ success: false, message: 'Job not found' })
        }

        if(companyId.toString() === job.companyId.toString()){
            job.visible = !job.visible
        } else {
            return res.json({ success: false, message: 'Not authorized for this job' })
        }

        await job.save()

        res.json({success:true, job})
    } catch (error) {
        res.json({success:false,message:error.message})
    }

}
