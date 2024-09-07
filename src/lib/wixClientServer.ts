import { createClient, OAuthStrategy } from "@wix/sdk";
import { collections, products } from "@wix/stores";
import {members} from '@wix/members'
import { currentCart } from "@wix/ecom";
import { cookies } from "next/headers";

export async function wixClientServer() {
    let refreshToken;
    try {
        const cookieStore = cookies();
        refreshToken = JSON.parse(
            cookieStore.get("refreshToken")?.value || "{}"
        );
    } catch (error) {
        console.log(error);
    }
    const wixClient = createClient({
        modules: {
            products,
            collections,
            members
        },
        auth: OAuthStrategy({
            clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID!,
            tokens: {
                refreshToken,
                accessToken: {
                    value: "",
                    expiresAt: 0,
                },
            },
        }),
    });

    return wixClient;
}
