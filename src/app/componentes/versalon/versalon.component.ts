import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router,  } from '@angular/router';
import { ApiService } from '../../servicios/api.service';

@Component({
  selector: 'app-versalon',
  templateUrl: './versalon.component.html',
  styleUrl: './versalon.component.css'
})
export class VersalonComponent {
  salon: any;
  alumnos: any[] = [];
  formularioCrearAlumno: FormGroup = new FormGroup({});
  update:boolean = false; 

  constructor(
    private fb: FormBuilder,
    private router:ActivatedRoute,
    private api: ApiService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.router.queryParams.subscribe(params => {
      this.salon = params['salon'];
      this.inicializarFomularioAgregar(false, null)      
    })
    
  }

  obtenerAlumnos() {
    
    this.api.obtenerAlumnosEnSalon(Number(this.salon)).subscribe((response: any) => {
      this.alumnos = response;      
    }, error => {
      alert(error.error.mensaje)
      this.route.navigate(["/"])
    })
  }

  inicializarFomularioAgregar(update: boolean, alumno: any): void {
    this.update = update;
    this.formularioCrearAlumno = this.fb.group( {
      idSalon : [this.salon],
      alumno : this.fb.group( {
        id:[update ? alumno.id : null],
        nombre: [update ? alumno.nombre : ''],
        apellidos: [update ? alumno.apellidos: ''],
        edad: [update ? alumno.edad : 0],
        calificacion: [update ? alumno.calificacion : 0],
        estatus: [1]
      })
    })
    

    this.obtenerAlumnos();
  }

  crearAlumno():void {
    this.api.asignarAlumnoSalon(this.formularioCrearAlumno.value).subscribe(response => {
      window.location.reload();
    }, (error: any) => {
      alert((error.error.mensaje == null || error.error.mensaje == undefined) ? error.error : error.error.mensaje )
    })
  }

  getColor(calificacion: number): string {
    if (calificacion <= 5) {
      return 'bg-danger'; 
    } else if (calificacion >= 6 && calificacion <= 7) {
      return 'bg-warning'; 
    } else if (calificacion === 8 || calificacion < 9) {
      return 'bg-yellow'; 
    } else if (calificacion >= 9 && calificacion <= 10) {
      return 'bg-success';
    }
    return '';
  }

  eliminarAlumno(alumno : any) {
    alumno.estatus = 0;    
    this.api.eliminarAlumno(alumno).subscribe((respose: any) => {
      window.location.reload();
    }, (error:any) => {
      console.log(error);
      
    })
  }

  abrirModalActualizar(alumno: any) {    
      this.inicializarFomularioAgregar(true, alumno);
      console.log(this.formularioCrearAlumno.value);
      
  }

  actualizarAlumno() {    
    this.api.actualizarAlumno(this.formularioCrearAlumno.value.alumno).subscribe(response => {
      console.log(response);
      this.obtenerAlumnos();
    }, error => {
      alert((error.error.mensaje == null || error.error.mensaje == undefined) ? error.error : error.error.mensaje )
    })
  }
}
