import { cn } from "@/lib/utils"
import Link from "next/link"


function ShopNow({className}: {className?: string}) {
  return (
    <Link href='/products' className={cn(className, 'underline text-white   font-heading underline-offset-2')}>SHOP NOW</Link>
  )
}

export default ShopNow