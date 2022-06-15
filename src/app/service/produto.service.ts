import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Produto } from '../model/Produto';


@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor(private http: HttpClient) { }

  listaProdutos: Produto[]

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }

  refreshToken() {
    this.token = {
      headers: new HttpHeaders().set('Authorization', environment.token),
    };
  }

  getByIdProduto(id: number): Observable<Produto> {
    return this.http.get<Produto>(`https://compravisse.herokuapp.com/produtos/${id}`, this.token)
  }

  //Método GET: para achar produto de acordo com seu nome, será usado na barra de pesquisa
  getByNomeProduto(nome: string): Observable<Produto[]> {
    return this.http.get<Produto[]>(`https://compravisse.herokuapp.com/produtos/nome/${nome}`, this.token)
  }

  getAllProduto(): Observable<Produto[]>{
    return this.http.get<Produto[]>('https://compravisse.herokuapp.com/produtos', this.token)
  }

  postProduto(produto: Produto): Observable<Produto>{
    return this.http.post<Produto>('https://compravisse.herokuapp.com/produtos', produto, this.token)
  }

  putProduto(produto: Produto): Observable<Produto>{
    return this.http.put<Produto>('https://compravisse.herokuapp.com/produtos', produto, this.token)
  }

  deleteProduto(id: number){
    return this.http.delete(`https://compravisse.herokuapp.com/produtos/${id}`, this.token)
  }


}