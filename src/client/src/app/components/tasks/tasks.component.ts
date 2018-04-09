import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../Task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  tasks: Task[];
  title: string;

  constructor(private taskService: TaskService) { 
    this.taskService.getTask().subscribe(tasks => {
      this.tasks = tasks;
    });
  }

  ngOnInit() {
  }

  addTask(event){
    event.preventDefault();   // Evita refrescar la página cuando envie el formulario
    const newTask: Task = {
      title: this.title,
      isDone: false
    };

    this.taskService.addTask(newTask).subscribe(task => {
      this.tasks.push(task);
    });

    this.title = "";
  }

  deleteTask(id){
    const response = confirm('Are you sure to delete it?');
    if(response){
      const tasks = this.tasks;
      this.taskService.deleteTask(id).subscribe(data => {
        if(data.n == 1){
          for(let i = 0; i < tasks.length; i++){
            if(tasks[i]._id == id){
              tasks.splice(i, 1);
            }
          }
        }
      });
    } 

    return;
  }

  updateTask(task: Task){
    const newTask = {
      _id: task._id,
      title: task.title,
      isDone: !task.isDone
    };
    
    this.taskService.updateTask(newTask).subscribe(res => {
      task.isDone = !task.isDone;
    });
  }


}
