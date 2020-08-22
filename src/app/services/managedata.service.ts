import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { task } from '../../modules/task';
@Injectable({
  providedIn: 'root'
})
export class ManagedataService {
  configUrl="https://jsonplaceholder.typicode.com/todos"
  constructor(private http: HttpClient) { }
  getTasks(id:any)
  {
    return this.http.get<task[]>(this.configUrl);
  }

  createTask(objTask:any)
  {
    return this.http.post<task>(this.configUrl, JSON.stringify(objTask));
  }
  upadteTask(objTask:any)
  {
    return this.http.put<task>(this.configUrl+"/"+objTask.id, JSON.stringify(objTask));
  }
  deleteTask(id:any)
  {
    return this.http.delete<task>(this.configUrl+"/"+id);
  }
}
