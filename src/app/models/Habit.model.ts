import { FormControl } from '@angular/forms';

export interface RegisterFormat {
  username: FormControl<string>;
  password: FormControl<string>;
  confirmPassword: FormControl<string>;
  ismfaactive: FormControl<boolean>;
}

export interface LoginFormat {
  username: FormControl<string>;
  password: FormControl<string>;
}

export interface Verify2faFormat {
  token: FormControl<string>;
}

export interface UpdateUserFormat {
  name: FormControl<string>;
  username: FormControl<string>;
  id: FormControl<string>;
}

export interface AddTodoFormat {
  userid: FormControl<string>;
  title: FormControl<string>;
  description: FormControl<string>;
  category: FormControl<string>;
  date: FormControl<string>;
}
