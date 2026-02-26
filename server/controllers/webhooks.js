import { Webhook } from 'svix'
import User from '../models/User.js'

export const clerkWebhooks = async (req, res) => {
  try {
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
        await User.findByIdAndUpdate(
          data.id,
          {
            _id: data.id,
            email: data.email_addresses?.[0]?.email_address ?? '',
            name: `${data.first_name ?? ''} ${data.last_name ?? ''}`.trim(),
            image: data.image_url ?? '',
            resume: '',
          },
          { upsert: true, new: true, setDefaultsOnInsert: true }
        )
        return res.status(200).json({ ok: true })
      }

      case 'user.updated': {
        await User.findByIdAndUpdate(data.id, {
          email: data.email_addresses?.[0]?.email_address ?? '',
          name: `${data.first_name ?? ''} ${data.last_name ?? ''}`.trim(),
          image: data.image_url ?? '',
        })
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
    console.error('Webhook error:', error.message)
    return res.status(400).json({ success: false, message: 'Webhook Error' })
  }
}
