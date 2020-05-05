import { Directive,forwardRef } from '@angular/core';
import { AsyncValidatorFn, AsyncValidator, NG_ASYNC_VALIDATORS, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductService } from '../../../services/product.service';

export function TakenCodeValidator(productService: ProductService): AsyncValidatorFn {
  return(control: AbstractControl):  Promise<ValidationErrors | null>|  Observable<ValidationErrors | null> => {
        return productService.checkCodeNotTaken(control.value).pipe(map(products => {
console.log(products);
return (products && products.length > 0) ?  {'codeExists': true} : null;
  }
));
  };
}
// directive to ensure code does not exist
@Directive({
  selector: '[appExistingcodevalidator],[codeExists][ngModel]',
  providers: [{provide: NG_ASYNC_VALIDATORS,
    useExisting:ExistingcodevalidatorDirective,
     multi: true}]

})
export class ExistingcodevalidatorDirective implements AsyncValidator {
    constructor(private productService: ProductService) {  }
    validate(control: AbstractControl):  Promise<ValidationErrors | null> |  Observable<ValidationErrors | null> {
      return TakenCodeValidator(this.productService)(control);
    }


}
