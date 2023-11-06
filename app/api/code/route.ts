import { checkApiLimit, increaseApiLimit } from '@/lib/api-limit';
import { updateCodeCount } from '@/lib/api-stat-tracker';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { ChatCompletionMessageParam } from 'openai/resources';


const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const instructionMessage: ChatCompletionMessageParam = {
  role: 'system',
  content: 'You are a code generator. You much give answers in markdown code using the language I ask. Explain the code unless asked not to.'
}

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { messages } = body;

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }
    if (!openai.apiKey) {
      return new NextResponse('OpenAI API Key not configured', { status: 500 });
    }
    if (!messages) {
      return new NextResponse('Messages are required', { status: 400 });
    }
    const freeTrial = await checkApiLimit();
    
    if(!freeTrial){
      return new NextResponse("Free trial expired", {status: 403})
    }

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [instructionMessage, ...messages],
    });

    await increaseApiLimit();
    await updateCodeCount();

    return NextResponse.json(response.choices[0].message);
  } catch (error) {
    console.log('[CODE_ERROR]', error);
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