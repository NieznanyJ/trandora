import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface FilterState {
    sort: string | undefined;
    searchTerm: string;
    category: string | undefined;
    priceRange: {
        min: number | undefined;
        max:number | undefined;
    }
}

const initialState: FilterState = {
    sort: undefined,
    searchTerm: '',
    category: undefined,
    priceRange: {
        min:  undefined,
        max: undefined
    }
}

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        search: (state, action: PayloadAction<string>) => {
            state.searchTerm = action.payload;
        },
        setSort: (state, action: PayloadAction<string | undefined>) => {
            state.sort = action.payload;
        },
        setCategory: (state, action: PayloadAction<string | undefined>) => {
            
            state.category = action.payload;
            
        },

        setMinPriceRange: (state, action: PayloadAction<number | undefined>) => {
            
            state.priceRange.min = action.payload;
            
        },
        setMaxPriceRange: (state, action: PayloadAction<number | undefined>) => {
            
            state.priceRange.max = action.payload;
            
        },
        setAllFilters: (state, action: PayloadAction<FilterState>) => {
            state = action.payload
        }
        
    }
})

export const { search, setSort, setCategory, setMinPriceRange, setMaxPriceRange } = filterSlice.actions;
export default filterSlice.reducer;
