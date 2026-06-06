import { adminAuth } from "@/lib/firebase/admin";
import { cookies } from "next/headers";


export async function verifyAuth() {
    const cookieStore = cookies()
    const session = (await cookieStore).get('session')?.value
    console.log("SESSION EXISTS:", !!session);
    
    if(!session) return null;
    try {
      const decodedToken = await adminAuth.verifyIdToken(session)
       console.log("TOKEN VERIFIED:", decodedToken.uid);
      return decodedToken
    } catch (error) {
      console.error("VERIFY ERROR:", error);
      return null
    }
}