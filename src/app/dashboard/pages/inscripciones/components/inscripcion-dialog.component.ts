import { Component, OnInit, OnDestroy } from '@angular/core';
import { AlumnosService } from '../../alumnos/services/alumnos.service';
import { Alumno } from '../../alumnos/alumnos.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CursosService } from '../../cursos/services/cursos.service';
import { Curso, CursoWithMateria } from '../../cursos/models';
import { DialogRef } from '@angular/cdk/dialog';
import { Subject, takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';
import { CreateInscripcionData } from '../models';
import { InscripcionesActions } from '../store/inscripciones.action';


@Component({
  selector: 'app-inscripcion-dialog',
  templateUrl: './inscripcion-dialog.component.html',
  styleUrls: ['./inscripcion-dialog.component.scss']
})
export class InscripcionDialogComponent implements OnInit, OnDestroy {
  alumnos: Alumno[] = [];
  cursos: CursoWithMateria[] = [];

  selectedCursoControl = new FormControl<Curso | null>(null);

  alumnoIdControl = new FormControl<number | null>(null, [
    Validators.required,
  ]);
  materiaIdControl = new FormControl<number | null>(null, [
    Validators.required,
  ]);
  cursoIdControl = new FormControl<number | null>(null, [Validators.required]);

  incripcionForm = new FormGroup({
    subjectId: this.materiaIdControl,
    studentId: this.alumnoIdControl,
    courseId: this.cursoIdControl,
  });

  destroyed$ = new Subject <void>();

  constructor(
    private alumnosService: AlumnosService,
    private cursosService: CursosService,
    private dialogRef: DialogRef<InscripcionDialogComponent>,
    private store: Store
  ) {
    this.selectedCursoControl.valueChanges
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: (curso) => {
          if (curso) {
            this.materiaIdControl.setValue(curso.materiaId);
            this.cursoIdControl.setValue(curso.id);
          }
        },
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  ngOnInit(): void {
    this.cursosService.obtenerCursosWithMateria().subscribe({
      next: (res) => {
        this.cursos = res;
      },
    });
    this.alumnosService.getAlumnosFromDb().subscribe({
      next: (res) => {
        this.alumnos = res;
      },
    });
  }

  onSave(): void {
    this.store.dispatch(
      InscripcionesActions.createInscripcion({
        data: this.incripcionForm.value as CreateInscripcionData,
      })
    );

    this.dialogRef.close();
  }
}