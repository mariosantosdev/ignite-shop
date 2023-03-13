import { NextApiRequest, NextApiResponse } from 'next'
import { stripe } from '~/services/stripe'

type Products = Array<{
  priceId: string
  quantity: number
}>

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const products = req.body.products as Products

  if (!products || products.length === 0)
    return res.status(400).json({ error: 'Products is required' })

  if (req.method !== 'POST')
    return res.status(405).json({ error: 'Method not allowed' })

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: products.map(({ priceId, quantity }) => ({
      price: priceId,
      quantity,
    })),
    success_url: `${process.env.NEXT_PUBLIC_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/`,
  })

  res.status(200).json({ sessionUrl: checkoutSession.url })
}
