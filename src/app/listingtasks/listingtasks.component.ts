import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { FormGroup, FormControl,Validators  } from '@angular/forms';
import {ManagedataService}  from '../services/managedata.service'
import { task } from '../../modules/task';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { user } from '../../modules/user';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'listingtasks',
  templateUrl: './listingtasks.component.html',
  styleUrls: ['./listingtasks.component.scss']
})

export class ListingtasksComponent implements OnInit {
 
  title = 'todolist';
  showForm=false
  task:any;
  taskForm = new FormGroup({
    key: new FormControl(''),
    id: new FormControl(''),
    title: new FormControl('',[Validators.required]),
    completed: new FormControl(''),
    idUser: new FormControl('')
  });
  public tasks:task[]=[]

  constructor(private service:ManagedataService,private db:AngularFireDatabase,private toastr: ToastrService) { 
    
   this.loadData()
          
  }

  ngOnInit(): void {

 
  }
  loadData()
  {
    this.tasks.length=0
    this.service.getTasks().then(res=>{this.tasks=res})
  }
  onSubmit(taskForm)
{
    
  if(this.taskForm.valid)
  {
    if(this.task!=null)
    {
        this.service.upadteTask(this.taskForm.value).then(res=>{ this.toastr.success(res,'Message');this.taskForm.reset();  this.loadData();}).catch(error=>{ this.toastr.error(error,'Message')})
    }
    else{
      
      this.service.createTask(this.taskForm.value).then(res=>{ this.toastr.success(res,'Message');this.taskForm.reset();  this.loadData();}).catch(error=>{ this.toastr.error(error,'Message')})
    }
    this.showForm=false        
  }
      
     
}
newTask()
{
  this.showForm=true
  this.task=null
  this.service.setMaxId()
  this.taskForm.controls.id.setValue(this.service.maxId)
  this.taskForm.controls.idUser.setValue(this.service.getcurrentuser())
}
setTask(event)
{
   this.task=event;
  this.taskForm.setValue({key:this.task.key,id:this.task.id,title: this.task.title, completed: this.task.completed ,idUser:this.service.getcurrentuser()}); 
   this.showForm=true
}
}
