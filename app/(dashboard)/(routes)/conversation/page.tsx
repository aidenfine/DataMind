'use client'
import { Heading } from "@/components/heading";
import { MessageSquare } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod'
import { formSchema } from "./constants";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import OpenAI from "openai";
import axios from 'axios'
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Empty } from "@/components/empty";
import { Loader } from "@/components/loader";
import { cn } from "@/lib/utils";
import { UserAvatar } from "@/components/user-avatar";
import { BotAvatar } from "@/components/bot-avatar";
import { useProModal } from "@/hooks/use-pro-modal";

const ConversationPage = () => {

    const proModal = useProModal();

    const router = useRouter();
    const [messages, setMessages] = useState<OpenAI.Chat.Completions.ChatCompletionMessageParam[]>([])
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: ""
        }
    });

    const isLoading = form.formState.isSubmitting;
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const userMessage: OpenAI.Chat.Completions.ChatCompletionMessageParam = 
            {
                role: 'user',
                content: values.prompt,
            }
            const newMessages = [...messages, userMessage];

            const response = await axios.post("/api/conversations", {
                messages: newMessages,
            });
            setMessages((curr) => [...curr, userMessage, response.data]);
            form.reset();
            
        } catch (error: any) {
            // add popup when error
            if(error?.response?.status === 403){
                proModal.onOpen();
            }
            console.log(error)
            
        } finally{
            router.refresh();

        }
    }

    return (
        <div>
            <Heading
                title="Conversation"
                description="Description"
                icon={MessageSquare}
                iconColor="text-violet-500"
                bgColor="bg-violet-500/10"
             />
             <Card className="p-5 m-3 bg-white border-none md:m-10 lg:px-8 ">
                <div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="grid w-full grid-cols-12 gap-2 p-4 px-3 border rounded-lg md:px-6 focus-within:shadow-sm">
                            <FormField 
                            name="prompt"
                            render={({ field }) => (
                                <FormItem className="col-span-12 lg:col-span-10">
                                    <FormControl className="p-0 m-0">
                                        <Input
                                        placeholder="Ask me something..."
                                        disabled={isLoading}
                                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                                        {...field}
                                        
                                        />

                                    </FormControl>
                                </FormItem>
                            )}
                             />
                             <Button variant="main" className="w-full col-span-12 lg:col-span-2">
                                Generate
                             </Button>
                        </form>
                    </Form>
                </div>
                <div className="mt-4 space-y-4">
                    {isLoading && (
                        <div className="flex items-center justify-center w-full p-8 rounded-lg bg-muted">
                            <Loader /> 
                        </div>
                    ) }
                    {messages.length === 0 && !isLoading && (
                        <div>
                            <Empty label="Nothing here, try to send a message!"/>
                        </div>
                    )}
                    <div className="flex flex-col-reverse gap-y-4">
                        {messages.map((e) => (
                            <div 
                            key={e.content}
                            className={cn("p-8 w-full flex items-start gap-x-8 rounded-lg",
                            e.role === "user" ? "bg-white border border-black/10" : "bg-muted")}>
                                {e.role === "user" ? <UserAvatar /> : <BotAvatar />}
                                <p className="text-sm">
                                {e.content}
                                </p>

                            </div>
                        ))}

                    </div>
                </div>
             </Card>
        </div>
    )
}

export default ConversationPage;