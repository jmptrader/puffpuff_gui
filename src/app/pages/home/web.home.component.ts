export const web =
  `
 <div class="ui justified grid" id="main_trend" >
    <div class="ui row">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae nostrum nisi aliquid laborum, ipsa praesentium recusandae tempora fugiat molestias. Ullam obcaecati accusantium odit, reprehenderit ea! Beatae obcaecati ullam eius laboriosam.
      <div class="four wide column" style="padding-top: 75px">
      <flux-auth [login-callback]="login" (auth-action-payload)="auth($event)" [signUp-callback]="signUp" *ngIf="!dashboard"></flux-auth>
      </div>
      <div class="eleven wide column" style="padding-top: 75px">
        <flux-feed (item-reply)="_coreSvc.create($event)" [post-list]="trends | async"></flux-feed>
      </div>
    </div>
  </div>

`