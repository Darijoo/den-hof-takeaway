import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MenuService, MenuCategory, MenuItem } from '../../services/menu.service';
import { SettingsService, AppSettings } from '../../services/settings.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './admin-dashboard.component.html'
})
export class AdminDashboardComponent implements OnInit {
  menuService = inject(MenuService);
  settingsService = inject(SettingsService);
  
  categories: MenuCategory[] = [];
  isLoaded = false;
  isSeeding = false;

  settings: AppSettings = {
    address: 'Julius De Geyterstraat 245, 2020 Antwerpen',
    phone: '0479 25 92 68',
    openingHours: 'Woe - Zon: 17:00 - 21:00',
    openingHoursExtra: 'Café open vanaf 11u (Ma & Di gesloten)'
  };
  isSettingsLoaded = false;
  isSavingSettings = false;

  getSpicyArray(level: number | undefined): number[] {
    if (!level) return [];
    return Array(level).fill(0);
  }
  
  constructor(private router: Router) {}

  ngOnInit() {
    if (localStorage.getItem('admin_logged_in') !== 'true') {
      this.router.navigate(['/admin']);
      return;
    }

    // Luister naar live veranderingen in de Firestore database
    this.menuService.getCategories().subscribe(cats => {
      this.categories = cats;
      this.isLoaded = true;
    });

    // Luister naar instellingen
    this.settingsService.getSettings().subscribe(settings => {
      if (settings) {
        this.settings = settings;
      }
      this.isSettingsLoaded = true;
    });
  }

  async saveSettings() {
    this.isSavingSettings = true;
    try {
      await this.settingsService.updateSettings(this.settings);
      alert('Instellingen succesvol opgeslagen!');
    } catch (e) {
      console.error(e);
      alert('Opslaan van instellingen mislukt.');
    }
    this.isSavingSettings = false;
  }

