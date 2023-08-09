import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-signal-counter',
  templateUrl: './signal-counter.component.html',
  styleUrls: ['./signal-counter.component.scss']
})
export class SignalCounterComponent implements OnInit {

  @Input({ required: true }) Counter!: number;

  constructor() { }

  ngOnInit() {
  }

}
