import { checkApiLimit, increaseApiLimit } from '@/lib/api-limit';
import { updateImageCount } from '@/lib/api-stat-tracker';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import OpenAI from 'openai';


const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { prompt, amount = 1, resolution = "512x512" } = body;

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }
    if (!openai.apiKey) {
      return new NextResponse('OpenAI API Key not configured', { status: 500 });
    }
    if (!prompt) {
      return new NextResponse('Prompt are required', { status: 400 });

    }
    const freeTrial = await checkApiLimit();
    
    if(!freeTrial){
      return new NextResponse("Free trial expired", {status: 403})
    }
    if (!amount) {
      return new NextResponse('Amount is required', { status: 400 });
    }
    if (!resolution) {
      return new NextResponse('Resolution is required', { status: 400 });
    }

    const response = await openai.images.generate({
      prompt,
      n: parseInt(amount, 10),
      size: resolution,

    });

    await increaseApiLimit();
    await updateImageCount();

    return NextResponse.json(response.data);
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