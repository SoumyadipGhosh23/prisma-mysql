import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request){
    try {
        const reqBody = await request.json();
        const {firstName, lastName, validated} = reqBody
        const newUser = await prisma.users.create({
            data:{
                firstName,
                lastName,
                validated
            }
        })
        console.log("Added User Succeful:: Server Side:", newUser);
        return NextResponse.json({
            data : newUser,
            message: "User Added"
        },
        {
            status: 200
        })
    } catch (error) {
        console.error("Add User Server Error 👤📅",error);
        return NextResponse.json({
            error : "Iternal Server Error"
        },
        {
            status : 500,
        })
    }
}