import CheckoutForm from "@/components/CheckoutForm";
import CheckoutItems from "@/components/CheckoutItems";
import { wixClientServer } from "@/lib/wixClientServer";
import { members } from "@wix/members";

export default async function Chacktou() {

    const wixClient = wixClientServer();
    let response;
    let memberContactInfo;

    try {
        response = await (await wixClient).members.getCurrentMember({ fieldSet: members.Set.FULL })

        memberContactInfo = response.member?.contact
    }catch(error){
        console.log(error)
    }




    return (
        <main className="flex flex-col w-full  xl:max-w-[1440px] mx-auto  p-4">
            <div className="flex flex-col md:flex-row">
                <section className="w-full md:w-2/3">
                    <CheckoutForm contact={memberContactInfo} email={response?.member?.loginEmail!} addresses={memberContactInfo?.addresses!} />
                </section>
                <section className="w-full md:w-1/3 space-y-4">
                    <h2 className="border-b-[1px] pt-4 pb-2 border-black font-heading text-xl">Cart</h2>
                    <CheckoutItems />
                </section>
            </div>
        </main>
    );
}