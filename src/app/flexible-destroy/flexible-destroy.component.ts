import { Component, OnInit, DestroyRef } from '@angular/core';
import { interval } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-flexible-destroy',
  templateUrl: './flexible-destroy.component.html',
  styleUrls: ['./flexible-destroy.component.scss']
})
export class FlexibleDestroyComponent implements OnInit {

  counter1: number = 0;
  counter2: number = 0;

  constructor(private destroyRef: DestroyRef) {
    interval(1000).pipe(takeUntilDestroyed()).subscribe({
      next: (val) => {
        this.counter1 = val;
        console.log("constructor " + val);
      },
      error: (err) => { },
      complete: () => { }
    })
  }

  ngOnInit() {
    interval(1000).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (val) => {
        this.counter2 = val;
        console.log("OnInit " + val);
      },
      error: (err) => { },
      complete: () => { }
    })

    this.flexibleDestroyer();
  }

  flexibleDestroyer() {
    this.destroyRef.onDestroy(() => {
      console.log("Destroy Function Called during destroyRef.onDestroy() for cleanup");
    })
  }

}
