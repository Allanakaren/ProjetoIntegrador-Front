import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { UsuarioLogin } from '../model/UsuarioLogin';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuarioLogin: UsuarioLogin = new UsuarioLogin

  constructor(private auth: AuthService,
    private router: Router) { }

  ngOnInit() {
    window.scroll(0,0)
  }

  login(){
    this.auth.login(this.usuarioLogin).subscribe({
      next: (resp: UsuarioLogin) => {
      this.usuarioLogin = resp

      environment.id = this.usuarioLogin.id;
      environment.nome = this.usuarioLogin.nome;
      environment.usuario = this.usuarioLogin.usuario;
      environment.senha = this.usuarioLogin.senha;
      environment.foto = this.usuarioLogin.foto;
      environment.tipo = this.usuarioLogin.tipo;
      environment.token = this.usuarioLogin.token;

      this.auth.nome = this.usuarioLogin.nome

      this.router.navigate(['/inicio'])

    },
    error: erro => {
      if (erro.status == 401) {
        alert('Usuário ou senha está incorreto!')
      }
    },
  });
}
}