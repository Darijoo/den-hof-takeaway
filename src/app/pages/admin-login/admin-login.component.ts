import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './admin-login.component.html'
})
export class AdminLoginComponent {
  email = '';
  password = '';
  error = '';
  loading = false;
  
  authService = inject(AuthService);

  constructor(private router: Router) {}

  async login() {
    if (!this.email || !this.password) {
      this.error = 'Vul aub beide velden in.';
      return;
    }
    
    this.error = '';
    this.loading = true;
    try {
      await this.authService.login(this.email, this.password);
      this.router.navigate(['/admin/dashboard']);
    } catch (e: any) {
      console.error(e);
      this.error = 'Ongeldige inloggegevens. Controleer je e-mail en wachtwoord.';
    }
    this.loading = false;
  }
}
