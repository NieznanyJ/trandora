import { redirect } from 'next/navigation';
import MemberInfoForm from "@/components/MemberInfoForm";
import { wixClientServer } from "@/lib/wixClientServer";
import { members } from "@wix/members";

export const dynamic = 'force-dynamic'

export default async function ProfilePage() {
    const wixClient = await wixClientServer();
    const isLoggedIn = await wixClient.auth.loggedIn()

    if (!isLoggedIn) {
        redirect('/login')
    }


    const response = await wixClient.members.getCurrentMember({ fieldSet: members.Set.FULL });

    if (!response.member) {
        redirect('/login');
    }

    const memberContactInfo = response.member.contact;



    return (
        <main className="flex min-h-screen max-w-[1440px] p-4 mx-auto justify-between gap-[5em]">
            <div className="bg-background rounded-lg p-6 shadow">
                <h1 className="text-2xl font-bold mb-4">Contact and Address Information</h1>
                <div className="space-y-4">
                    <MemberInfoForm
                        memberId={response.member._id!}
                        contact={memberContactInfo}
                        email={response.member.loginEmail || ''}
                        addresses={memberContactInfo?.addresses || []}
                    />
                </div>
            </div>
        </main>
    );

}