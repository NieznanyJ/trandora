import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import React from 'react'

function Breadcrumbs({ productName, collection }: { productName?: string, collection?: string }) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/products">Products</BreadcrumbLink>
        </BreadcrumbItem>
        {collection ?
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink className="capitalize" href={`/products/${collection}`}>{decodeURIComponent(collection)}</BreadcrumbLink>
            </BreadcrumbItem>
          </>:
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink className="capitalize" href={`/products/${encodeURIComponent('all products')}`}>All products</BreadcrumbLink>
            </BreadcrumbItem>
          </>}
        {productName &&
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="capitalize">{productName}</BreadcrumbPage>
            </BreadcrumbItem>
          </>}
      </BreadcrumbList>
    </Breadcrumb>

  )
}

export default Breadcrumbs
