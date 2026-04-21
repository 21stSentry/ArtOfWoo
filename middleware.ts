const USER_ENV = 'EVENT_OPS_BASIC_AUTH_USER'
const PASSWORD_ENV = 'EVENT_OPS_BASIC_AUTH_PASSWORD'

function unauthorized() {
  return new Response('Authentication required.', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Event Ops"',
      'Cache-Control': 'no-store',
    },
  })
}

export const config = {
  matcher: ['/event-ops', '/event-ops/:path*'],
}

export default function middleware(request: Request) {
  const expectedUser = process.env.EVENT_OPS_BASIC_AUTH_USER
  const expectedPassword = process.env.EVENT_OPS_BASIC_AUTH_PASSWORD

  if (!expectedUser || !expectedPassword) {
    return new Response(
      `Missing ${USER_ENV} or ${PASSWORD_ENV} environment variable.`,
      {
        status: 500,
        headers: {
          'Cache-Control': 'no-store',
        },
      },
    )
  }

  const authorization = request.headers.get('authorization')
  if (!authorization?.startsWith('Basic ')) {
    return unauthorized()
  }

  let decoded = ''
  try {
    decoded = atob(authorization.slice(6))
  } catch {
    return unauthorized()
  }

  const separatorIndex = decoded.indexOf(':')
  if (separatorIndex === -1) {
    return unauthorized()
  }

  const user = decoded.slice(0, separatorIndex)
  const password = decoded.slice(separatorIndex + 1)

  if (user !== expectedUser || password !== expectedPassword) {
    return unauthorized()
  }

  return fetch(request)
}
