import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { FormControl } from '@angular/forms';
import { async } from 'q';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  user;
  message = new FormControl('');
  usersList = [];
  messagesList = []

  constructor(private socket: Socket) { }

  ngOnInit() {
    this.setEvents();

    this.socket.emit("getUser");
    // this.socket.emit("getUsersList");
  }

  setEvents(){
    this.socket.fromEvent("getUser").subscribe(res => {
      this.user = res;
    });

    this.socket.fromEvent("submitMessage").subscribe(res => {
      this.messagesList.push(res);
      this.delay(5).then(() => {
        var container = document.getElementById("divChat");
        container.scrollTop = container.scrollHeight - container.clientHeight;
      });
    });
    
    // this.socket.fromEvent("getUsersList").subscribe(res => {
    //   console.log(res);
    //   this.usersList = res;
    // });
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  } 

  submit(){
    if(this.message.value != ''){
      this.socket.emit("submitMessage", { user: this.user, message: this.message.value });
      this.message.setValue('');
    }
  }

}
