// import jwt from 'jsonwebtoken'
// import Company from '../models/Company.js'

// export const protectCompany = async(req,res,next) =>{

//     const token = req.header.token

//     if(!token){
//         return res.json({success:false,message:'Not authorized, Login Again.'})
//     }
//     try{
//         const decoded = jwt.verify(token,process.env.JWT_SECRET)

//         req.company = await Company.findById(decoded.id).select('-password')

//         next()

//     }catch(error){
//         res.json({success:false, message:error.message})
//     }
// }

import jwt from 'jsonwebtoken'
import { getAuth } from '@clerk/express'
import Company from '../models/Company.js'

export const protectCompany = async (req, res, next) => {
    const authHeader = req.get('Authorization')
    const token = authHeader?.startsWith('Bearer ')
        ? authHeader.split(' ')[1]
        : req.get('token')

    if (!token) {
        return res.json({ success: false, message: 'Not authorized, Login Again.' })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const company = await Company.findById(decoded.id).select('-password')

        if (!company) {
            return res.json({ success: false, message: 'Company not found, Login Again.' })
        }

        req.company = company
        next()
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}

export const protectUser = (req, res, next) => {
    const auth = getAuth(req)

    if (!auth?.userId) {
        return res.status(401).json({ success: false, message: 'Unauthorized' })
    }

    req.auth = auth
    next()
}
