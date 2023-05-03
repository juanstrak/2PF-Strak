import { Component, Inject, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CursosService } from 'src/app/dashboard/pages/cursos/services/cursos.service';
import { Curso } from 'src/app/dashboard/pages/cursos/cursos.component';
import { Subject, takeUntil } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inscripcion } from 'src/app/core/models/cursos-alumnos';

@Component({
  selector: 'app-curso-detalle',
  templateUrl: './curso-detalle.component.html',
  styleUrls: ['./curso-detalle.component.scss'],
})
export class CursoDetalleComponent implements OnDestroy {
  curso: Curso | undefined = undefined;
  inscripciones: Inscripcion[] | undefined = undefined;

  private destroyed$ = new Subject();

  constructor(
    private dialogRef: MatDialogRef<CursoDetalleComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    if (data) {
      this.curso = data.element;
      this.inscripciones = data.inscs;
    }
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
  }
}
