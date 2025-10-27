import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2';
import { Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar.component/navbar.component';
import { SharingDataService } from '../services/sharing-data.service';

@Component({
  selector: 'user-app',
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './user-app.component.html',
  styleUrls: ['../../styles.css']
})
export class UserAppComponent implements OnInit{
  

  users: User[] = [];

  constructor(
    private router: Router,
    private service: UserService,
    private sharingData: SharingDataService
  ) {
  }
  ngOnInit(): void {
    this.service.findAll().subscribe(users => this.users = users);
    this.addUser();
    this.removeUser();
  }

  addUser(): void {
    this.sharingData.newUserEventEmitter.subscribe(user => {
      if(user.id > 0){
        this.users = this.users.map(u => u.id == user.id ? {...user}: u);
      }else 
        this.users = [... this.users, {...user}];
      this.router.navigate(['/users'], {state: {users: this.users}});
      Swal.fire({
        title: "Guardado!",
        text: "Usuario guardado con éxito",
        icon: "success"
      });
    })
  }

  removeUser(): void {
    this.sharingData.idUserEventEmitter.subscribe(id => {
      Swal.fire({
        title: "¿Seguro que quiere eliminar?",
        text: "Cuidado! El usuario será eliminado permanentemente",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí!"
      }).then((result) => {
        if (result.isConfirmed) {
          this.users = this.users.filter(user => user.id != id);
          this.router.navigate(['/users/create'], {skipLocationChange: true}).then(() => {
            this.router.navigate(['/users'], {state: {users: this.users}});
          });
          Swal.fire({
            title: "Eliminado!",
            text: "Usuario eliminado con éxito.",
            icon: "success"
          });
        }
      });
    })
  }

}
