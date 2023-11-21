import { Component, Inject, inject } from '@angular/core';
import { BasketService } from '../basket/basket.service';
import { ApiService } from '../shared/services/api.service';
import { Product } from './product/product.types';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
})
export class CatalogComponent {
  protected products: Product[] = [];

  protected get basketItems() {
    return this.basketService.basketItems;
  }
  protected basketService = inject(BasketService);

  constructor(
    @Inject('WELCOME_MSG') protected welcomeMsg: string,
    private apiService: ApiService,
  ) {
    this.apiService.getProducts().subscribe((products) => (this.products = products));
    this.apiService.getBasket().subscribe();
  }

  protected get basketTotal(): number {
    return this.basketItems.reduce((total: number, { price }) => total + price, 0);
  }

  protected addToBasket(product: Product): void {
    this.apiService.addToBasket(product.id).subscribe((basketItem) => {
      this.basketItems.push(basketItem);
      this.decreaseStock(product);
    });
  }

  private decreaseStock(product: Product): void {
    product.stock -= 1;
  }

  protected isAvailable(product: Product): boolean {
    return product.stock !== 0;
  }

  protected get isStockEmpty(): boolean {
    return this.products.every(({ stock }) => stock === 0);
  }
}
