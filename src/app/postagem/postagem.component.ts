
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Categoria } from '../model/Categoria';
import { Produto } from '../model/Produto';
import { Usuario } from '../model/Usuario';
import { CategoriaService } from '../service/categoria.service';
import { ProdutoService } from '../service/produto.service';


@Component({
  selector: 'app-postagem',
  templateUrl: './postagem.component.html',
  styleUrls: ['./postagem.component.css']
})
export class PostagemComponent implements OnInit {

  produto: Produto = new Produto()

  categoria: Categoria = new Categoria()
  listaCategoria: Categoria[]
  idCategoria: number

  usuario: Usuario = new Usuario()
  idUsuario = environment.id
  nomeUsuario = environment.nome
  constructor(
    private router: Router,
    private produtoService: ProdutoService,
    private categoriaService: CategoriaService
  ){ }

  ngOnInit(){

    if(environment.token == ''){
      alert('Faça login para inserir um novo produto.')
      this.router.navigate(['/login'])
    }
    
    this.produtoService.refreshToken()
    this.getAllCategoria()
  }
  
 
    getAllCategoria(){
      this.categoriaService.getAllCategoria().subscribe((resp: Categoria[])=>{
        this.listaCategoria = resp })
    }

  findByIdCategoria(){
    this.categoriaService.getByIdCategoria(this.idCategoria).subscribe((resp: Categoria)=>{
      this.categoria = resp})
    }
    
  

  cadastrar(){
    this.categoria.id = this.idCategoria
    this.produto.categoria = this.categoria

    this.usuario.id = this.idUsuario
    this.produto.usuario = this.usuario
    this.produto.fornecedor = this.nomeUsuario

    this.produtoService.postProduto(this.produto).subscribe((resp: Produto)=>{
      this.produto = resp
      alert('Produto adicionado com sucesso!')
      this.produto = new Produto()
    })
   
  }


}