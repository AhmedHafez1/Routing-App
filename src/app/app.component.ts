import { MessageService } from './messages/message.service';
import { Component } from '@angular/core';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
  Event,
} from '@angular/router';

import { AuthService } from './user/auth.service';

@Component({
  selector: 'pm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  pageTitle = 'Acme Product Management';
  loading = false;

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  get userName(): string {
    if (this.authService.currentUser) {
      return this.authService.currentUser.userName;
    }
    return '';
  }

  get isMessagesDisplayed(): boolean {
    return this.messageService.isMessagesDisplayed;
  }

  constructor(
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {
    router.events.subscribe((routerEvent: Event) =>
      this.checkRouterEvent(routerEvent)
    );
  }

  checkRouterEvent(event: Event): void {
    if (event instanceof NavigationStart) {
      this.loading = true;
    } else if (
      event instanceof NavigationEnd ||
      event instanceof NavigationCancel ||
      event instanceof NavigationError
    ) {
      this.loading = false;
    }
  }

  logOut(): void {
    this.authService.logout();
    this.router.navigateByUrl('/welcome');
  }

  showMessages() {
    this.router.navigate([{ outlets: { popup: ['messages'] } }]);
    this.messageService.isMessagesDisplayed = true;
  }

  hideMessages() {
    this.router.navigate([{ outlets: { popup: [] } }]);
    this.messageService.isMessagesDisplayed = false;
  }
}
