import { AppState } from '../features/app/reducer';
import { PackiState } from '../features/packi/reducer';
import { WizziState } from '../features/wizzi/reducer';

export type StoreState = {
    app: AppState;
    packi: PackiState;
    wizzi: WizziState;
}

export interface ResponsePayload {
    error?: boolean;
    code?: string;
    message?: string;
};
