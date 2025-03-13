import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/store/index';

interface StoreState {
  activeSymbol: string | null;
  showCardInfo: boolean;
}

const initialState: StoreState = {
  activeSymbol: null,
  showCardInfo: true
};

export const dashboardOptionsSlice = createSlice({
  name: 'dashboardOptions',
  initialState,
  reducers: {
    toggleShowCardInfo: (state) => {
      state.showCardInfo = !state.showCardInfo;
    },
    setActiveSymbol: (state, action: PayloadAction<string | null>) => {
      state.activeSymbol = action.payload;
    }
  }
});

export const { toggleShowCardInfo, setActiveSymbol } = dashboardOptionsSlice.actions;

export const selectActiveSymbol = (state: RootState) => state.dashboardOptions.activeSymbol;
export const selectShowCardInfo = (state: RootState) => state.dashboardOptions.showCardInfo;

export default dashboardOptionsSlice.reducer;
