import { Injectable } from '@angular/core';
import { toast } from 'ngx-sonner';

@Injectable({
  providedIn: 'root',
})
export class Habitservice {
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
}
