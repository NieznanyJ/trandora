'use client'

import { WixClientContext } from "@/context/WixContext"
import { useContext } from "react"

export function useWixClient(){
    return  useContext(WixClientContext)
}