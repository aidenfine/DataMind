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
import axios from 'axios'
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Empty } from "@/components/empty";
import { Loader } from "@/components/loader";

const VideoPage = () => {

    const router = useRouter();
    const [video, setVideo] = useState<string>();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: ""
        }
    });

    const isLoading = form.formState.isSubmitting;
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setVideo(undefined);

            const response = await axios.post("/api/video", values)
            setVideo(response.data[0])
            form.reset();
            
        } catch (error: any) {
            // open Pro model
            console.log(error)
            
        } finally{
            router.refresh();

        }
    }
    return (
        <div>
            <Heading
                title="Video"
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
                                        placeholder="Video of..."
                                        disabled={isLoading}
                                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                                        {...field}
                                        
                                        />

                                    </FormControl>
                                </FormItem>
                            )}
                             />
                             <Button className="w-full col-span-12 lg:col-span-2">
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
                    {!video && !isLoading && (
                        <div>
                            <Empty label="Seems quite in here... generate some music"/>
                        </div>
                    )}
                    {!video && !isLoading && (
                        <Empty label="No video generated" />
                    )}
                    {video && (
                        <video controls className="w-full mt-8 border-black rounded-lg aspect-video">
                            <source src={video}/>
                        </video>
                    )}
                </div>
             </Card>
        </div>
    )
}

export default VideoPage;