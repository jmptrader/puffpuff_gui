export const mobile = `
<div class="ui fixed teal secondary inverted menu">
  <div class="ui container">
    <a [routerLink]="['/feed']" class="header item">
      <img class="logo" src="assets/img/logo.png"> Feed
    </a>
    <div class="right menu">
      <div class="item">
        <div class="ui icon input">
          <input type="text" placeholder="Search...">
          <i class="search link icon"></i>
        </div>
      </div>
    </div>
  </div>
</div>
`