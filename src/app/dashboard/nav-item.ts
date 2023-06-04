export interface NavItem {
  path: string;
  title: string;
  icon?: string;
  rolesPermitidos: string[];
}

const links: NavItem[] = [
  {
    path: 'estudiantes',
    title: 'Estudiantes',
    icon: 'person',
    rolesPermitidos: [],
  },
  {
    path: 'cursos',
    title: 'Cursos',
    icon: 'school',
    rolesPermitidos: ['admin'],

  },
  {
    path: 'inscripciones',
    title: 'inscripciones',
    icon: 'book',
    rolesPermitidos: [],
    
  },
]

export default links;
