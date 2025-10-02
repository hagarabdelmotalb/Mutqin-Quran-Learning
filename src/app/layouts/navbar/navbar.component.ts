import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, inject, Inject, input, PLATFORM_ID } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';
import { initFlowbite } from 'flowbite';


@Component({
  selector: 'app-navbar',
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements AfterViewInit{
    isDarkMode = false;
     userRole: string | null = null;
    isLogin =input<boolean>(false);
    constructor(@Inject(PLATFORM_ID) private platformId: any) {}
    
getRoleName(role: string | null | undefined): string {
  switch (role) {
    case 'STUDENT': return 'طالب';
    case 'TUTOR': return 'معلم';
    case 'PARENT': return 'ولي أمر';
    default: return role || 'غير محدد';
  }
}
  
  readonly _AuthService =  inject(AuthService);
  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.isDarkMode = localStorage.getItem('theme') === 'dark';
      this.applyTheme();
    }
  this.userRole = this._AuthService.getUserRole();
  this._AuthService.userData$.subscribe(user => {
      this.userRole = user?.role || null;
    });
  }
  ngAfterViewInit() {
    initFlowbite();
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
