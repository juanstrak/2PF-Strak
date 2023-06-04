import { Materia } from "../../materias";

export interface Curso {
  id: number;
  materiaId: number;
  fecha_inicio: Date;
  fecha_fin: Date;
}



export interface CursoWithMateria extends Curso {
  materia: Materia;

}

export interface CrearCursoPayload {
  materiaId: number;
  fecha_inicio: Date;
  fecha_fin: Date;
}
