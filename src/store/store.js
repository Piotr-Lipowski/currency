import { configureStore } from '@reduxjs/toolkit';
import conversionDataReducer from './reducers/ConversionDataSlice';
import selectedTabReducer from './reducers/SelectedTabSlice';

export default configureStore({
  reducer: {
    conversionData: conversionDataReducer,
    selectedTab: selectedTabReducer,
  },
})