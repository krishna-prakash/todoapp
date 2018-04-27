import { createStore, applyMiddleware } from "redux";
import { routerMiddleware } from "react-router-redux";
import createSagaMiddleware from "redux-saga";
import { history } from "./history";
import reducer from "./redux/combineReducers";
import { rootSaga } from "./saga";

const historyMiddleware = routerMiddleware(history);

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  reducer,
  applyMiddleware(historyMiddleware, sagaMiddleware)
  // window.devToolsExtension && window.devToolsExtension()
);

sagaMiddleware.run(rootSaga);

export default store;
