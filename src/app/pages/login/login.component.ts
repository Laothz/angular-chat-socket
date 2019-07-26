import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Socket } from 'ngx-socket-io';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  usuario = new FormControl('');

  constructor(private socket: Socket, private router: Router) { }

  ngOnInit() {
    this.socket.fromEvent("logar").subscribe(response => {
      if(response){
        this.router.navigate(['/home']);
      }else{
        // this.snackbar.open("Usuário já existe!");
      }
    })
  }

  submit(){
    this.socket.emit("logar", this.usuario.value);
  }

}
