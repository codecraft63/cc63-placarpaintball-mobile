import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "filter",
  pure: false
})
export class ArrayFilterPipe implements PipeTransform {

  inArray(data: Array<any>, needle: any) {
    for (let item in data) {
      if (data[item] === needle) {
        return true;
      }
    }

    return false;
  }
  
  transform(items: Array<any>, conditions: {[field: string]: any}): Array<any> {
    return items.filter(item => {
      for (let field in conditions) {
        if (conditions[field] instanceof Array) {
          return this.inArray(conditions[field], item[field]);
        }
        else if (item[field] !== conditions[field]) {
          return false;
        }
      }
      return true;
    });
  }
}
