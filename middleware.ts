import { NextRequest, NextResponse } from 'next/server';

export const config = {
  matcher: [
    '/test04'
  ],
};

export function middleware(req: NextRequest) {
  const basicAuth = req.headers.get('authorization');
  const url = req.nextUrl;

  if (basicAuth) {
    const auth = basicAuth.split(' ')[1];
    const [user, password] = Buffer.from(auth, 'base64').toString().split(':');

    if (url.pathname === '/test04' && user === process.env.BASIC_USER_NAME && password === process.env.BASIC_PASSWORD) {
      return NextResponse.next();
    }
  }

  return new NextResponse('Auth required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Area"'
    }
  });
}