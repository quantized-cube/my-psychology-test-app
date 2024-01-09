import { NextRequest, NextResponse } from 'next/server';

const matcher = [
  '/test04',
  '/time-perspective',
]

export const config = {
  matcher: matcher,
};

export function middleware(req: NextRequest) {
  const basicAuth = req.headers.get('authorization');
  const url = req.nextUrl;

  if (!matcher.includes(url.pathname)) {
    return NextResponse.next();
  }

  if (basicAuth) {
    const auth = basicAuth.split(' ')[1];
    const [user, password] = Buffer.from(auth, 'base64').toString().split(':');

    switch (url.pathname) {
      case '/test04':
        if (user === process.env.BASIC_USER_NAME && password === process.env.BASIC_PASSWORD) {
          return NextResponse.next();
        }
        break;
      case '/time-perspective':
        if (user === process.env.TIME_PERSPECTIVE_USER_NAME && password === process.env.TIME_PERSPECTIVE_PASSWORD) {
          return NextResponse.next();
        }
        break;
    }
  }

  return new NextResponse('Auth required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Area"'
    }
  });
}