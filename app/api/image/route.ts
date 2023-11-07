import { useProModal } from '@/hooks/use-pro-modal';
import { checkApiLimit, increaseApiLimit } from '@/lib/api-limit';
import { updateImageCount } from '@/lib/api-stat-tracker';
import { checkSubscription } from '@/lib/subscription';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import Replicate from 'replicate';


const replicate = new Replicate({
  
  auth: process.env.REPLICATE_API_TOKEN || ""
})

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { prompt, amount = 1, resolution = "512x512" } = body;

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }
    if (!prompt) {
      return new NextResponse('Prompt are required', { status: 400 });

    }
    const freeTrial = await checkApiLimit();
    const isPro = await checkSubscription();
    
    if(!freeTrial && !isPro){
      return new NextResponse("Free trial expired", {status: 403})
    }
    if (!amount) {
      return new NextResponse('Amount is required', { status: 400 });
    }
    if (!resolution) {
      return new NextResponse('Resolution is required', { status: 400 });
    }

    const response = await replicate.run(
      "stability-ai/stable-diffusion:ac732df83cea7fff18b8472768c88ad041fa750ff7682a21affe81863cbe77e4",
      {
        input: {
          prompt: prompt,
          num_outputs: amount,
          // width: '512',
          // height: '512'
        }
      }
    );

    if(!isPro){
      await increaseApiLimit();

    }
    await updateImageCount();

    return NextResponse.json(response);
  } catch (error) {
    console.log('[IMAGE_ERROR]', error);
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