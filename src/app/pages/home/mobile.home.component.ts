export const mobile = `
  <div class="ui row mobile tablet only" id="main_trend" style="padding: 30px">
    <flux-auth [login-callback]="login"(auth-action-payload)="auth($event)" [signUp-callback]="signUp" *ngIf="!dashboard" [hidden]="!mobileDefault"></flux-auth>
    <flux-feed (item-reply)="_coreSvc.create($event)" [hidden]="mobileDefault" [post-list]="trends | async"></flux-feed>
  </div>
`