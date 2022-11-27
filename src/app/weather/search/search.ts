import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'search-comp',
  templateUrl: './search.html',
  styleUrls: ['./search.css'],
})
export class SearchComponent {

    @Output() newSearchEvent = new EventEmitter<string>();
    constructor() {
        
    }
    searchClick(search: string){
        this.newSearchEvent.emit(search);
    }
}
