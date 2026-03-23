import { Webhook } from 'svix'
import User from '../models/User.js'
import { upsertUserFromClerkWebhook } from '../utils/syncClerkUser.js'

export const clerkWebhooks = async (req, res) => {
  try {
    if (!process.env.CLERK_WEBHOOK_SECRET) {
      throw new Error('Missing CLERK_WEBHOOK_SECRET')
    }

    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)

    const payload = req.body.toString('utf8')
    const headers = {
      'svix-id': req.headers['svix-id'],
      'svix-timestamp': req.headers['svix-timestamp'],
      'svix-signature': req.headers['svix-signature'],
    }

    const event = whook.verify(payload, headers)
    const { data, type } = event

    switch (type) {
      case 'user.created': {
        await upsertUserFromClerkWebhook(data)
        return res.status(200).json({ ok: true })
      }

      case 'user.updated': {
        await upsertUserFromClerkWebhook(data)
        return res.status(200).json({ ok: true })
      }

      case 'user.deleted': {
        await User.findByIdAndDelete(data.id)
        return res.status(200).json({ ok: true })
      }

      default:
        return res.status(200).json({ ok: true })
    }
  } catch (error) {
    console.error('Webhook error:', {
      message: error.message,
      stack: error.stack
    })
    return res.status(400).json({ success: false, message: error.message })
  }
}
