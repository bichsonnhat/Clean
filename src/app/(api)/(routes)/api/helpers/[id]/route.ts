import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const helper = await prisma.helper.findUnique({
            where: {
                id: params.id,
            },
        });
        if (!helper) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }
        return NextResponse.json(helper);
    } catch (error) {
        console.error('Error fetching user:', error);
        return NextResponse.json(
            { error: 'Failed to fetch user' },
            { status: 500 }
        );
    }
}

export async function PUT(
    req: Request,
    { params }: { params: { id: string } }
) {
  const data = await req.json();
  const updatedServiceCategory = await prisma.helper.update({
    where: {
      id: params.id,
    },
    data,
  });
  return NextResponse.json(updatedServiceCategory);
}

export async function DELETE(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const helper = await prisma.helper.delete({
            where: {
                id: params.id,
            },
        });
        return NextResponse.json(helper);
    } catch (error) {
        console.error('Error deleting user:', error);
        return NextResponse.json(
            { error: 'Failed to delete user' },
            { status: 500 }
        );
    }
}