import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsService, AppSettings } from '../../services/settings.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements OnInit {
  settingsService = inject(SettingsService);
  settings: AppSettings = {
    address: 'Julius De Geyterstraat 245, 2020 Antwerpen',
    phone: '0479 25 92 68',
    openingHours: 'Woe - Zon: 17:00 - 21:00',
    openingHoursExtra: 'Café open vanaf 11u (Ma & Di gesloten)'
  };

  ngOnInit() {
    this.settingsService.getSettings().subscribe(s => {
      if (s) {
        this.settings = s;
      }
    });
  }
}
