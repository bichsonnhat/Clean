import prisma from "@/lib/db";
import { NextResponse } from "next/server";
import { ServiceTypeSchema } from "./service-types.schema";
import z from "zod";
import { Prisma } from "@prisma/client";
import { stat } from "fs";

export async function GET() {
  try {
    const services = await prisma.serviceType.findMany({
      include: {
        category: {
          select: { name: true },
        },
      },
    });
    return NextResponse.json(services);
  } catch (error) {
    console.error("Error fetching services:", error);
    return NextResponse.json(
      { error: "Failed to fetch services" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const serviceCategory = await prisma.serviceCategory.findUnique({
      where: { id: data.categoryId },
    });

    if (!serviceCategory) {
      return NextResponse.json(
        { error: `Service Category not found`, status: "error" },
        { status: 404 }
      );
    }

    if (data.basePrice < 0) {
      return NextResponse.json(
        { error: `Base price cannot be negative`, status: "error" },
        { status: 400 }
      );
    }

    if (data.name === "" || data.name === null || data.name === undefined) {
      return NextResponse.json(
        { error: `Name cannot be empty`, status: "error" },
        { status: 400 }
      );
    }

    const serviceType = await prisma.serviceType.create({
      data: {
        categoryId: data.categoryId,
        name: data.name,
        description: data.description,
        basePrice: data.basePrice,
        isActive: true,
      },
    });

    return NextResponse.json(serviceType);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create service" },
      { status: 500 }
    );
  }
}
