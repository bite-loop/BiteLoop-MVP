import { adminAuth, adminDb } from "@/lib/firebase/admin";
import { UserProfile } from "firebase/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
      const {firstName, lastName, email, password} = await request.json()
      // Validate
    if (!email || !password || !firstName || !lastName) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters' },
        { status: 400 }
      );
    }
     // Create user in Firebase Auth
     const userRecord = await adminAuth.createUser({
         email,
         password,
         displayName: `${firstName} ${lastName}`
     });
     // create user in firestore
      const userProfile: Omit<UserProfile, 'id'> = {
      email,
      phone: '',
      displayName: `${firstName} ${lastName}`,
      savedAddresses: [],
      preferences: {
        dietaryRestrictions: [],
        spiceLevel: 'medium',
        favoriteCuisines: [],
        notificationEnabled: true,
        language: 'en',
      },
      loyaltyPoints: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await adminDb.collection('users').doc(userRecord.uid).set(userProfile)
    return NextResponse.json({
      success: true,
      message: 'Account created successfully',
      userId: userRecord.uid,
    });


    } catch (error:any) {
      console.error('Signup error:', error);
      if (error.code === 'auth/email-already-exists') {
      return NextResponse.json(
        { error: 'Email already exists' },
        { status: 409 }
      );
    }

     return NextResponse.json(
      { error: 'Failed to create account' },
      { status: 500 }
    );


    }
}