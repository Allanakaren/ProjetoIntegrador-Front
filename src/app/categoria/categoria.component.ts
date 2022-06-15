import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Categoria } from 'src/app/model/Categoria';
import { Produto } from '../model/Produto';
import { CarrinhoService } from '../service/carrinho.service';
import { CategoriaService } from '../service/categoria.service';
import { ProdutoService } from '../service/produto.service';


@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {

  categoria: Categoria = new Categoria()
  idCategoria: number
  listaProduto: Produto []
  produto: Produto = new Produto()
  
  
  constructor(
    private categoriaService: CategoriaService,    
    private route: ActivatedRoute,
    private carrinho: CarrinhoService,
    private prod: ProdutoService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(({id}) => this.findByIdTema(id))
    this.idCategoria = this.route.snapshot.params['id']
    this.findByIdTema(this.idCategoria)
    this.categoria.produto = this.listaProduto    
  }

  findByIdTema(id: number){
    this.categoriaService.getByIdCategoria(id).subscribe((resp: Categoria)=>{
      this.categoria = resp
      console.log(this.categoria)
    })
  }

  getProdutoById(id: number){
    this.prod.getByIdProduto(id).subscribe((resp: Produto) =>{
      this.produto = resp;
      this.addProduto()
    })
  }

  addProduto(){
    this.carrinho.adicionar(this.produto)
  }

}


