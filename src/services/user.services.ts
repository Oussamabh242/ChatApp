import { PrismaClient } from "@prisma/client";
import {prisma} from "../utils/_db" ; 

export async function allUsers() {
    return await prisma.user.findMany() ; 
}
