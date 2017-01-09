export const web = `
<div class="ui fixed teal secondary inverted menu">
      <div class="ui container">
        <a [routerLink]="['']" class="header item">
          <img class="logo" src="assets/img/logo.png">
        </a>
        <a class="item" [routerLink]="['/stream']" >Stream</a>
        <div class="right menu">
          <div class="item">
            <div class="ui icon input">
              <input type="text" placeholder="Search...">
              <i class="search link icon"></i>
            </div>
          </div>
          <a [routerLink]="['']" class="ui item">
            sign In
          </a>
        </div>
      </div>
</div>
`