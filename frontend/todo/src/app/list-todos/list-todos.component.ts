import { TodoDataService } from './../service/data/todo-data.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BasicAuthenticationService } from '../service/basic-authentication.service';


export class Todo {
  constructor(
    public id: number,
    public description: string,
    public done: boolean,
    public targetDate: Date
  ){

  }
}

@Component({
  selector: 'app-list-todos',
  templateUrl: './list-todos.component.html',
  styleUrls: ['./list-todos.component.css']
})
export class ListTodosComponent implements OnInit {

  todos: Todo[]

  message: string
  adminOrNot:boolean = false
  userType = this.basicAuthenticationService.getAuthenticatedUser()
  
  // = [
  //   new Todo(1, 'Learn to Dance', false, new Date()),
  //   new Todo(2, 'Become an Expert at Angular', false, new Date()),
  //   new Todo(3, 'Visit India', false, new Date())
  //   // {id : 1, description : },
  //   // {id : 2, description : ''},
  //   // {id : 3, description : 'Visit India'}
  // ]

  // todo = {
  //     id : 1,
  //     description: 'Learn to Dance'
  // }

  constructor(
    private todoService:TodoDataService,
    private router : Router,
    private basicAuthenticationService : BasicAuthenticationService
  ) { 
    console.log("UserType: "+this.userType)
    if(this.userType === 'CapgeminiLBS')
    {
     // this.adminOrNot = 'CapgeminiLBS' //admin
     this.adminOrNot = true
    }
    else
    {
      //this.adminOrNot = 'UserLBS' //non-admin
      this.adminOrNot = false
    }
  }

  ngOnInit() {
    this.refreshTodos();
  }

  refreshTodos(){
  
    //console.log('adminOrNot: '+this.adminOrNot)
    //this.todoService.retrieveAllTodos(this.userType).subscribe(
    this.todoService.retrieveAllTodosId().subscribe(
      response => {
        console.log(response);
        this.todos = response;
      }
    )
  }

  deleteTodo(id) {
    console.log(`delete todo ${id}` )
    this.todoService.deleteTodo(this.userType, id).subscribe (
      response => {
        console.log(response);
        this.message = `Deleted Successfully`;
        this.refreshTodos();
      }
    )
  }

  updateTodo(id) {
    console.log(`update ${id}`)
    this.router.navigate(['todos',id])
  }

  addTodo() {
    this.router.navigate(['todos',-1])
  }
}
