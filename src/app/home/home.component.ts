import { ChangeDetectionStrategy, Component, OnInit, WritableSignal, Signal, signal, computed, effect, Injector, untracked } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import * as _ from 'lodash';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {

  counterSignal: WritableSignal<number> = signal(0, { equal: _.isEqual });
  arrSignal: WritableSignal<string[]> = signal(['mondAy', 'tuEsday', 'wedNEsday']);
  caseSignal: WritableSignal<boolean> = signal(true);
  untrackedCountSignal: WritableSignal<boolean> = signal(false);
  arrModifiedEffect: any;

  computedArrSignal: Signal<string[]> = computed(() => {
    if (this.caseSignal()) {
      return this.arrSignal().map((val) => val.toUpperCase() + ` => Count: ${this.counterSignal()}`);
    } else {
      return this.arrSignal().map((val) => val.toLowerCase());
    }
  })

  constructor(private toastr: ToastrService, private injector: Injector) {
    // this.arrModifiedEffect = effect((effectCleanUpFn) => {
    //   if (this.caseSignal()) {
    //     this.toastr.success(`Total Available Days: ${this.arrSignal().length} and Total Count Available: ${this.counterSignal()}`);
    //   } else {
    //     this.toastr.success(`Total Available Days: ${this.arrSignal().length}`);
    //   }
    // })
  }

  ngOnInit() {
    this.startNotification();
  }

  startNotification() {
    this.arrModifiedEffect = effect((onCleanup) => {
      if (this.caseSignal()) {
        if (this.untrackedCountSignal()) {
          this.toastr.success(`Total Available Days: ${this.arrSignal().length} and Total Count Available: ${untracked(() => { return this.counterSignal() })}`);
        } else {
          this.toastr.success(`Total Available Days: ${this.arrSignal().length} and Total Count Available: ${this.counterSignal()}`);
        }
      } else {
        this.toastr.success(`Total Available Days: ${this.arrSignal().length}`);
      }

      onCleanup(() => {
        this.effectCleanUpFn();
      });

    }, {
      injector: this.injector
    })
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

  toggledCasing() {
    this.caseSignal.update((prev) => !prev);
  }

  toggledNotification() {
    if (this.arrModifiedEffect) {
      this.arrModifiedEffect.destroy();
      this.arrModifiedEffect = null;
    } else {
      this.startNotification();
    }
  }

  toggledTacking() {
    this.untrackedCountSignal.update((prev) => !prev);
  }

  effectCleanUpFn() {
    console.log("effect cleanup triggered!!");
  }

}
