import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { UserComponent } from './user.component/user.component';
import { UserFormComponent } from './user-form.component/user-form.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'user-app',
  imports: [UserComponent, UserFormComponent],
  templateUrl: './user-app.component.html',
  styleUrls: ['../../styles.css']
})
export class UserAppComponent implements OnInit{
  title: string = 'Listado de Usuarios!';

  users: User[] = [];
  userSelected: User;
  open: boolean = false;

  constructor(
    private service: UserService
  ) {
    this.userSelected = new User();
  }
  ngOnInit(): void {
    this.service.findAll().subscribe(users => this.users = users);
  }

  addUser(user: User): void {
    if(user.id > 0){
      this.users = this.users.map(u => u.id == user.id ? {...user}: u);
    }else 
      this.users = [... this.users, {...user}];
    
    Swal.fire({
      title: "Guardado!",
      text: "Usuario guardado con éxito",
      icon: "success"
    });

    // Borrar datos del user selected
    this.userSelected = new User();
    this.setOpen();   
  }

  removeUser(id: number): void {
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
        Swal.fire({
          title: "Eliminado!",
          text: "Usuario eliminado con éxito.",
          icon: "success"
        });
      }
    });
  }

  setUpateUser(userRow: User): void {
    this.userSelected = {...userRow}; // Desestructurar , crear una copia
    this.open = true;
  }

  setOpen(): void {
    this.open = !this.open;
  }
}
