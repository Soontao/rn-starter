// @flow
import { AsyncStorage } from "react-native";
import { composeWithDevTools } from "redux-devtools-extension";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import reducer from "../reducers";

export default function configureStore(onCompletion: () => void): any {
  const enhancer = composeWithDevTools(
    applyMiddleware(thunk),
  );

  const persistedReducers = persistReducer({
    key: "GlobalState", storage: AsyncStorage
  }, reducer);

  const store = createStore(persistedReducers, enhancer);

  persistStore(store, onCompletion);

  return store;
}
