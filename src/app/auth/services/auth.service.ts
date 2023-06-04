import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Pipe } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject, map, catchError, throwError, of } from 'rxjs';
import { Usuario } from 'src/app/core/models';
import { AppState } from 'src/app/store';
import { enviroment } from 'src/environments/environments';
import {Store} from '@ngrx/store'
import { EstablecerUsuarioAutenticado, SacarUsuarioAutenticado } from 'src/app/store/auth.actions';
import { selectAuthState, selectAuthUser } from 'src/app/store/auth.selector';


export interface LoginFormValue {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //private authUser$ = new BehaviorSubject<Usuario | null>(null);

  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private store: Store<AppState>
  ) { }

  obtenerUsuarioAutenticado(): Observable<Usuario | null> {
    return this.store.select(selectAuthUser);
  }

  establecerUsuarioAutenticado(usuario: Usuario, token: string): void{
    this.store.dispatch(EstablecerUsuarioAutenticado({ payload: {...usuario, token } } ) )
  }

  login(formValue: LoginFormValue): void {

    this.httpClient.get<Usuario[]>(
      `${enviroment.apiBaseUrl}/usuarios`,
      {
        params: {
          ...formValue
        }
      }
    ).subscribe({
      next: (usuarios) => {
        const usuarioAutenticado = usuarios[0];
        if (usuarioAutenticado) {
          localStorage.setItem('token', usuarioAutenticado.token)
          this.establecerUsuarioAutenticado(usuarioAutenticado, usuarioAutenticado.token);
          this.router.navigate(['dashboard']);
        } else {
          alert('Usuario y contraseña incorrectos')
        }
      }
    })
  }

  logout(): void {
    localStorage.removeItem('auth-user');
    //this.authUser$.next(null);
    this.store.dispatch(SacarUsuarioAutenticado());
    this.router.navigate(['auth']);
  }



  verificarToken(): Observable<boolean>{
    const token = localStorage.getItem('token');
    return this.httpClient.get<Usuario[]>(
      `${enviroment.apiBaseUrl}/usuarios?token=${token}`,
      {
        headers: new HttpHeaders({
          'Authorization': token || '',
        })

      }
    )
    
    
    .pipe(
      map((usuarios) => {
        const usuarioAutenticado = usuarios[0];
        if (usuarioAutenticado) {
          localStorage.setItem('token', usuarioAutenticado.token)
          this.establecerUsuarioAutenticado(usuarioAutenticado, usuarioAutenticado.token)
        } 
        return !!usuarioAutenticado;
      }),
      catchError ((err) => {
        alert('Vuelva a intentarlo')
        return of(false);
        //return throwError(err);
      })
    )
  }
}
