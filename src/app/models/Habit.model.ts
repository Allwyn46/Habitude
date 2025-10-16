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
