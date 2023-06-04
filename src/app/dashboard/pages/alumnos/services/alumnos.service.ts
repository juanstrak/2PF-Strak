import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, map } from 'rxjs';
import { Alumno } from '../alumnos.component';
import { HttpClient } from '@angular/common/http';
import { enviroment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {

  // Subject
  private estudiantes2$ = new Subject<Alumno[]>();

  // BehaviorSubject
  private estudiantes$ = new BehaviorSubject<Alumno[]>([
    {
      id: 1,
      nombre: 'Pablo',
      apellido: 'Gonzalez',
      fecha_registro: new Date()
    },
    {
      id: 2,
      nombre: 'Pedro',
      apellido: 'Perez',
      fecha_registro: new Date()
    },
    {
      id: 3,
      nombre: 'Susana',
      apellido: 'Rodriguez',
      fecha_registro: new Date()
    },
  ])

  constructor(private httpClient: HttpClient) { }


  getAlumnosFromDb(): Observable<Alumno[]> {
    return this.httpClient.get<Alumno[]>(`${enviroment.apiBaseUrl}/alumnos`);
  }

  obtenerAlumnos(): Observable<Alumno[]> {
    return this.estudiantes$.asObservable();
  }

  obtenerAlumnoPorId(id: number): Observable<Alumno | undefined> {
    return this.estudiantes$.asObservable()
      .pipe(
        map((alumnos) => alumnos.find((a) => a.id === id))
      )
  }
}
