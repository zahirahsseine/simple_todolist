import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { FormGroup, FormControl,Validators  } from '@angular/forms';
import {ManagedataService}  from '../services/managedata.service'
@Component({
  selector: 'listingtasks',
  templateUrl: './listingtasks.component.html',
  styleUrls: ['./listingtasks.component.scss']
})

export class ListingtasksComponent implements OnInit {
  tasks:any[]
  title = 'todolist';
  showForm=false
  task:any;
  taskForm: FormGroup;
  constructor(private service:ManagedataService) { 
            console.log(this.title)
            this.service.getTasks(1)
            .subscribe(response=>{
                   console.log(response)
                  this.tasks=response
            })
            console.log(this.taskForm)
  }

  ngOnInit(): void {
 this.taskForm = new FormGroup({
    title: new FormControl(''),
    completed: new FormControl(''),
    
  });
 
  }
  onSubmit(taskForm)
{
    
       this.service.createTask(taskForm.value)
      
       .subscribe(response=>{ 
        taskForm.value.id=parseInt(response.id)
        taskForm.value.completed=taskForm.value.completed?taskForm.value.completed:false
        this.tasks.splice(0,0,taskForm.value)
      
      },error=>{console.log(error)});
     
}
newTask()
{
  this.showForm=true
  this.task=null
  console.log(this.task)
 // this.taskForm.reset()
}
setTask(event)
{
   this.task=event;
  this.taskForm.setValue({title: this.task.title, completed: this.task.completed }); 
   this.showForm=true
}
}
