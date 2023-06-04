import { createReducer, on } from "@ngrx/store";
import { Usuario } from "../core/models";
import { EstablecerUsuarioAutenticado, SacarUsuarioAutenticado } from "./auth.actions";
import { Token } from "@angular/compiler";

export const authFeatureKey = 'auth';

export interface AuthState {
    authUser: Usuario | null;
    token: string | null;
}

const initialState: AuthState = {
    authUser: null,
    token: localStorage.getItem('token') || null,
    
}

export const authReducer = createReducer(
    initialState,

    on(EstablecerUsuarioAutenticado, (currentState, action) => {
        return{
            authUser: action.payload,
            token: action.payload.token,
        }
    }),


    on(SacarUsuarioAutenticado, (currentState) =>{
        return {
            authUser: null,
            token: null,
        }
    })
)