  async seedDatabase() {
    this.isSeeding = true;
    const initialData: MenuCategory[] = [
      {
        title: 'Voorgerechten',
        items: [
          { id: 1, name: 'Tom Yum Kung', description: 'Soep met scampi\'s, citroengras, koriander, champignons en Thaise kruiden', price: 12.00, spicyLevel: 1 },
          { id: 2, name: 'Tom Kha Kai', description: 'Kippensoep met kokosmelk, koriander, champignons, citroengras en Thaise kruiden', price: 10.00 },
          { id: 3, name: 'Kuay Tiao', description: 'Traditionele Thaise noedelsoep met sojascheuten, keuze uit: Nua (varkensvlees) of Kai (kip)', price: 10.00 },
          { id: 4, name: 'Kanom Jeeb (Dim Sum)', description: 'Gestoomde deegpakketjes (8 stuks)', price: 10.00 },
          { id: 5, name: 'Kai Sate', description: 'Mals gemarineerde kippenplakjes op bamboestokjes met verse pindasaus (5 stuks)', price: 10.00 },
          { id: 6, name: 'Yam Woon Sen', description: 'Lauwe salade van scampi met citroen, ui, koriander en glasnoedels', price: 16.00, spicyLevel: 2 },
          { id: 7, name: 'Po Pia (loempia\'s)', description: 'Huisgemaakte Thaise lenterolletjes met varkensgehakt, keuze uit: kip, varken, groenten (4 stuks)', price: 9.00 },
          { id: 8, name: 'Po Pia Kung', description: 'Huisgemaakte Thaise lenterolletjes met scampi\'s, geserveerd met zoetzure saus (4 stuks)', price: 11.00 },
          { id: 9, name: 'Peek Kai Tod', description: 'Gebakken kippenvleugeltjes, gemarineerd op Thaise wijze en geserveerd met zoetzure saus (7 stuks)', price: 10.00 },
          { id: 10, name: 'Mix van Thaise hapjes', description: 'Mix van loempia\'s, kippenvleugels, viskoekjes (10 stuks: €15 / 15 stuks: €20)', price: 15.00, hasOptions: true },
          { id: 11, name: 'Samosa', description: 'Heerlijke gefrituurde gerechtjes met een knapperige buitenkant en smaakvolle vulling (kip, curry en groenten)', price: 9.00 },
          { id: 12, name: 'Papaya salad', description: 'Thaise salade', price: 14.00 }
        ]
      },
      {
        title: 'Hoofdgerechten',
        items: [
          { id: 13, name: 'Gaeng Keow Wan - Groene Curry', description: 'Thaise groenten en groene curry. (Kip/varken €15 | Rund €16 | Scampi €18)', price: 15.00, spicyLevel: 1, hasOptions: true },
          { id: 14, name: 'Pad Priao Wan', description: 'Gerecht in zoetzure saus met ui, paprika, tomaatjes en verse ananas. (Kip/varken €15 | Rund €16 | Scampi €18)', price: 15.00, hasOptions: true },
          { id: 15, name: 'Kai Pad Med Mamuang', description: 'Gebakken kip met cashewnoten', price: 15.00 },
          { id: 16, name: 'Gaeng Massaman - Gele Curry', description: 'Smaakvolle massaman curry met kokosmelk en aardappelen. (Kip/varken €15 | Rund €16 | Scampi €18)', price: 15.00, spicyLevel: 1, hasOptions: true },
          { id: 17, name: 'Pad Krapao', description: 'Gesauteerd vlees met verse chili, look en Thaise basilicum. (Kip/varken €15 | Rund €16 | Scampi/Kikkerbillen €18)', price: 15.00, spicyLevel: 2, hasOptions: true },
          { id: 18, name: 'Pad Prik Gaeng', description: 'Wok met boontjes en paprika in een heerlijke rode currysaus. (Kip/varken €15 | Rund €16 | Scampi €18)', price: 15.00, spicyLevel: 1, hasOptions: true },
          { id: 19, name: 'Panang', description: 'Fijngesneden vlees met rode curry, kokosmelk en citroengras. (Kip/varken €15 | Rund €16)', price: 15.00, hasOptions: true },
          { id: 20, name: 'Laab', description: 'Lauwe Thaise salade. (Kip/varken €15 | Rund €16)', price: 15.00, hasOptions: true },
          { id: 21, name: 'Pad Nam Man Hoy', description: 'Wok in oestersaus met verse groenten. (Kip/varken €15 | Rund €16 | Scampi €18)', price: 15.00, hasOptions: true },
          { id: 22, name: 'Yam', description: 'Traditionele Thaise lauwe salade met gegrild vlees, chili, koriander, limoensap. (Kip/varken €15 | Rund €16 | Scampi €18)', price: 15.00, hasOptions: true },
          { id: 23, name: 'Pad Pak Ruanmit', description: 'Verschillende verse groenten in de wok gebakken met oestersaus', price: 13.00 },
          { id: 24, name: 'Pad Thai', description: 'Gebakken rijstnoedels met verse groenten. (Kip/varken €15 | Rund €16 | Scampi €18)', price: 15.00, hasOptions: true },
          { id: 25, name: 'Khao Pad', description: 'Gebakken rijst met verse groenten. (Kip/varken €15 | Rund €16 | Scampi €18)', price: 15.00, hasOptions: true },
          { id: 26, name: 'Kratiem Moo Tod', description: 'Gebakken varkensribbetjes met look en peper (7 stuks)', price: 15.00 },
          { id: 27, name: 'Chu Chee Kung', description: 'Scampi\'s met rode curry, kokosmelk en Thaise kruiden', price: 18.00, spicyLevel: 1 },
          { id: 28, name: 'Kung Pad Phong Karee', description: 'Gebakken scampi\'s met gele curry en groenten', price: 18.00 },
          { id: 29, name: 'Pad Cha', description: 'Keuze uit rundvlees of kikkerbillen, in pikante saus met basilicum, Thaise gember, aubergine en groene peperbolletjes', price: 17.00, spicyLevel: 2 },
          { id: 30, name: 'Lad Na', description: 'Brede rijstnoedels in wok met diverse groenten. (Kip/varken €15 | Rund €16 | Scampi €18)', price: 15.00, hasOptions: true },
          { id: 31, name: 'Pad Kee Mao', description: 'Gebakken brede rijstnoedels in bruine saus met diverse groenten en chili. (Kip/varken €15 | Rund €16 | Scampi €18)', price: 15.00, spicyLevel: 1, hasOptions: true },
          { id: 32, name: 'Pad Khing', description: 'Wok van fijngesneden gember, ui, groenten. (Keuze uit kip of varken)', price: 15.00 },
          { id: 33, name: 'Ongepelde scampi\'s', description: 'Ongepelde scampi\'s (6 stuks) met pikante saus', price: 18.00 }
        ]
      },
      {
        title: 'Supplementen',
        items: [
          { name: 'Rijst', description: '', price: 3.00 },
          { name: 'Saus (klein)', description: '', price: 2.50 },
          { name: 'Saus (groot)', description: '', price: 3.50 },
          { name: 'Kroepoek', description: '', price: 3.00 },
          { name: 'Meeneemvergoeding (doggy bag)', description: '', price: 1.00 },
          { name: 'Mai Thai (aperitief)', description: '', price: 5.50 },
          { name: 'Singha bier', description: '', price: 4.50 }
        ]
      }
    ];

    try {
      await this.menuService.seedDatabase(initialData);
      this.isSeeding = false;
    } catch (e) {
      console.error('Error seeding DB', e);
      this.isSeeding = false;
      alert('Er was een probleem met het opslaan naar Firebase. Heb je Firestore in test mode gezet?');
    }
  }

  // --- EDITING LOGIC ---
  editingItemIndex: number | null = null;
  editingCategory: MenuCategory | null = null;
  editingItem: MenuItem | null = null;

  startEdit(item: MenuItem, index: number, category: MenuCategory) {
    this.editingItem = { ...item };
    this.editingItemIndex = index;
    this.editingCategory = category;
  }

  cancelEdit() {
    this.editingItemIndex = null;
    this.editingCategory = null;
    this.editingItem = null;
  }

  async saveEdit() {
    if (this.editingItemIndex === null || !this.editingCategory || !this.editingCategory.id) return;
    
    const updatedItems = [...this.editingCategory.items];
    updatedItems[this.editingItemIndex] = this.editingItem!;

    try {
      await this.menuService.updateCategory(this.editingCategory.id, { items: updatedItems });
      this.cancelEdit();
    } catch (e) {
      console.error(e);
      alert('Opslaan mislukt');
    }
  }

  logout() {
    localStorage.removeItem('admin_logged_in');
    this.router.navigate(['/admin']);
  }
}
