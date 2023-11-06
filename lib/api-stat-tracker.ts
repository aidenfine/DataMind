import { auth } from "@clerk/nextjs";
import prismadb from "./prismadb";

export const updateConversationCount = async () => {
    try {
        const { userId } = auth();

        if (!userId) {
            return;
        }

        const userApiLimit = await prismadb.userApiStats.findUnique({
            where: {
                userId: userId,
            }
        });

        if (userApiLimit) {
            await prismadb.userApiStats.update({
                where: { userId: userId },
                data: { conversationCount: userApiLimit.conversationCount + 1, totalCount: userApiLimit.totalCount + 1 },
            });
        } else {
            await prismadb.userApiStats.create({
                data: { userId: userId, conversationCount: 1 },
            });
        }
    } catch (error) {
        console.error("Error updating user stats:", error);
        // Handle the error or log it for further investigation.
    }
}


export const updateImageCount = async () => {
    const { userId } = auth();

    if(!userId){
        return;
    }
    const updateUserCount = await prismadb.userApiStats.findUnique({
        where:{
            userId: userId,
        }
    });
    if(updateUserCount){
        await prismadb.userApiStats.update({
            where: {userId: userId},
            data: { imageCount: updateUserCount.imageCount + 1, totalCount: updateUserCount.imageCount + 1},
        });
    } else {
        await prismadb.userApiStats.create({
            data: { userId: userId, imageCount:  1},
        })
    }
}

export const updateMusicCount = async () => {
    const { userId } = auth();

    if(!userId){
        return;
    }
    const updateUserCount = await prismadb.userApiStats.findUnique({
        where:{
            userId: userId,
        }
    });
    if(updateUserCount){
        await prismadb.userApiStats.update({
            where: {userId: userId},
            data: { musicCount: updateUserCount.musicCount + 1, totalCount: updateUserCount.totalCount + 1},
        });
    } else {
        await prismadb.userApiStats.create({
            data: { userId: userId, musicCount:  1},
        })
    }
}


export const updateCodeCount = async () => {
    const { userId } = auth();

    if(!userId){
        return;
    }
    const updateUserCount = await prismadb.userApiStats.findUnique({
        where:{
            userId: userId,
        }
    });
    if(updateUserCount){
        await prismadb.userApiStats.update({
            where: {userId: userId},
            data: { codeCount: updateUserCount.codeCount + 1, totalCount: updateUserCount.totalCount + 1},
        });
    } else {
        await prismadb.userApiStats.create({
            data: { userId: userId, codeCount:  1},
        })
    }
}

export const updateVideoCount = async () => {
    const { userId } = auth();

    if(!userId){
        return;
    }
    const updateUserCount = await prismadb.userApiStats.findUnique({
        where:{
            userId: userId,
        }
    });
    if(updateUserCount){
        await prismadb.userApiStats.update({
            where: {userId: userId},
            data: { videoCount: updateUserCount.videoCount + 1, totalCount: updateUserCount.totalCount + 1},
        });
    } else {
        await prismadb.userApiStats.create({
            data: { userId: userId, videoCount:  1},
        })
    }
}