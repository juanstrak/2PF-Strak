import { Alumno } from '../../alumnos/alumnos.component';
import { Curso } from '../../cursos/models';
import { Materia } from '../../materias';
export interface Inscripcion {
    id: number;
    studentId: number;
    cursoId: number;
    materiaId: number;

}

export interface InscripcionWithAlumno extends Inscripcion {
    alumno: Alumno; 

}

export interface InscripcionWithMateria extends Inscripcion {
    materia: Materia;
}
export interface InscripcionWithCurso extends Inscripcion {
    curso: Curso;

}

export interface CreateInscripcionData {
    studentId: number;
    cursoId: number;
    materiaId: number;
}

export type InscripcionWithAll = InscripcionWithAlumno & InscripcionWithCurso & InscripcionWithMateria;