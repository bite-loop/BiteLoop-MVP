import { adminAuth, adminDb } from "@/lib/firebase/admin";
import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server";

async function verifyAuth() {
    const cookieStore = cookies()
    const session = (await cookieStore).get('session')?.value
    
    if(!session) return null;
    try {
      const decodedToken = await adminAuth.verifyIdToken(session)
      return decodedToken
    } catch (error) {
      return null
    }
}
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