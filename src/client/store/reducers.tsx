import { combineReducers } from 'redux';
import { StoreState } from './types'
import appReducer from '../features/app/reducer';
import packyReducer from '../features/packy/reducer';
import wizziReducer from '../features/wizzi/reducer';

export const createRootReducer = () => combineReducers<StoreState>({
    app: appReducer,
    packy: packyReducer,
    wizzi: wizziReducer,
}); 