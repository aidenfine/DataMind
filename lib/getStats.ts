import { auth } from "@clerk/nextjs"
import prismadb from "./prismadb";

export const getConversationStats = async() => {
    const { userId } = auth();
    if(!userId){
        return false;
    }
    const userApiStats = await prismadb.userApiStats.findUnique({
        where:{
            userId,
        }
    });
    return userApiStats?.conversationCount;
}

export const getTotalStats = async() => {
    const { userId } = auth();
    if(!userId){
        return false;
    }
    const userApiStats = await prismadb.userApiStats.findUnique({
        where:{
            userId,
        }
    });
    return userApiStats?.totalCount;
}

export const getVideoCount = async() => {
    const { userId } = auth();
    if(!userId){
        return false;
    }
    const userApiStats = await prismadb.userApiStats.findUnique({
        where:{
            userId,
        }
    });
    return userApiStats?.videoCount;
}

export const getImageCount = async() => {
    const { userId } = auth();
    if(!userId){
        return false;
    }
    const userApiStats = await prismadb.userApiStats.findUnique({
        where:{
            userId,
        }
    });
    return userApiStats?.imageCount;
}

export const getCodeCount = async() => {
    const { userId } = auth();
    if(!userId){
        return false;
    }
    const userApiStats = await prismadb.userApiStats.findUnique({
        where:{
            userId,
        }
    });
    return userApiStats?.codeCount;
}

export const getMusicCount = async() => {
    const { userId } = auth();
    if(!userId){
        return false;
    }
    const userApiStats = await prismadb.userApiStats.findUnique({
        where:{
            userId,
        }
    });
    return userApiStats?.musicCount;
}

export const getAllUserTotalCount = async() => {
    const userApiStats = await prismadb.userApiStats.findMany({
        select:{
            totalCount: true,
        }
    });

    return userApiStats[0].totalCount;
}