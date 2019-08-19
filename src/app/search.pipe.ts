import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(data: any[], searchterm: string): any {
    if(!searchterm){
      return data;
    }
    return data.filter(obj=>
      obj.name.toLowerCase().indexOf(searchterm.toLocaleLowerCase())!=-1||
        obj.area.toLowerCase().indexOf(searchterm.toLocaleLowerCase())!=-1||
        obj.specialization.toLowerCase().indexOf(searchterm.toLocaleLowerCase())!=-1
  
        )
    }
  

}
