import { combineReducers } from 'redux';
import { StoreState } from './types'
import appReducer from '../features/app/reducer';
import packiReducer from '../features/packi/reducer';
import wizziReducer from '../features/wizzi/reducer';

export const createRootReducer = () => combineReducers<StoreState>({
    app: appReducer,
    packi: packiReducer,
    wizzi: wizziReducer,
}); 