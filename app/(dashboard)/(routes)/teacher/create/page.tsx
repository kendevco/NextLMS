"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormLabel,
    FormMessage,
    FormItem,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import toast from "react-hot-toast";

const formSchema = z.object({
    title: z.string().min(1, {
        message: "Title is required"
    }),
})

const CreatePage = () => {

    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: ""
        },
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {

          //toast.success(`Course ${values.title} created successfully`);
          const response = await axios.post("/api/courses", values);

          router.push(`/teacher/courses/${response.data.id}`);
          
        } catch (error : any) {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            toast.error(`Server responded with ${error.response.status} error`);
          } else if (error.request) {
            // The request was made but no response was received
            toast.error("No response received from server");
          } else {
            // Something happened in setting up the request that triggered an Error
            toast.error(`Error: ${error.message}`);
          }
        }
      };
    return (
        <div className="max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6">
            <div>
                <h1  className="text-2xl">
                Name your new course
                </h1>

                <p className="text-sm text-slate-600">
                    What would you like to name your course? Don&apos;t worry, you 
                    can change this later.
                </p>
                <Form { ...form } >
                    <form 
                        onSubmit={ form.handleSubmit(onSubmit) }
                        className="space-y-8 mt-8"
                    >
                        <FormField 
                            control={form.control}
                            name="title"
                            render={({field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Course Title
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={isSubmitting}
                                            placeholder="e.g. 'Advanced web development'"
                                            { ...field } // spread the field props
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        What will you teach in this course? 
                                    </FormDescription>
                                    <FormMessage />

                                </FormItem>
                            )
                            }
                        />
                        <div className="flex items-center gap-x-2" >
                            <Link href="/teacher/courses">
                                <Button 
                                    variant="ghost"
                                    type="button"
                                >
                                    Cancel
                                </Button>
                            </Link>
                            <Button
                                type="submit"
                                disabled={!isValid || isSubmitting}
                                variant = "ghost"
                            >
                                Continue
                            </Button>
                        </div>

                    </form>
                </Form>

            </div>
        </div>
    )


}

export default CreatePage;