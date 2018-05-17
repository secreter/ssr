
import {applyMiddleware,createStore,combineReducers} from 'redux';
import {browserHistory} from 'react-router';
import {routerMiddleware,syncHistoryWithStore,routerReducer} from 'react-router-redux';
import {persistStore,persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import reducers from './reducers';

const reducer = combineReducers({
    ...reducers,
    routing: routerReducer
});

const persistConfig = {
    key: 'root',
    whitelist: ['home'],
    storage
};

const middleware = routerMiddleware(browserHistory);

const persistedReducer = persistReducer(persistConfig,reducer);

function configureStore(){
    let store = createStore(persistedReducer,applyMiddleware(middleware));
    let persistor = persistStore(store);
    let history = syncHistoryWithStore(browserHistory,store);

    return {
        history,
        persistor,
        store
    };
}

export default configureStore;