import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Categoria } from '../model/Categoria';
import { Produto } from '../model/Produto';
import { Usuario } from '../model/Usuario';
import { AuthService } from '../service/auth.service';
import { CarrinhoService } from '../service/carrinho.service';
import { CategoriaService } from '../service/categoria.service';
import { ProdutoService } from '../service/produto.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  nome = environment.nome
  foto = environment.foto

  nomeProduto: string
  nomeCategoria: string
  produtosPorCategoria: string

  listaProduto: Produto[]
  listaCategoria: Categoria[]

  usuario: Usuario = new Usuario()

  id = environment.id


  constructor(
    private router: Router,
    public auth: AuthService,
    private produtoService: ProdutoService,
    private categoriaService: CategoriaService,
    public carro: CarrinhoService
  ) { }

  ngOnInit() {
    this.getAllCategorias()
  }

  nomeUsuario(){
    this.usuario.nome = this.nome
    return this.usuario.nome
  }

  getAllCategorias() {
    this.categoriaService.getAllCategoria().subscribe((resp: Categoria[]) => {
      this.listaCategoria = resp;
    });
  }
  
  findByNomeProduto(){
    if(this.nomeProduto == ''){
      this.produtoService.getAllProduto().subscribe((resp: Produto[])=> {
        this.produtoService.listaProdutos = resp
      })
    } else{
      this.produtoService.getByNomeProduto(this.nomeProduto).subscribe((resp: Produto[])=>{
        this.produtoService.listaProdutos = resp
      })
    }
  }  

  sair(){
    this.router.navigate(['/login'])
    environment.token = ''
    environment.nome = ''
    environment.foto = ''
    environment.id = 0
  }
}
