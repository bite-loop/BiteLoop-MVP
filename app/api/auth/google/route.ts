import { adminAuth, adminDb } from "@/lib/firebase/admin";
import { UserProfile } from "@/types";
import { Timestamp } from "firebase-admin/firestore";
import { NextResponse } from "next/server";

interface Props {
    request: NextResponse
}
export async function POST({request}: Props) {
    try {
      const body = await request.json()
      const {idToken} = body
      if(!idToken) {
        return NextResponse.json(
        { error: 'Google token is required' },
        { status: 400 }
      );
      }
      //verify google token id
      const decodedToken = await adminAuth.verifyIdToken(idToken)
      const { uid, email, name, picture } = decodedToken

      const userDoc = await adminDb.collection('users').doc(uid).get()
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

    // create session 
    const response = NextResponse.json({
         success: true,
         message: "Google Login Successful",
         user: {
            id: uid,
            email,
            name,
            photoURL: picture,
         },
    });

      // Set session cookie
    response.cookies.set('session', idToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
    } catch (error) {
       console.error('Google auth error:', error);
    return NextResponse.json(
      { error: 'Google authentication failed' },
      { status: 500 }
    );
    }
}