import { collections } from "@wix/stores";
import Filter from "./Filter";
import CategoryNav from "./CategoryNav";
import { wixClientServer } from "@/lib/wixClientServer";



async function Sidebar(){

    const wixClient= wixClientServer();
   

    const collections = (await (await wixClient).collections.queryCollections().ne('name', 'men').ne('name', 'women').ne('name', 'kids').find()).items;
   

    return (
        <div className="w-full md:w-1/3 lg:w-1/4 xl:w-1/5 md:flex flex-col border-2 p-4">
            
            <Filter collections={collections} />
        </div>
    );
}


export default Sidebar;