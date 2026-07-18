import OpenAI from "openai";
import { NextResponse } from "next/server";

export async function GET() {
    console.log(process.env.OPENAI_API_KEY)
  try {
    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const models = await client.models.list();

    return NextResponse.json({
      success: true,
      models: models.data.map((m:any) => m.id),
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        status: error.status,
      },
      { status: 500 }
    );
  }
}