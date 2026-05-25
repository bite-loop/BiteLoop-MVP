// app/api/auth/login/route.ts
import { NextResponse } from 'next/server';
import { auth } from '@/lib/firebase/config';
import { signInWithEmailAndPassword } from 'firebase/auth';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Sign in with Firebase client SDK
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const token = await userCredential.user.getIdToken();

    // Set session cookie
    const response = NextResponse.json({
      success: true,
      message: 'Logged in successfully',
      user: {
        id: userCredential.user.uid,
        email: userCredential.user.email,
        name: userCredential.user.displayName,
      },
    });

    // Set cookie with token
    response.cookies.set('session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error: any) {
    console.error('Login error:', error);
    
    const errorMessages: Record<string, string> = {
      'auth/user-not-found': 'No account found with this email',
      'auth/wrong-password': 'Invalid password',
      'auth/invalid-email': 'Invalid email format',
      'auth/too-many-requests': 'Too many attempts. Please try again later',
    };

    return NextResponse.json(
      { error: errorMessages[error.code] || 'Login failed' },
      { status: 401 }
    );
  }
}