import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth/authSlice";
import stockDetailReducer from "./slices/detailsBySymbol";
import userReducer from "./slices/userSlice";
import bankReducer from "./slices/bankSlice";
import watchlistReducer from "./slices/watchListSlice";
import commonReducer from "./slices/commonSlice";

const store = configureStore({
  reducer: {
    common: commonReducer,
    auth: authReducer,
    stockDetail: stockDetailReducer,
    user: userReducer,
    bank: bankReducer,
    watchlist: watchlistReducer,
  },
});

export default store;
