import MemberInfoForm from "@/components/MemberInfoForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { wixClientServer } from "@/lib/wixClientServer";
import { members } from "@wix/members";

interface MemberInfo{
    contact: {
        firstName: string;
        lastName: string;
        email: string,
        phone: string;
        addresses: {
            country: string,
            postalCode: string,
            subdivision: string;
            addressLine: string
        }
    }

}

export default async function ProfilePage() {

    const wixClient = wixClientServer();
   
    const response = await (await wixClient).members.getCurrentMember( {fieldSet: members.Set.FULL})
    
    const memberContactInfo = response.member?.contact
    
    async function updateMemberInfo( member: members.UpdateMember){
        const res = (await wixClient).members.updateMember(response.member?._id!, member)
    }

    return (
        <main className="flex min-h-screen max-w-[1440px] p-4 mx-auto justify-between gap-[5em]  ">
            <div className="bg-background rounded-lg p-6 shadow">
                <h1 className="text-2xl font-bold mb-4">Contact and Address inforamtion</h1>
                <div className="space-y-4">

                    <MemberInfoForm memberId={response.member?._id!}  contact={memberContactInfo} email={response.member?.loginEmail!} addresses={memberContactInfo?.addresses!}/>
                </div>
            </div>
        </main>
    );
}

