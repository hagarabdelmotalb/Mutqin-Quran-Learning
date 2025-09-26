import { isPlatformBrowser } from '@angular/common';
import { Component, inject, Inject, input, PLATFORM_ID } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';


@Component({
  selector: 'app-navbar',
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
    isDarkMode = false;
    isLogin =input<boolean>(false);
    constructor(@Inject(PLATFORM_ID) private platformId: any) {}

  readonly _AuthService =  inject(AuthService);
  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.isDarkMode = localStorage.getItem('theme') === 'dark';
      this.applyTheme();
    }
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
    this.applyTheme();
  }

  applyTheme() {
    if (this.isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  closeDropdown() {
    const dropdown = document.getElementById("dropdownNavbar");
    dropdown?.classList.add("hidden");
  }


}
