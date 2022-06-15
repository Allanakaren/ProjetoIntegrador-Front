import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from '../model/Categoria';
import { Produto } from '../model/Produto';
import { AuthService } from '../service/auth.service';
import { CarrinhoService } from '../service/carrinho.service';
import { CategoriaService } from '../service/categoria.service';
import { ProdutoService } from '../service/produto.service';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css']
})
export class ProdutoComponent implements OnInit {

  produto: Produto = new Produto()

  listaCategorias: Categoria[];
  listaProdutos: Produto[];
  idProd: number

  produtos: Produto;


  constructor(
    public auth: AuthService,
    private prod: ProdutoService,
    private catg: CategoriaService,
    private router: Router,
    private produtoService: ProdutoService,
    private route: ActivatedRoute,

    private carrinho: CarrinhoService,

  ) { }

  ngOnInit(){
    window.scroll(0, 0);
    this.idProd = this.route.snapshot.params['id']
    this.findByIdProduto(this.idProd)

    this.getAllCategorias();
    this.getAllProdutos();
  }

  getAllCategorias() {
    this.catg.getAllCategoria().subscribe((resp: Categoria[]) => {
      this.listaCategorias = resp;
      
    });
  }

  getAllProdutos() {
    this.prod.getAllProduto().subscribe((resp: Produto[]) => {
      this.listaProdutos = resp;
      this.listaProdutos.sort((a, b) => a.preco - b.preco)
    });
  }

  getProdById(id: number){
    this.prod.getByIdProduto(id).subscribe((resp: Produto) =>{
      this.produto = resp;
    })
  }

  findByIdProduto(id: number){
    this.produtoService.getByIdProduto(id).subscribe((resp:Produto)=> {
      this.produto = resp
    })

}

// ! adições para carrinho:

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
