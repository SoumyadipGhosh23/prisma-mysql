import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request) {
    try {
        const reqBody = await request.json();
        const { todoText, completed, userId } = reqBody;

        // Check if the user with the specified userId exists
        const userExists = await prisma.users.findUnique({
            where: { id: userId },
        });
     

        if (!userExists) {
            return NextResponse.json(
                {
                    error: "User not found",
                },
                {
                    status: 404,
                }
            );
        }

        const taskAlreadyAssigned = await prisma.todo.findFirst({
            where:{
               userId : userId
            }
        })

        if(taskAlreadyAssigned){
            return NextResponse.json({
                error: "User already assigned"
            },{
                status: 400,
            })
        }



        const newTodo = await prisma.todo.create({
            data: {
                todoText,
                completed,
                userId,
            },
        });

        console.log("Added Todo Successful:: Server Side:", newTodo);

        return NextResponse.json(
            {
                data: newTodo,
                message: "Todo Added",
            },
            {
                status: 200,
            }
        );
    } catch (error) {
        console.error("Add Todo Server Error 📅", error);
        return NextResponse.json(
            {
                error: "Internal Server Error",
            },
            {
                status: 500,
            }
        );
    }
}
