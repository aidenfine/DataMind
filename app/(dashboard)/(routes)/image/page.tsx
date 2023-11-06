'use client'
import { Heading } from "@/components/heading";
import { MessageSquare, Download } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod'
import { amountOptions, formSchema, resolutionOptions } from "./constants";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import axios from 'axios'
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Empty } from "@/components/empty";
import { Loader } from "@/components/loader";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Image from "next/image";

const ImagePage = () => {

    const [images, setImages] = useState<string[]>([]);

    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: "",
            amount: "1",
            resolution: "512x512",
        }
    });

    const isLoading = form.formState.isSubmitting;
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setImages([]);
            console.log(values);

            const response = await axios.post("/api/image", values);

            const urls = response.data
            //response.data.map((image: {url: string}) => image.url);
            console.log(urls, 'urls')

            setImages(urls);
            console.log(images, 'images')
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
                title="Image"
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
                                <FormItem className="col-span-12 lg:col-span-6">
                                    <FormControl className="p-0 m-0">
                                        <Input
                                        placeholder="A picture of another universe..."
                                        disabled={isLoading}
                                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                                        {...field}
                                        />

                                    </FormControl>
                                </FormItem>
                            )}
                             />
                             <FormField
                             control={form.control}
                             name="amount"
                             render={({ field }) => (
                                <FormItem className="col-span-12 lg:col-span-2">
                                    <Select
                                    disabled={isLoading}
                                    onValueChange={field.onChange}
                                    value={field.value}
                                    defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue defaultValue={field.value}/>
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {amountOptions.map((option) => (
                                                <SelectItem
                                                key={option.value}
                                                value={option.value}
                                                >
                                                    {option.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>

                                </FormItem>
                             )}
                             />
                            <FormField
                             control={form.control}
                             name="resolution"
                             render={({ field }) => (
                                <FormItem className="col-span-12 lg:col-span-2">
                                    <Select
                                    disabled={isLoading}
                                    onValueChange={field.onChange}
                                    value={field.value}
                                    defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue defaultValue={field.value}/>
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {resolutionOptions.map((option) => (
                                                <SelectItem
                                                key={option.value}
                                                value={option.value}
                                                >
                                                    {option.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>

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
                        <div className="p20">
                            <Loader /> 
                        </div>
                    ) }
                    {images.length === 0 && !isLoading && (
                        <div>
                            <Empty label="Nothing here, try to generate an image!"/>
                        </div>
                    )}
                    <div className="grid grid-cols-1 gap-4 mt-8 md:gird-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {images.map((src) => (
                            <Card
                            key={src}
                            className="overflow-hidden rounded-lg"
                            >
                                <div className="relative aspect-square">
                                    <Image 
                                    alt="image"
                                    fill
                                    src={src}
                                    />
                                </div>
                                <CardFooter className="p-2">
                                    <Button 
                                    onClick={() => window.open(src)}
                                    variant="secondary"
                                     className="w-full">
                                        <Download className="w-4 h-4 mr-2" />
                                        Download
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </div>
             </Card>
        </div>
    )
}

export default ImagePage;