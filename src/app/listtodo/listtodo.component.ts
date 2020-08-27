import { Component, OnInit,Input,Output, EventEmitter  } from '@angular/core';
import { ManagedataService } from '../services/managedata.service';
import { task } from '../../modules/task';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'listtodo',
  templateUrl: './listtodo.component.html',
  styleUrls: ['./listtodo.component.scss']
})
export class ListtodoComponent implements OnInit {
@Input() tasks:Array<any>
@Output() task= new EventEmitter<any>();
deletedop:any=100
  constructor(private service:ManagedataService,private toastr: ToastrService) { 


  }

  ngOnInit(): void {
  }
   UpdateTask(value: any) {
    this.task.emit(value);
  }
  loadData()
  {
    this.tasks.length=0
    this.service.getTasks().then(res=>{this.tasks=res})
  }
  confirmDeleteTask(id)
  { 
    this.service.deleteTask(id).then(res=>{ this.toastr.success(res,'Message'); this.loadData();}).catch(error=>{ this.toastr.error(error,'Message')})
  }
  deleteTask(id)
  {
   this.deletedop=id
  }
  completedTask(task:task)
  {
 
    this.service.setCompletedTask(task.key,!task.completed).then(res=>{ this.toastr.success(res,'Message'); this.loadData();}).catch(error=>{ this.toastr.error(error,'Message')})  
 
  }
}
