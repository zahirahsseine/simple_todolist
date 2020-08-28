import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { task } from '../../modules/task';
import { AngularFireDatabase } from 'angularfire2/database';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})

export class ManagedataService {
  public tasks:task[]=[]
  maxId=0
  configUrl="https://jsonplaceholder.typicode.com/todos"
  db:AngularFireDatabase
  constructor(private http: HttpClient,private _db:AngularFireDatabase,public auth: AuthService) { 
       this.db=_db
  }
 async getTasks()
  {
    let _this=this
   await this.db.list("/tasks").query.orderByChild("idUser").equalTo(this.auth.getcurrentuser()).once("value",function(res)
    {
      
     res.forEach(function(data) {
       
       if(data)
       {
       
           let Objtask:task=new task()
           _this.maxId=_this.maxId>data.child("id").val()?_this.maxId:data.child("id").val()
           Objtask.id=data.child("id").val()
           Objtask.key=data.key
           Objtask.title=data.child("title").val()
           Objtask.completed=data.child("completed").val()
           _this.tasks.push(Objtask)
       }
     
     });
    })
    return  this.tasks;
  }

   getcurrentuser()
{
  return  this.auth.getcurrentuser()
}
  createTask(objTask:any)
  {
    var message=this.db.database.ref("/tasks").push(objTask).then(res=>{return "Success!Task done"}).catch(error=>{return "Error!Task failed"})
   
    return message;
  }
  upadteTask(objTask:any)
  {
    var message= this.db.database.ref("/tasks/"+objTask.key).update(objTask).then(res=>{return "Success!Task done"}).catch(error=>{return "Error!Task failed"})
 
    return message;
  }
  async deleteTask(key:any)
  {
    return await this.db.database.ref("/tasks/"+key).remove().then(res=>{return "Success!Task done"}).catch(error=>{return "Error!Task failed"});
  }
  setMaxId()
  {
    this.maxId=this.maxId+1
  }
 async setCompletedTask(key,val)
  {
   
    return await this.db.database.ref("/tasks/"+key).child("completed").set(val).then(res=>{return "Success!Task done"}).catch(error=>{return "Error!Task failed"})
  }
}
