import { combineReducers } from "redux";
import authReducer from "./slices/authSlice";
import shipmentReducer from "./slices/shipmentSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  shipment: shipmentReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
