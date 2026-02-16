import { Session2 } from "@/types/auth/auth.types";
import { CreateSession } from "@/utils/session";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Session2;
    const user = body?.user;
    const accessToken = body?.accessToken;
    const refreshToken = body?.refreshToken;

    if (!user?.id || !accessToken || !refreshToken) {
      return NextResponse.json(
        { success: false, message: "Missing user/tokens in request body" },
        { status: 400 }
      );
    }

    await CreateSession({
      user: {
        id: String(user.id),
        username: user?.username ?? "",
        full_name: user?.full_name ?? "",
        email: user?.email ?? "",
        role: user?.role,
        extra_data: {
          dob: user?.extra_data?.dob || "",
          phone_number: user?.extra_data?.phone_number || "",
        },
        referral_code: user?.referral_code ?? "",
      },
      accessToken,
      refreshToken,
    });

    return NextResponse.json(
      { success: true, message: "Session creation successful" },
      { status: 201 }
    );
  } catch (e: any) {
    return NextResponse.json(
      { success: false, message: e?.message || "Server error" },
      { status: 500 }
    );
  }
}
