import { Component } from '@angular/core';
import { RouterOutlet } from "../../../../node_modules/@angular/router/router_module.d-Bx9ArA6K";
import { FooterComponent } from "../footer/footer.component";
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
  selector: 'app-auth-layout',
  imports: [RouterOutlet, FooterComponent, NavbarComponent],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.scss'
})
export class AuthLayoutComponent {

}
