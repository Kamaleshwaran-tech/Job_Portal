import { createClerkClient } from '@clerk/express'
import User from '../models/User.js'

const clerkClient = createClerkClient({
    secretKey: process.env.CLERK_SECRET_KEY
})

const getFallbackName = (email = '') => email.split('@')[0] || 'User'

const buildName = (firstName, lastName, fallbackEmail) => {
    const fullName = [firstName, lastName].filter(Boolean).join(' ').trim()
    return fullName || getFallbackName(fallbackEmail)
}

const getPrimaryEmailFromBackendUser = (clerkUser) => {
    const primaryEmail = clerkUser.emailAddresses?.find(
        ({ id }) => id === clerkUser.primaryEmailAddressId
    )

    return primaryEmail?.emailAddress || clerkUser.emailAddresses?.[0]?.emailAddress || ''
}

const getPrimaryEmailFromWebhookUser = (clerkUser) => {
    const primaryEmail = clerkUser.email_addresses?.find(
        ({ id }) => id === clerkUser.primary_email_address_id
    )

    return primaryEmail?.email_address || clerkUser.email_addresses?.[0]?.email_address || ''
}

export const upsertUserFromClerkWebhook = async (clerkUser) => {
    const email = getPrimaryEmailFromWebhookUser(clerkUser)

    return User.findByIdAndUpdate(
        clerkUser.id,
        {
            _id: clerkUser.id,
            email,
            name: buildName(clerkUser.first_name, clerkUser.last_name, email),
            image: clerkUser.image_url || '',
            resume: ''
        },
        {
            upsert: true,
            new: true,
            setDefaultsOnInsert: true,
            runValidators: true
        }
    )
}

export const syncClerkUser = async (userId) => {
    if (!userId) {
        throw new Error('A Clerk user id is required to sync the user.')
    }

    const clerkUser = await clerkClient.users.getUser(userId)
    const email = getPrimaryEmailFromBackendUser(clerkUser)

    return User.findByIdAndUpdate(
        userId,
        {
            _id: userId,
            email,
            name: buildName(clerkUser.firstName, clerkUser.lastName, email),
            image: clerkUser.imageUrl || '',
            resume: ''
        },
        {
            upsert: true,
            new: true,
            setDefaultsOnInsert: true,
            runValidators: true
        }
    )
}
