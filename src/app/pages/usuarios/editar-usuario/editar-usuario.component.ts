import { Component, OnInit } from '@angular/core';
import { Usuarios } from '../../../interfaces/Usuarios.interface';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UsuariosService } from '../../../services/usuarios.service';
import { AlertService } from '../../../services/alert.service';
import { DataService } from '../../../services/data.service';
import gsap from 'gsap';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-editar-usuario',
  imports: [
    RouterModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './editar-usuario.component.html',
  styleUrls: []
})
export default class EditarUsuarioComponent implements OnInit {

  public id: string;
  public usuario: Usuarios;
  public usuarioForm: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private usuariosService: UsuariosService,
    private alertService: AlertService,
    private dataService: DataService
  ) { }

  ngOnInit(): void {

    // Animaciones y Datos de ruta
    gsap.from('.gsap-contenido', { y: 100, opacity: 0, duration: .2 });
    this.dataService.ubicacionActual = 'Dashboard - Editando usuario';

    // Formulario reactivo
    this.usuarioForm = this.fb.group({
      usuario: ['', Validators.required],
      apellido: ['', Validators.required],
      nombre: ['', Validators.required],
      dni: ['', Validators.required],
      email: ['', Validators.email],
      role: ['USER_ROLE', Validators.required],
      activo: ['true', Validators.required],
    });

    this.getUsuario(); // Datos iniciales de usuarios

  }

  // Datos iniciales de usuarios
  getUsuario(): void {

    // Se buscan los datos iniciales del usuario a editar
    this.alertService.loading();
    this.activatedRoute.params.subscribe(({ id }) => { this.id = id; });
    this.usuariosService.getUsuario(this.id).subscribe({
      next: (usuarioRes) => {

        this.usuario = usuarioRes;
        const { usuario, apellido, nombre, dni, email, role, activo } = this.usuario;

        this.usuarioForm.patchValue({
          usuario,
          apellido,
          nombre,
          dni,
          email,
          role,
          activo: String(activo)
        });

        this.alertService.close();

      }, error: ({ error }) => this.alertService.errorApi(error.message)
    })

  }

  // Editar usuario
  editarUsuario(): void | boolean {

    const { usuario, apellido, dni, nombre, email } = this.usuarioForm.value;

    // Se verifica que los campos no tengan un espacio vacio
    const campoVacio = usuario.trim() === '' ||
      apellido.trim() === '' ||
      dni.trim() === '' ||
      email.trim() === '' ||
      nombre.trim() === '';

    // Se verifica que todos los campos esten rellenos
    if (this.usuarioForm.status === 'INVALID' || campoVacio) {
      this.alertService.formularioInvalido()
      return false;
    }

    let data: any = this.usuarioForm.value;

    this.alertService.loading();

    this.usuariosService.actualizarUsuario(this.id, data).subscribe({
      next: () => {
        this.alertService.close();
        this.router.navigateByUrl('dashboard/usuarios');
      }, error: ({ error }) => this.alertService.errorApi(error.message)
    })

  }

  // Funcion del boton regresar
  regresar(): void {
    this.router.navigateByUrl('/dashboard/usuarios');
  }

}
