import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  applyCors(req, res)

  if (req.method === 'OPTIONS') {
    return res.status(204).end()
  }

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
      body: JSON.stringify({ email_address: email }),
    })

    const data = await response.json().catch(() => null)
    if (!response.ok) {
      const error = normalizeError(data)
      return res.status(response.status).json({ error })
    }

    return res.status(200).json({ ok: true })
  } catch {
    return res.status(502).json({ error: 'Unable to reach mailing list provider.' })
  }
}

function normalizeError(data: unknown): string {
  if (!data) return 'Subscription failed.'
  if (typeof data === 'string') return data
  if (typeof data !== 'object') return 'Subscription failed.'

  const record = data as Record<string, unknown>
  if (typeof record.detail === 'string') return record.detail
  if (typeof record.error === 'string') return record.error
  if (Array.isArray(record.error) && record.error.length > 0) {
    const first = record.error[0]
    if (typeof first === 'string') return first
    if (first && typeof first === 'object' && 'msg' in first && typeof (first as { msg?: unknown }).msg === 'string') {
      return (first as { msg: string }).msg
    }
  }

  return 'Subscription failed.'
}

function applyCors(req: VercelRequest, res: VercelResponse) {
  const allowedOrigins = new Set([
    'https://www.artofwoo.org',
    'https://artofwoo.org',
    'https://www.michaeldevin.com',
    'https://michaeldevin.com',
  ])

  const origin = req.headers.origin
  if (origin && allowedOrigins.has(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin)
  }

  res.setHeader('Vary', 'Origin')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept')
}
