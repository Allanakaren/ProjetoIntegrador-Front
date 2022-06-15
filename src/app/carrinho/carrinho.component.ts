import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Produto } from '../model/Produto';
import { Usuario } from '../model/Usuario';
import { AuthService } from '../service/auth.service';
import { CarrinhoService } from '../service/carrinho.service';
import { CategoriaService } from '../service/categoria.service';
import { ProdutoService } from '../service/produto.service';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css']
})
export class CarrinhoComponent implements OnInit {

  usuario: Usuario = new Usuario()

  cep: string
  getCep : string
  produto: Produto

  listaCompras = this.carrinho.listar()
  comprados = this.carrinho.listar();

  constructor(
    private authService: AuthService,
    private router: Router,

    private carrinho: CarrinhoService,
    private prod: ProdutoService,
    private cat: CategoriaService,
    private auth: AuthService
  ) { }

  ngOnInit() {
    window.scroll(0,0)
  }

    sumValue:number=1;
    onClick(){
      this.sumValue=this.sumValue+1;
    }

    offClick(){
      if (this.sumValue == 1) {
        this.sumValue = 1
      } 
      
      else {
        this.sumValue=this.sumValue-1;
      }
    }

    total() {
      return this.comprados.map((item) => +item.preco).reduce((a, b) => a + b, 0);
      
    }
  
    parcela(){
      return this.total()/12
    }
  

    // getCep(){
    //   if(this.cep.length >= 8) {
    //   this.cep.getCep(this.cep).subscribe((resp:any) =>{
    //   this.cep = resp})
    //   }
    //   }
  
}