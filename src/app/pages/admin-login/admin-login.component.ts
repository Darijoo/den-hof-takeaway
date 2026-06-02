import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './admin-login.component.html'
})
export class AdminLoginComponent {
  password = '';
  error = '';

  constructor(private router: Router) {}

  login() {
    // Simpele check voor nu. We kunnen dit later beveiligen via Firebase
    if (this.password === 'denhof123') {
      localStorage.setItem('admin_logged_in', 'true');
      this.router.navigate(['/admin/dashboard']);
    } else {
      this.error = 'Ongeldig wachtwoord';
    }
  }
}
