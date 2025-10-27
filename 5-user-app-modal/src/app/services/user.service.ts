import { Injectable } from '@angular/core';
import {User} from '../models/user';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  private users: User[] = [
    {
      id: 1, name: 'John', lastname: 'Doe', email: 'john@gmail.com', username: 'johndoe', password: 'password'
    },
    {
      id: 2, name: 'Jane', lastname: 'Smith', email: 'jane@gmail.com', username: 'janesmith', password: 'password'
    },
    {
      id: 3, name: 'Alice', lastname: 'Johnson', email: 'alice@gmail.com', username: 'alicej', password: 'password'
    }
  ];

  constructor() { }

  findAll(): Observable<User[]> {
    // of -> lo convierte a un flujo observable que es reactivo (string)
    return of(this.users);
  }
}
