import { verifyAuth } from "@/helper/auth-helper/verify";
import { adminAuth, adminDb } from "@/lib/firebase/admin";
import { error } from "console";
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


export async function PUT(request:NextRequest) {
    try {
      const user = await verifyAuth()
      if (!user) {
         return NextResponse.json(
          {error: "Unauthorize"},
          {status: 401}
         )
      }
      const updates = await request.json()
      const {id, ...updateData} = updates

      // add updated timestamps
      updateData.updatedAt = new Date()

      // update user in firebase 
      await adminDb.collection('users').doc(user.uid).update(updateData)

      // update display name in auth if changes 
      if(updateData.displayName) {
         await adminAuth.updateUser(user.uid, {
           displayName: updateData.displayName
         })
      }

      return NextResponse.json({ success: true})
    } catch (error: any) {
       console.error('Error updating profile:', error);
       return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
       
    }
}