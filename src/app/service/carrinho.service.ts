import { Injectable } from '@angular/core';
import { Produto } from '../model/Produto';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {

  produtos: Produto[] = []
  totalItems: number

  constructor() { }

  adicionar(produto: Produto){
    this.produtos.push(produto)
    this.totalItems = this.produtos.length
  }

  listar(){
    return this.produtos
  }

  limpar(){
    this.produtos = [];
    return this.produtos;
  }

}