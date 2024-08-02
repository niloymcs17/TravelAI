import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  destinationAddress: "",
  selectedTraveler: "",
  selectedBudget: "",
  startDate: "",
  endDate: "",
};

const tripSlice = createSlice({
  name: 'trip',
  initialState,
  reducers: {
    setDestinationAddress: (state, action: PayloadAction<any>) => {
      state.destinationAddress = action.payload;
    },
    setSelectedTraveler: (state, action: PayloadAction<string>) => {
      state.selectedTraveler = action.payload;
    },
    setSelectedBudget: (state, action: PayloadAction<string>) => {
      state.selectedBudget = action.payload;
    },
    setStartDate: (state, action: PayloadAction<string>) => {
      state.startDate = action.payload;
    },
    setEndDate: (state, action: PayloadAction<string>) => {
      state.endDate = action.payload;
    },
    resetTrip: (state) => {
      initialState
    },
  },
});

export const {
  setDestinationAddress,
  setSelectedTraveler,
  setSelectedBudget,
  setStartDate,
  setEndDate,
  resetTrip,
} = tripSlice.actions;

export default tripSlice.reducer;
