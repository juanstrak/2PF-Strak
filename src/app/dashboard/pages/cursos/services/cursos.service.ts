import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, take, tap, mergeMap } from 'rxjs';
import { CrearCursoPayload, Curso, CursoWithMateria } from '../models';
import { HttpClient } from '@angular/common/http';
import { enviroment } from 'src/environments/environments';


const CURSOS_MOCKS: Curso[] = [
  {
    id: 1,
    materiaId: 1,
    fecha_fin: new Date(),
    fecha_inicio: new Date(),
  },
  {
    id: 2,
    materiaId: 2,
    fecha_fin: new Date(),
    fecha_inicio: new Date(),
  },
  {
    id: 3,
    materiaId: 3,
    fecha_fin: new Date(),
    fecha_inicio: new Date(),
  },
];

@Injectable({
  providedIn: 'root',
})
export class CursosService {
  private cursos$ = new BehaviorSubject<Curso[]>(
    []
  );

  constructor(private httpClient: HttpClient) {}

  obtenerCursos(): Observable<Curso[]> {
    return this.httpClient
    .get<Curso[]>(`${enviroment.apiBaseUrl}/cursos?_expand=subject`)
    .pipe(
      tap((cursos) => this.cursos$.next(cursos)),
      mergeMap(() => this.cursos$.asObservable())
    );
  };

  obtenerCursosWithMateria(): Observable<CursoWithMateria[]> {
    return this.httpClient
    .get<CursoWithMateria[]>(`${enviroment.apiBaseUrl}/cursos?_expand=subject`)
  };

  getCursoById(cursoId: number): Observable<Curso | undefined> {
    return this.cursos$.asObservable()
      .pipe(
        map((cursos) => cursos.find((c) => c.id === cursoId))
      )
  }

  crearCurso(payload: CrearCursoPayload): Observable<Curso[]> {
    this.cursos$
      .pipe(
        take(1)
      )
      .subscribe({
        next: (cursos) => {
          this.cursos$.next([
            ...cursos,
            {
              id: cursos.length + 1,
              ...payload,
            },
          ]);
        },
        complete: () => {},
        error: () => {}
      });


    return this.cursos$.asObservable();
  }

  editarCurso(cursoId: number, actualizacion: Partial<Curso>): Observable<Curso[]> {
    this.cursos$
      .pipe(
        take(1),
      )


    return this.cursos$.asObservable();
  }


  eliminarCurso(cursoId: number): Observable<Curso[]> {
    this.cursos$
    .pipe(
      take(1)
    )
    .subscribe({
      next: (cursos) => {
        const cursosActualizados = cursos.filter((curso) => curso.id !== cursoId)
        this.cursos$.next(cursosActualizados);
      },
      complete: () => {},
      error: () => {}
    });

    return this.cursos$.asObservable();
  }
}
