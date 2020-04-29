import { Directive ,forwardRef } from '@angular/core';
import { AsyncValidatorFn, AsyncValidator, NG_ASYNC_VALIDATORS, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthenticationService } from '../../services/authentication.service';

 export function TakenIdValidator(authenticationService: AuthenticationService): AsyncValidatorFn {
        return(control: AbstractControl):  Promise<ValidationErrors | null>|  Observable<ValidationErrors | null> => {
              return authenticationService.checkCustomerIdNotTaken(control.value).pipe(map(customers => {
     console.log(customers);
    return (customers && customers.length > 0) ?  {'idExists': true} : null;
        }
    ));
        };
 }

 // directive to ensure that customer id doesn't exist already in db
@Directive({
     selector: '[appUniqueId],[idExists][ngModel]',
     providers: [{provide: NG_ASYNC_VALIDATORS,
      useExisting:ExistingIdValidatorDirective,
       multi: true}]
   })
   export class ExistingIdValidatorDirective implements AsyncValidator {
     constructor(private authenticationService: AuthenticationService) {  }
     validate(control: AbstractControl):  Promise<ValidationErrors | null> |  Observable<ValidationErrors | null> {
       return TakenIdValidator(this.authenticationService)(control);
     }
   }
