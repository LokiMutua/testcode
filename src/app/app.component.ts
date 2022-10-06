import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Event {
  id: Number,
  price: Number,
  city: string,
  name: string,
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Events Application';
  events: Event[] = [];
  _eventsUrl = '../assets/events.json';
  searchPrice: string = '';
  searchCity = '';
  filterData:Event[] = [];

  constructor(private http:HttpClient ){}

  ngOnInit(): void {
    this.http.get<any>(this._eventsUrl).subscribe(data => {
      this.events = data.events
      this.filterData = data.events;
    })
  }

  public searchEvents(searchText: string, searchPrice: string){
    searchText.toLowerCase();
    if(searchText && searchPrice){
      this.filterData = this.events.filter(event => event.city.includes(searchText) && eval(event.price.toString() + searchPrice.charAt(0) + Number.parseInt(searchPrice.substring(1))))
    }else{
      if(searchText){
        this.filterData = this.events.filter(event => event.city.includes(searchText));
      }else if(searchPrice){
        this.filterData = this.events.filter(event => eval(event.price.toString() + searchPrice.charAt(0) + Number.parseInt(searchPrice.substring(1))))
      }else{
      this.filterData = this.events;
      }
    }
  }
}
