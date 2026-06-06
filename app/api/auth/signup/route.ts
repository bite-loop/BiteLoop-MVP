import { adminAuth, adminDb } from "@/lib/firebase/admin";
import { NextRequest, NextResponse } from "next/server";
import { Timestamp } from "firebase-admin/firestore";
import { UserProfile } from "@/types/user";

export async function POST(request: NextRequest) {
    try {
      const { firstName, lastName, email, password } = await request.json();
      
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
      
      // Create user in Firestore - Use a plain object instead of UserProfile type
      const userProfile = {
        id: userRecord.uid,
        email: email,
        phone: '',
        displayName: `${firstName} ${lastName}`,
        photoURL: '',
        defaultAddress: null, // Use null instead of undefined
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

      await adminDb.collection('users').doc(userRecord.uid).set(userProfile);
      
      return NextResponse.json({
        success: true,
        message: 'Account created successfully',
        userId: userRecord.uid,
      });

    } catch (error: any) {
      console.error('Signup error:', error);
      
      // Log the full error for debugging
      console.log('Error details:', {
        code: error.code,
        message: error.message,
        stack: error.stack
      });
      
      if (error.code === 'auth/email-already-exists') {
        return NextResponse.json(
          { error: 'Email already exists' },
          { status: 409 }
        );
      }

      return NextResponse.json(
        { error: 'Failed to create account: ' + error.message },
        { status: 500 }
      );
    }
}