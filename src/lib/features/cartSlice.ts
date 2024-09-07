import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { currentCart } from "@wix/ecom";
import { WixClient } from "@/context/WixContext";

interface CartState {
    nrOfCartItems: number | undefined;
    quantity: number;
    cart: currentCart.LineItem[] | undefined;
    total: string;
}

const initialState: CartState = {
    nrOfCartItems: undefined,
    quantity: 1,
    cart: [],
    total: ''
};

export const fetchCart = createAsyncThunk(
    "cart/fetchCart",
    async (wixClient: WixClient, { rejectWithValue }) => {
        try {
            const cart = (await wixClient.currentCart.getCurrentCart())
                .lineItems;
            return cart;
        } catch (error) {
            console.error("Error fetching cart:", error);
            return rejectWithValue(error);
        }
    }
);

export const addToCart = createAsyncThunk(
    "cart/addToCart",
    async (
        {
            wixClient,
            productId,
            quantity,
            variantId,
        }: {
            wixClient: WixClient;
            productId: string;
            quantity: number;
            variantId?: string;
        },
        { rejectWithValue }
    ) => {
        try {
            const updatedCart = await wixClient.currentCart.addToCurrentCart({
                lineItems: [
                    {
                        catalogReference: {
                            appId: process.env.NEXT_PUBLIC_WIX_APP_ID,
                            catalogItemId: productId,
                            ...(variantId && {
                                options: { variantId: variantId },
                            }),
                        },
                        quantity,
                    },
                ],
            }); //
          
            return updatedCart; 
        } catch (error) {
            console.error("Error adding item to cart:", error);
            return rejectWithValue(error);
        }
    }
);


export const removeItem = createAsyncThunk(
    'cart/removeItem',
    async ({ wixClient, itemId }: { wixClient: WixClient, itemId: string }, { rejectWithValue }) => {
        try {
            const updatedCart = await wixClient.currentCart.removeLineItemsFromCurrentCart([itemId]); 
           
            return updatedCart; 
        } catch (error) {
            console.error('Error removing item from cart:', error);
            return rejectWithValue(error); 
        }
    }
);

export const cartState = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setQuantity: (state, action: PayloadAction<number>) => {
            state.quantity = action.payload;
        },
        setNrOfItems: (state, action: PayloadAction<currentCart.LineItem[] | undefined>) => {
            state.nrOfCartItems = action.payload?.length;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.cart = action.payload;
            })
            .addCase(fetchCart.rejected, (state, action) => {
                console.error("Error:", action.payload);
            });

        builder
            .addCase(addToCart.fulfilled, (state, action) => {
                state.cart = action.payload.cart?.lineItems;
                state.nrOfCartItems = action.payload?.cart?.lineItems.reduce((nr, item: currentCart.LineItem) => nr+ item.quantity! ,0)
                state.total= action.payload.cart?.subtotal?.formattedAmount || '0'
            })
            .addCase(addToCart.rejected, (state, action) => {
                console.error("Error:", action.payload);
            });
        builder
            .addCase(removeItem.fulfilled, (state,action) => {
                state.cart = action.payload?.cart?.lineItems;
                state.nrOfCartItems = action.payload?.cart?.lineItems.reduce((nr, item: currentCart.LineItem) => nr+ item.quantity! ,0)
                state.total= action.payload.cart?.subtotal?.formattedAmount || '0'

            })
            .addCase(removeItem.rejected, (state, action) => {
                console.error('Error:', action.payload);
            })
    },
});

export const { setQuantity, setNrOfItems } = cartState.actions;
export default cartState.reducer;
