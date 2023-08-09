# OnPush Strategy:

Change Detection will happen only because of 5 scenarios.
_ async pipe is used in the UI to subscribe some observable and some new values arrives.
_ any component Input value's reference has been changed (reference in the sense of objects). => ngOnChange() Hook
_ signal is created in the component and used in the UI and any change has happened to signals value.
_ explicitly invoked markForCheck() method on changeDectectorRef \* Any event handling happened and state has been changed

# Note:

1. If any of such things happening the change detection will happen only on particular onpush strategy used component which trigerred the change detection as well as all the parent component up until the root component.
2. If the global change detection is happening because of some other Default strategy component, all the onpush strategy components will be skipped if they don't have any of the above such events happened.

# POINTS TO DISCUSS:
1. Self-closing tags
2. Flexible ngOnDestroy
3. 
