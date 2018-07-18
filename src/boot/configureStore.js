// @flow
import { AsyncStorage } from "react-native";
import { composeWithDevTools } from "redux-devtools-extension";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import reducer from "./reducers";
import { createRavenMiddleware } from "../library/Sentry/middleware";

export default function configureStore(onCompletion: () => void): any {
  const enhancer = composeWithDevTools(
    applyMiddleware(
      thunk,
      createRavenMiddleware(),
    ),
  );

  const persistedReducers = persistReducer({
    key: "GlobalState", storage: AsyncStorage
  }, reducer);

  const store = createStore(persistedReducers, enhancer);

  persistStore(store, {}, onCompletion);

  return store;
}
