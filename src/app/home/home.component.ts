import { ChangeDetectionStrategy, Component, OnInit, WritableSignal, Signal, signal, computed, effect, Injector, untracked } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import * as _ from 'lodash';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { interval, Observable } from 'rxjs';

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

  intervalSignal!: Signal<number | undefined>;
  counterObservable$!: Observable<number>;

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
    this.ObservableToSignal();
    this.signalToObservable();
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
    /*
    this.counterSignal.set(parseInt(val));
    this.counterSignal.set(parseInt(val));

    For toObservable even though we are setting the value of signal two times here the observable will emit only the second emited value
    as it will not emit values synchronously like Regular Observable.
    */
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

  ObservableToSignal() {
    // requireSync should be used only when the observable can emit value synchronously say for example behaviour or replay subject.
    // if initialvalue is not given by default undefined will be used as initialValue.
    /*
    If the observable need not to be unsubscribed along with the component destruction manualcleanup should be true, if it is false either the toSignal conversion
    should be within injection context such as constructor or an explicit injector should be passed as a param.
    */
    let toSignalOptions = {
      // manualCleanup: true,
      initialValue: -1,
      // requireSync: true,
      injector: this.injector
    }
    this.intervalSignal = toSignal(interval(1000), toSignalOptions);
  }

  signalToObservable() {
    this.counterObservable$ = toObservable(this.counterSignal, { injector: this.injector });
    /*
    As toObservable uses ReplaySubject behind the scene whomever subscribe at a later point of time will always get the latest emitted value
    when they subscribe even they are subscribing to the observable.
    */
    this.counterObservable$.subscribe({
      next: val => this.toastr.info(`Counter Value Updated to ${val}`),
      error: err => { },
      complete: () => { }
    })
  }
}
