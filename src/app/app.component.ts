import { Component } from '@angular/core';
import {SlimLoadingBarService} from 'ng2-slim-loading-bar';
import { NavigationCancel,
  Event,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router } from '@angular/router';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  loggedIn: boolean;
  constructor(private _loadingBar: SlimLoadingBarService, private _router: Router, private userService: UserService) {
    this._router.events.subscribe((event: Event) => {
      this.navigationInterceptor(event);
    });
    this.loggedIn = userService.loggedIn;
    this.userService.userAction.subscribe((value) => {
      if (value == 'loggedIn') {
        this.loggedIn = true;
      } else {
        this.loggedIn = false;
      }
    });
  }
  private navigationInterceptor(event: Event): void {
    if (event instanceof NavigationStart) {
      this._loadingBar.start();
    }
    if (event instanceof NavigationEnd) {
      this._loadingBar.complete();
    }
    if (event instanceof NavigationCancel) {
      this._loadingBar.stop();
    }
    if (event instanceof NavigationError) {
      this._loadingBar.stop();
    }
  }

  logout() {
    this.userService.logout();
    this._router.navigate(['login']);
  }
}
