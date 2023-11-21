import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from '../customer/customer.types';
import { BasketService } from './basket.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
})
export class BasketComponent {
  protected get basketItems() {
    return this.basketService.basketItems;
  }

  protected customer: Customer = { name: '', address: '', creditCard: '' };

  protected basketService = inject(BasketService);

  constructor(private router: Router) {
    this.basketService.fetch().subscribe();
  }

  protected get basketTotal(): number {
    return this.basketService.basketTotal;
  }

  protected checkout(event: Event): void {
    event.stopPropagation();
    event.preventDefault();

    this.basketService.checkoutBasket(this.customer).subscribe(() => this.router.navigate(['']));
  }
}
