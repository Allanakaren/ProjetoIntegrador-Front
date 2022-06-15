import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Categoria } from '../model/Categoria';


@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(private http: HttpClient) {}

  token = {
    headers: new HttpHeaders().set('Authorization',environment.token)
  }

  refreshToken() {
    this.token = {
      headers: new HttpHeaders().set('Authorization', environment.token),
    };
  }

  

// *Métodos Http*

//Método GET: Aqui busca todos os temas:
  getAllCategoria(): Observable<Categoria[]>{
    return this.http.get<Categoria[]>('https://compravisse.herokuapp.com/categorias')
  }

              //Aqui busca por id do tema:
  getByIdCategoria(id: number): Observable<Categoria>{
    return this.http.get<Categoria>(`https://compravisse.herokuapp.com/categorias/${id}`)
  }

  //Método GET: busca categoria pela sua descricao, será usado para buscar produtos dentro dessa categoria
  getByDescricaoCategoria(descricao: string): Observable<Categoria>{
    return this.http.get<Categoria>(`https://compravisse.herokuapp.com/categorias/categoria/${descricao}`)
  }


//Método POST: Aqui insere novos temas:
postCategoria(categoria: Categoria): Observable<Categoria>{
  return this.http.post<Categoria>('https://compravisse.herokuapp.com/categorias', categoria,this.token)
}

//Método PUT: Aqui atualiza por tema:
putTema(categoria: Categoria): Observable<Categoria>{
  return this.http.put<Categoria>('https://compravisse.herokuapp.com/categorias', categoria, this.token)
}

//Método DELETE: Aqui exclui:
deleteCategoria(id: number) {
  return this.http.delete(`https://compravisse.herokuapp.com/categorias/${id}`, this.token)
}

}
