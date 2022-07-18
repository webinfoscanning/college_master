import { applyMiddleware, createStore } from "redux";
import { persistStore, persistReducer } from 'redux-persist'
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "../reducers";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: 'root',
  storage
}
const persistreducer = persistReducer(persistConfig, rootReducer)
const initisalState = {};
const middleware = [thunk];

const store = createStore(
  persistreducer,
  initisalState,
  composeWithDevTools(applyMiddleware(...middleware))
);
const perstior = persistStore(store)
export default store;
export {perstior}
