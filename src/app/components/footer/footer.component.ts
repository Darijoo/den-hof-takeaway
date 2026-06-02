import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SettingsService, AppSettings } from '../../services/settings.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent implements OnInit {
  currentYear = new Date().getFullYear();
  settingsService = inject(SettingsService);
  settings: AppSettings | null = null;

  ngOnInit() {
    this.settingsService.getSettings().subscribe(s => {
      if (s) {
        this.settings = s;
      }
    });
  }
}
