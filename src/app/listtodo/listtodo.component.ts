import { Component, OnInit,Input,Output, EventEmitter  } from '@angular/core';
import { ManagedataService } from '../services/managedata.service';
import { task } from '../../modules/task';

@Component({
  selector: 'listtodo',
  templateUrl: './listtodo.component.html',
  styleUrls: ['./listtodo.component.scss']
})
export class ListtodoComponent implements OnInit {
@Input() tasks:Array<any>
@Output() task= new EventEmitter<any>();
deletedop:any=100
  constructor(private service:ManagedataService) { 


  }

  ngOnInit(): void {
  }
   UpdateTask(value: any) {
    this.task.emit(value);
  }
  confirmDeleteTask(id)
  {
    this.service.deleteTask(id).subscribe(res=>{
         
      this.tasks=  this.tasks.filter(item => item.id !== id);
    })
  }
  deleteTask(id)
  {
   this.deletedop=id
   console.log(this.deletedop)
   /* 
    */
  }
  CompletedTask(task:task)
  {
    task.completed=!task.completed
    this.service.upadteTask(task)    
    .subscribe(response=>{ 
   
  
  },error=>{console.log(error)});
  }
}
