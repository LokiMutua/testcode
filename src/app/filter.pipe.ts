import { Pipe, PipeTransform } from "@angular/core";

@Pipe({name: 'eventsFilter'})
export class FilterPipe implements PipeTransform {

  transform(events: any[], searchText: string): any[] {
    if(!events){
      return []
    }
    if(!searchText){
      return events;
    }
    searchText.toString();
    return events.filter(it =>
      it.includes(searchText)
    )
  }
}
