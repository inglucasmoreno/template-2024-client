import { Injectable } from '@angular/core';
import { environments } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

const baseUrl = environments.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http: HttpClient) { }

  // Usuario por ID
  getUsuario(id: string): Observable<any> {
    return this.http.get(`${baseUrl}/usuarios/${id}`, {
      headers: {
        'Authorization': localStorage.getItem('token')
      }
    }).pipe(
      map((resp: any) => resp.usuario)
    )
  }

  // Listar usuarios
  listarUsuarios(direccion: number = 1, columna: string = 'apellido'): Observable<any> {
    return this.http.get(`${baseUrl}/usuarios`, {
      params: {
        direccion: String(direccion),
        columna
      },
      headers: {
        'Authorization': localStorage.getItem('token')
      }
    })
  }

  // Nuevo usuario
  nuevoUsuario(data: any): Observable<any> {
    return this.http.post(`${baseUrl}/usuarios`, data, {
      headers: {
        'Authorization': localStorage.getItem('token')
      }
    })
  }

  // Actualizar usuario
  actualizarUsuario(id: string, data: any): Observable<any> {
    return this.http.patch(`${baseUrl}/usuarios/${id}`, data, {
      headers: {
        'Authorization': localStorage.getItem('token')
      }
    })
  }

  // Actualizar password - Perfil
  actualizarPasswordPefil(id: string, data: any): Observable<any> {
    return this.http.patch(`${baseUrl}/usuarios/password/${id}`, data, {
      headers: {
        'Authorization': localStorage.getItem('token')
      }
    })
  }

}
