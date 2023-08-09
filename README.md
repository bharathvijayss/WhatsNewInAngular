# OnPush Strategy - Change Detection will happen only because of 5 scenarios:

1. async pipe is used in the UI to subscribe some observable and some new values arrives.
2. any component Input value's reference has been changed (reference in the sense of objects). => ngOnChange() Hook
3. signal is created in the component and used in the UI and any change has happened to signals value.
4. explicitly invoked markForCheck() method on changeDectectorRef
5. Any event handling happened and state has been changed

# OnPush Strategy - Notes:

1. If any of above 5 scenarios happening then the change detection will happen for entire component tree.
2. If the change detection is happening, all the onpush strategy components will be skipped if they don't have any of the above such events happened (5 scenarios).
3. But If some of the onpush strategised components are having some changes which fall under the above 5 scenarios then all the parent components even though they are onpush strategised component and that particular component which has a change also will come under change detection along with all other child components which are of default strategy but comes under any of these onpush strategised component as a child.
4. Modifying input properties in TypeScript code by using an API like @ViewChild or @ContentChild won't trigger change detection for onpush strategy components.

# Signals - Notes:

1. Computed signals are both lazily evaluated and memoized (So it's safe to perform computationally expensive derivations inside it)
2. Computed signals are not writable signals
3. Computed signal and Effects dependencies are dynamic
4. Effects always run at least once.
5. Avoid using effects for propagation of state changes. This can result in ExpressionChangedAfterItHasBeenChecked errors, infinite circular updates, or unnecessary change detection cycles.
   Because of these risks, setting signals is disallowed by default in effects, but can be enabled if absolutely necessary.
6. By default, registering a new effect with the effect() function requires an injection context (access to the inject function). The easiest way to provide this is to call effect within a component, directive, or service constructor. If effect needs to be created outside then provide injector as a option while creating effect.
7. Signals, Computed Signals, Effects are scoped to its parent and will get destroy along with its parent.
8. If the { manualCleanup: true } is passed as a param in effect then the effect will not be automatically destroyed along with its parent so we have to destroy it.
9. If the { allowSignalWrites: true } is passed as a param in effect then the effect will allow us to set/write values to a signal inside it.
10. When creating a Writable signal (or) Computed Signal, you can optionally provide an equality function as a option param, which will be used to check whether the new value is actually different than the previous one and the signal won't trigger any update if both are same. For writable signals, .mutate() does not check for equality because it mutates the current value without producing a new reference.
11. To Read Signal Values without tracking dependencies use untracked function inside either computed/effect. It is very much useful when an effect needs to invoke some external code like service function which is havging some signal read inside which shouldn't be treated as a dependency.
12. Effects might start long-running operations, which should be cancelled if the effect is destroyed or runs again before the first operation finished. When you create an effect, your function can optionally accept an onCleanup function as its first parameter. This onCleanup function lets you register a callback that is invoked before the next run of the effect begins, or when the effect is destroyed.

# RXJS - InterOp - Notes:

1. The toSignal function creates a signal which tracks the value of an Observable. It behaves similarly to the async pipe in templates, but is more flexible and can be used anywhere in an application. Like the async pipe, toSignal subscribes to the Observable immediately, which may trigger side effects. The subscription created by toSignal automatically unsubscribes from the given Observable upon destruction of the component in which toSignal is called.
2. If an Observable used in toSignal produces an error, that error is thrown when the signal is read. If an Observable used in toSignal completes, the signal continues to return the most recently emitted value before completion.
3. Options available for toSignal() is { initialValue, requireSync, manualCleanup }
4. The toObservable utility creates an Observable which tracks the value of a signal. The signal's value is monitored with an effect, which emits the value to the Observable when it changes.
5. toObservable uses an effect to track the value of the signal in a ReplaySubject. On subscription, the first value (if available) may be emitted synchronously, and all subsequent values will be asynchronous. Unlike Observables, signals never provide a synchronous notification of changes. Even if your code updates a signal's value multiple times, effects which depend on its value run only after the signal has "settled". 
6. toObservable by default needs to run in an injection context, such as during construction of a component or service. If an injection context is not available, an Injector can instead be explicitly specified.

# POINTS TO DISCUSS:

1. Self-closing tags
2. Flexible ngOnDestroy
3. Signal and RxJs Interop
4. Required inputs
5. ES Build + Vite
6.
