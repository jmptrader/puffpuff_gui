export const web = `<div class="ui fixed teal secondary inverted menu">
      <div class="ui container">
        <a [routerLink]="['/feed']" class="header item">
          <img class="logo" src="assets/img/logo.png">
          puffpuff.com.ng Feed
        </a>
        <a [routerLink]="['/stream']" class="item">Stream</a>
        <a  class="item">Profile</a>
        <div class="right menu">
          <div class="item">
            <div class="ui icon input">
              <input type="text" placeholder="Search...">
              <i class="search link icon"></i>
            </div>
          </div>
          <a class="ui item">
            Logout
          </a>
        </div>
      </div>
    </div>`