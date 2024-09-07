'use client'

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactFormSchema } from '@/lib/formSchemas';

import { 
  Form, 
  FormField, 
  FormItem, 
  FormControl, 
  FormDescription, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"


function ContactForm() {
  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      fullName: '',
      email: '',
      message: '',
    },
  });

  function onSubmit(values: z.infer<typeof contactFormSchema>) {
    
    console.log(values)
  }

  return (
    <Form {...form}>
      <form className='w-full md:w-1/2 flex flex-col gap-4 item' onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem  >
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>Your full name</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem  >
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
              </FormControl>
              <FormDescription>Your email address</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem >
              <FormLabel>Message</FormLabel>
              <FormControl>
                
                <Textarea {...field} />

              </FormControl>
              <FormDescription>Your message</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

                         <Button className='bg-black font-medium hover:bg-black'>SUBMIT</Button>

      </form>
    </Form>
  );
}

export default ContactForm;
