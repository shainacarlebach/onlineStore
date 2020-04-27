import { Directive } from '@angular/core';
import { AsyncValidatorFn, AsyncValidator, NG_ASYNC_VALIDATORS, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthenticationService } from '../../services/authentication.service';

export function TakenNameValidator(authenticationService: AuthenticationService): AsyncValidatorFn {
       return(control: AbstractControl):  Promise<ValidationErrors | null>|  Observable<ValidationErrors | null> => {
             return authenticationService.checkCustomerNameNotTaken(control.value).pipe(map(customers => {
    console.log(customers);
   return (customers && customers.length > 0) ?  {'nameExists': true} : null;
       }
   ));
       };
}

// directive to ensure that name doesn't exist already in db
@Directive({
    selector: '[appValidator],[nameExists][ngModel]',
    providers: [{provide: NG_ASYNC_VALIDATORS, useExisting: ExistingNameValidatorDirective, multi: true}]
  })
  export class ExistingNameValidatorDirective implements AsyncValidator {
    constructor(private authenticationService: AuthenticationService) {  }
    validate(control: AbstractControl):  Promise<ValidationErrors | null> |  Observable<ValidationErrors | null> {
      return TakenNameValidator(this.authenticationService)(control);
    }
  }
