// app/api/auth/google/route.ts
import { NextResponse, NextRequest } from 'next/server'; // Add NextRequest
import { adminAuth, adminDb } from '@/lib/firebase/admin';
import type { UserProfile } from '@/types/user';
import { Timestamp } from 'firebase-admin/firestore';

// Fix: Remove the destructuring, use plain request
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { idToken } = body;

    if (!idToken) {
      return NextResponse.json(
        { error: 'Google token is required' },
        { status: 400 }
      );
    }

    // Verify Google ID token
    const decodedToken = await adminAuth.verifyIdToken(idToken);
    const { uid, email, name, picture } = decodedToken;
    const expiresIn = 1000 * 60 * 60 * 24 * 7; // 7 days

  const sessionCookie = await adminAuth.createSessionCookie(
  idToken,
  { expiresIn }
);

    // Check if user exists in Firestore
    const userDoc = await adminDb.collection('users').doc(uid).get();

    if (!userDoc.exists) {
      // Create new user profile
      const userProfile: Omit<UserProfile, 'id'> = {
        email: email || '',
        phone: '',
        displayName: name || 'User',
        photoURL: picture || '',
        savedAddresses: [],
        preferences: {
          dietaryRestrictions: [],
          spiceLevel: 'medium',
          favoriteCuisines: [],
          notificationEnabled: true,
          language: 'en',
        },
        loyaltyPoints: 0,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      };

      await adminDb.collection('users').doc(uid).set(userProfile);
    }

    // Create session
    const response = NextResponse.json({
      success: true,
      message: 'Google login successful',
      user: {
        id: uid,
        email,
        name,
        photoURL: picture,
      },
    });

    // Set session cookie
   response.cookies.set('session', sessionCookie, {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  maxAge: 60 * 60 * 24 * 7,
  path: '/',
});

    return response;
  } catch (error: any) {
    console.error('Google auth error:', error);
    return NextResponse.json(
      { error: error.message || 'Google authentication failed' },
      { status: 500 }
    );
  }
} 