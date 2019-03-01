import { AppState } from '../features/app/reducer';
import { PackyState } from '../features/packy/reducer';
import { WizziState } from '../features/wizzi/reducer';

export type StoreState = {
    app: AppState;
    packy: PackyState;
    wizzi: WizziState;
}

export interface ResponsePayload {
    error?: boolean;
    code?: string;
    message?: string;
};
