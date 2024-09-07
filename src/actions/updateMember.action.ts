"use server"; 

import { wixClientServer } from "@/lib/wixClientServer";
import { members } from "@wix/members";

// Define the server action to update member information
export async function updateMemberAction(memberId: string, memberData: members.UpdateMember) {
    try {
        const wixClient = wixClientServer();
        // Call the Wix SDK to update the member info
        const res = await (await wixClient).members.updateMember(memberId, memberData);

        // Optionally, return the updated member info
        return res;
    } catch (error) {
        console.error("Error updating member info:", error);
        throw new Error('Failed to update member information.');
    }
}