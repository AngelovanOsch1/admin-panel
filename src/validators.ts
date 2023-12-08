import { ValidatorFn, AbstractControl } from '@angular/forms';

export class CustomValidators {
  static onlyNumbersValidator() {
    return onlyNumbersValidator();
  }
}

export function onlyNumbersValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;
    if (isNaN(value)) {
      return { onlyNumbers: true };
    }
    return null;
  };
}
