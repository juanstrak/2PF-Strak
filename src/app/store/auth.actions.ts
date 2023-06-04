import {createAction, props} from "@ngrx/store";
import { Usuario } from "../core/models";

export const EstablecerUsuarioAutenticado = createAction(
    '[auth] Establecer usuario',
    props<{ payload: Usuario & {token: string} }>(),
);



export const SacarUsuarioAutenticado = createAction('[auth] Quitar usuario')