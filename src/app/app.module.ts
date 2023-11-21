import { HttpClientModule } from '@angular/common/http';
import { InjectionToken, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BasketComponent } from './basket/basket.component';
import { CatalogComponent } from './catalog/catalog.component';
import { ProductComponent } from './catalog/product/product.component';
import { FooterComponent } from './footer/footer.component';
import { MenuComponent } from './menu/menu.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { BasketService } from './shared/services/basket.service';

export const WELCOME_MSG = new InjectionToken<string>('WELCOME_MSG');

@NgModule({
  imports: [BrowserModule, HttpClientModule, AppRoutingModule],
  providers: [
    BasketService,
    {
      provide: 'WELCOME_MSG',
      useValue: 'Bienvenue sur Zenika Ecommerce',
    },
  ],
  declarations: [
    AppComponent,
    BasketComponent,
    CatalogComponent,
    FooterComponent,
    MenuComponent,
    ProductDetailsComponent,
    ProductComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
