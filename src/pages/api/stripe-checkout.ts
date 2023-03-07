import { NextApiRequest, NextApiResponse } from 'next'
import { stripe } from '~/services/stripe'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const priceId = req.body.priceId

  if (!priceId) return res.status(400).json({ error: 'Price ID is required' })

  if (req.method !== 'POST')
    return res.status(405).json({ error: 'Method not allowed' })

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${process.env.NEXT_PUBLIC_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/`,
  })

  res.status(200).json({ sessionUrl: checkoutSession.url })
}
