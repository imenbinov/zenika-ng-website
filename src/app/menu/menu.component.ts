import { Component, inject } from '@angular/core';
import { BasketService } from '../basket/basket.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
})
export class MenuComponent {
  protected get numberOfBasketItems() {
    return this.basketService.getNumberOfItems();
  }

  protected basketService = inject(BasketService);
}
