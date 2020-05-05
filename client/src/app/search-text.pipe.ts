//send search text as input , based on search text the result is fetched
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchText'
})
export class SearchTextPipe implements PipeTransform {

  transform(value: any, args?: any): any {
   if(args){
   var re =new RegExp(args, 'gi');//'gi' for case insensitive and can use 'g' if you want the search to be case sensitive.
   return value.replace (re, "<mark>" +args +"</mark>");
  }
 return value;
}
}
