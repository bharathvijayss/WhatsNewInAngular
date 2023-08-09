import { ChangeDetectionStrategy, Component, OnInit, WritableSignal, Signal, signal, computed } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {

  counterSignal: WritableSignal<number> = signal(0);
  arrSignal: WritableSignal<string[]> = signal(['mondAy', 'tuEsday', 'wedNEsday']);
  caseSignal: WritableSignal<boolean> = signal(true);

  computedArrSignal: Signal<string[]> = computed(() => {
    if (this.caseSignal()) {
      return this.arrSignal().map((val) => val.toUpperCase());
    } else {
      return this.arrSignal().map((val) => val.toLowerCase());
    }
  })

  constructor() { }

  ngOnInit() {
  }

  updateCount(val: number) {
    this.counterSignal.update((prevValue) => {
      return prevValue + val;
    })
  }

  setCount(val: string) {
    this.counterSignal.set(parseInt(val));
  }

  mutateArr(val: string) {
    this.arrSignal.mutate((prevArr) => {
      prevArr.push(val);
    })
  }

  toggled() {
    this.caseSignal.update((prev) => !prev);
  }

}
