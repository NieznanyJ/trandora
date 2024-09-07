


import Pagination from "@/components/Pagination";
import { wixClientServer } from "@/lib/wixClientServer";
import { notFound } from "next/navigation";
import CollectionItemList from "@/components/CollectionItemList";
import Breadcrumbs from "@/components/Breadcrumbs";
import Sidebar from "@/components/Sidebar";


export default async function CollectionPage({ params }: { params: { collection: string } }) {


    const wixClient = await wixClientServer();
    

    const collectionsResponse = await wixClient.collections.queryCollections().eq('name', decodeURIComponent(params.collection)).find();
    const collection = collectionsResponse.items[0];


    const response = await wixClient.products.queryProducts().eq('collectionIds', collection._id).limit(20).find();

   /*  if (!response.items || response.items.length === 0) {
        return notFound();
    } */

    const items = response.items;





    return (
        <main className="p-4 md:p-0 pr-4  w-full md:flex gap-10  space-y-6 min-h-screen">
            <Sidebar />


            <div className="flex flex-col  space-y-5 py-4">
            <div className="flex flex-col gap-4 border-b-2 border-black py-2">
                    <h1 className="font-heading text-2xl  ">{params.collection}</h1>
                    <Breadcrumbs collection={collection?.name || 'all products'} />
                </div>
                <CollectionItemList items={items} />



                {items.length !== 0 && <Pagination currentPage={response.currentPage || 0} hasPrev={response.hasPrev()} hasNext={response.hasNext()} />}
            </div>
        </main>
    );
}


