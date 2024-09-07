'use client'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { memberInfoFormSchema } from '@/lib/formSchemas';
import { members } from '@wix/members';
import { z } from 'zod';
import {  useToast } from '@/hooks/use-toast';
import {iso31661} from 'iso-3166'

import { updateMemberAction } from '@/actions/updateMember.action';

function MemberInfoForm({ contact, email, addresses, memberId }: { contact?: members.Contact, email?: string, addresses: members.Address[], memberId:string }) {
    const form = useForm<z.infer<typeof memberInfoFormSchema>>({
        resolver: zodResolver(memberInfoFormSchema),
        defaultValues: {
            firstName: contact?.firstName || '',
            lastName: contact?.lastName || '',
            email: contact?.emails![0] ? contact?.emails[0] : email ? email : '',
            phone: contact?.phones![0] || '',
            address: {
                street: addresses[0].addressLine || '',
                city: addresses[0].city || '',
                state: addresses[0].subdivision || '',
                postalCode: addresses[0].postalCode || '',
                country: addresses[0].country || '',
            },

        },
    });

    const {toast }= useToast();

    async function onUpdateMember(values: z.infer<typeof memberInfoFormSchema>){
        try {
            await updateMemberAction(memberId, {
                contact: {
                    firstName: values.firstName,
                    lastName: values.lastName,
                    emails: [values.email],
                    phones: [values.phone!],
                    addresses: [
                        {
                            postalCode: values.address.postalCode,
                            city: values.address.city,
                            country: values.address.country,
                            addressLine: values.address.street,
                            subdivision: values.address.state,
                        },
                    ],
                },
            });

            toast({
                description: 'Address and contact information updated',
            });
        } catch (error) {
            console.error(error);
            toast({
                description: 'Failed to update information. Please try again.',
                variant: 'destructive',
            });
        }
    };



    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onUpdateMember)} className="space-y-8 p-4   rounded-md w-full max-w-[700px] md:max-w-[90%]">
                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>First Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="First Name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Last Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Last Name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="Email" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Phone (optional)</FormLabel>
                            <FormControl>
                                <Input placeholder="Phone" {...field} />

                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="space-y-4">
                    <h3 className="font-semibold">Address</h3>
                    <FormField
                        control={form.control}
                        name="address.street"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Street</FormLabel>
                                <FormControl>
                                    <Input placeholder="Street" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="grid grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="address.city"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>City</FormLabel>
                                    <FormControl>
                                        <Input placeholder="City" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="address.state"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>State</FormLabel>
                                    <FormControl>
                                        <Input placeholder="State" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="address.postalCode"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Postal Code</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Postal Code" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="address.country"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Country</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Country" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>



                <Button type="submit" className='w-full bg-white text-black border-[1px] border-black hover:bg-black hover:text-white transition-colors font-medium'>
                    UPDATE INFORMATION
                </Button>
            </form>
        </Form>
    );
}

export default MemberInfoForm