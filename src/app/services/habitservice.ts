import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { toast } from 'ngx-sonner';

@Injectable({
  providedIn: 'root',
})
export class Habitservice {
  http = inject(HttpClient);

  showSuccessToast(title: string, desc: string) {
    toast.success(title, {
      description: desc,
    });
  }

  showErrorToast(title: string, desc: string) {
    toast.error(title, {
      description: desc,
    });
  }

  addtodo(formdata: any) {
    return this.http.post('/api/todo/create', formdata);
  }

  getalltodo(userid: any) {
    return this.http.post('/api/todo/getall', userid);
  }

  updateTodo(formdata: any) {
    return this.http.post('/api/todo/update', formdata);
  }

  deleteTodo(id: any) {
    return this.http.post('/api/todo/delete', id);
  }

  markComplete(id: any) {
    return this.http.post('/api/todo/mark-as-complete', id);
  }
}
