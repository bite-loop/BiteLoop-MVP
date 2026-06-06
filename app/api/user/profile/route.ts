import { verifyAuth } from "@/helper/auth-helper/verify";
import { adminAuth, adminDb } from "@/lib/firebase/admin";
import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
      const user = await verifyAuth()
      if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      const userDoc = await adminDb.collection('users').doc(user.uid).get()
      if(!userDoc.exists) {
         return NextResponse.json({ error: 'User not found' }, { status: 404 });
       }
       return NextResponse.json({
          id: userDoc.id,
          ...userDoc.data()
       });
    } catch (error) {
      return NextResponse.json(
        { error: 'Failed to fetch profile' },
        {status: 500}
      )
    }
}