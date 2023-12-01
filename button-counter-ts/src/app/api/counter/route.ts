import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const COUNTER = "counter";

export async function GET(request: Request) {
  let counter = await prisma.setting
    .findUnique({
      where: {
        key: COUNTER,
      },
    })
    .catch((error) => {
      console.log(error);
      return error.message;
    });

  if (!counter) {
    counter = await prisma.setting.create({
      data: {
        createdAt: new Date(),
        updatedAt: new Date(),
        key: COUNTER,
        value: 0,
      },
    });
  }

  return NextResponse.json({ counter }, { status: 200 });
}

export async function POST(request: Request) {
  const body = await request.json();
  const decrement = body?.decrement ?? false;

  const counter = await prisma.setting
    .findUnique({
      where: {
        key: COUNTER,
      },
    })
    .catch((error) => {
      console.log(error);
      return error.message;
    });

  const updatedCounter = await prisma.setting
    .upsert({
      where: {
        key: COUNTER,
      },
      update: {
        value: decrement ? counter.value - 1 : counter.value + 1,
      },
      create: {
        createdAt: new Date(),
        updatedAt: new Date(),
        key: COUNTER,
        value: 0,
      },
    })
    .catch((error) => {
      console.log(error);
      return error.message;
    });

  return NextResponse.json({ counter: updatedCounter }, { status: 200 });
}
