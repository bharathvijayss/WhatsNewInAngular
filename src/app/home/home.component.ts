import { ChangeDetectionStrategy, Component, OnInit, WritableSignal, signal } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {

  counterSignal: WritableSignal<number> = signal(0);

  constructor() { }

  ngOnInit() {

  }

  changeCount(val: number) {
    this.counterSignal.update((prevValue) => {
      return prevValue + val;
    })
  }

}