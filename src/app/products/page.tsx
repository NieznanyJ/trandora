


import Pagination from "@/components/Pagination";
import { wixClientServer } from "@/lib/wixClientServer";
import { notFound } from "next/navigation";
import CollectionItemList from "@/components/CollectionItemList";
import Sidebar from "@/components/Sidebar";
import { products } from "@wix/stores";
import Breadcrumbs from "@/components/Breadcrumbs";


export default async function ProductsPage({ searchParams }: { searchParams: { page: string, name: string, min: string, max: string, category: string, sort: string } }) {

    const wixClient = await wixClientServer();

    const collectionsResponse = await wixClient.collections.queryCollections().find();
    const collections = collectionsResponse.items;
    const selectedCollection = collections.find(col => col.name === decodeURIComponent(searchParams.category))

    console.log(selectedCollection)


    const response = await wixClient.products.queryProducts()
        .startsWith('name', searchParams.name || '')
        .ge('priceData.price', searchParams.min || 0)
        .le('priceData.price', searchParams.max || 9999)
        .eq('collectionIds', selectedCollection?._id || process.env.ALL_PPODUCTS_CATEGORY_ID)
        .limit(20).skip(searchParams.page ? parseInt(searchParams.page) * 20 : 0).find();



    let items: products.Product[] = [];

    switch (searchParams.sort) {
        case 'desc':
            const sortedItems = await response.query.descending('price').find()
            items = sortedItems.items
            break;
        case 'asc':
            items = (await response.query.ascending('price').find()).items
            break;
        case 'a-z':
            items = (await response.query.ascending('name').find()).items
            break;
        case 'a-z':
            items = (await response.query.descending('name').find()).items
            break;
        default:
            items = response.items
            break;

    }







    return (
        <main className="p-4 md:p-0 pr-4  w-full md:flex gap-10  space-y-6 min-h-screen">
            <Sidebar />

            <div className="flex flex-col  space-y-5 py-4">
                <div className="flex flex-col gap-4 border-b-2 border-black py-2">
                    <h1 className="font-heading text-2xl  ">All products</h1>
                    <Breadcrumbs collection={selectedCollection?.name || 'all products'} />
                </div>
                <CollectionItemList items={items} />



                {items.length !== 0 && <Pagination currentPage={response.currentPage || 0} hasPrev={response.hasPrev()} hasNext={response.hasNext()} />}
            </div>
        </main>
    );
}


