import { NextResponse } from "next/server";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase/config";
import { adminAuth } from "@/lib/firebase/admin";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    // Get Firebase ID token
    const idToken = await userCredential.user.getIdToken();

    // Create Firebase Session Cookie
    const expiresIn = 1000 * 60 * 60 * 24 * 7; // 7 days

    const sessionCookie = await adminAuth.createSessionCookie(
      idToken,
      { expiresIn }
    );

    const response = NextResponse.json({
      success: true,
      message: "Logged in successfully",
      user: {
        id: userCredential.user.uid,
        email: userCredential.user.email,
        name: userCredential.user.displayName,
      },
    });

    // Store session cookie
    response.cookies.set("session", sessionCookie, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return response;
  } catch (error: any) {
    console.error("Login error:", error);

    const errorMessages: Record<string, string> = {
      "auth/user-not-found": "No account found with this email",
      "auth/wrong-password": "Invalid password",
      "auth/invalid-email": "Invalid email format",
      "auth/too-many-requests":
        "Too many attempts. Please try again later",
    };

    return NextResponse.json(
      {
        error: errorMessages[error.code] || "Login failed",
      },
      { status: 401 }
    );
  }
}