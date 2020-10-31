import { AbstractControl } from '@angular/forms';
export function ValidateAmount(control: AbstractControl): { invalidAmount: boolean } {
    // if (!control.value.includes('@')) {
    //     return { invalidAmount: true };
    // }
    const PHONE_REGEXP =/^\d+(\.\d{1,2})?$/i;
    return !PHONE_REGEXP.test(control.value) ? { invalidAmount: true } : null;
} // ValidateAmount
