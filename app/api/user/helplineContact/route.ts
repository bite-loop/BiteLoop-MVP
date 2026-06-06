// app/api/support/helpline/route.ts
import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase/admin";

export async function POST(request: NextRequest) {
  try {
    const { name, email, issue, msg, userId } = await request.json();
    
    // Validate
    if (!name || !email || !msg) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    // Create support message in Firestore
    const supportMessage = {
      name,
      email,
      issue: issue || "General Inquiry",
      message: msg,
      userId: userId || null,
      status: "pending",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Save to Firestore
    const docRef = await adminDb.collection("support_messages").add(supportMessage);
    
    return NextResponse.json({
      success: true,
      message: "Support request sent successfully",
      ticketId: docRef.id,
    });

  } catch (error: any) {
    console.error("Support error:", error);
    return NextResponse.json(
      { error: "Failed to send support request" },
      { status: 500 }
    );
  }
}