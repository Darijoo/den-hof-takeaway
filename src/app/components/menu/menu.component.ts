import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuService, MenuCategory } from '../../services/menu.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit {
  menuService = inject(MenuService);
  categories: MenuCategory[] = [];

  ngOnInit() {
    this.menuService.getCategories().subscribe(cats => {
      if (cats && cats.length > 0) {
        this.categories = cats;
      }
    });
  }
  
  getSpicyArray(level: number | undefined): number[] {
    if (!level) return [];
    return Array(level).fill(0);
  }
}
