import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../servicios/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {
  fomularioAgregarGrupo: FormGroup = new FormGroup({});
  grupos: any[] = [];

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private api: ApiService
  ) {}

  ngOnInit(): void {
    this.inicializarFormulario();
    this.obtenerGrupos();
  }

  private inicializarFormulario(): void {
    this.fomularioAgregarGrupo = this.fb.group( {
      grado: ['', Validators.required], 
      grupo: ['', Validators.required]
    })
  }

  private obtenerGrupos() {
    this.api.getGrupos().subscribe((response: any) => {
      console.log(response);
      this.grupos = response;
    }, error => {
      console.log(error);
      
    })
  }

  crearGrupo():void {
    console.log("creando grupo");
    console.log(this.fomularioAgregarGrupo.value);
    this.api.crearGrupo(this.fomularioAgregarGrupo.value).subscribe(response => {
      window.location.reload();
      
    }, error => {
      alert(error.error.mensaje)
      
    })
  }

  verAlumnos(salon:any):void {
    this.router.navigate(['/salon'], {queryParams: {salon: salon.id}})
  }
}
