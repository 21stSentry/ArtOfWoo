import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { email } = req.body
  if (!email || typeof email !== 'string') {
    return res.status(400).json({ error: 'Email required' })
  }

  if (!process.env.BUTTONDOWN_API_KEY) {
    return res.status(500).json({ error: 'Mailing list is not configured.' })
  }

  try {
    const response = await fetch('https://api.buttondown.email/v1/subscribers', {
      method: 'POST',
      headers: {
        'Authorization': `Token ${process.env.BUTTONDOWN_API_KEY}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ email }),
    })

    const data = await response.json().catch(() => null)
    if (!response.ok) {
      const error =
        data?.detail ||
        data?.email?.[0] ||
        data?.error ||
        'Subscription failed.'
      return res.status(response.status).json({ error })
    }

    return res.status(200).json({ ok: true })
  } catch {
    return res.status(502).json({ error: 'Unable to reach mailing list provider.' })
  }
}
