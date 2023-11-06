import { checkApiLimit, increaseApiLimit } from '@/lib/api-limit';
import { updateVideoCount } from '@/lib/api-stat-tracker';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import Replicate from 'replicate'


const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN || ""
})

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { prompt } = body;

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!prompt) {
      return new NextResponse('Prompt is required', { status: 400 });
    }
    const freeTrial = await checkApiLimit();
    
    if(!freeTrial){
      return new NextResponse("Free trial expired", {status: 403})
    }

    const response = await replicate.run(
      "anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351",
      {
        input: {
          prompt: prompt
        }
      }
    );
    await increaseApiLimit();
    await updateVideoCount();

    return NextResponse.json(response);
  } catch (error) {
    console.log('[VIDEO_ERROR]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

// and then in the Page


// import OpenAI from 'openai';

//  const [messages, setMessages] = useState<
//     OpenAI.Chat.Completions.CreateChatCompletionRequestMessage[]
//   >([]);

//    const userMessage: OpenAI.Chat.Completions.CreateChatCompletionRequestMessage =
//         {
//           role: 'user',
//           content: values.prompt,
//         };