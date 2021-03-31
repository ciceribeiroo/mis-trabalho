import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { City } from 'src/domain/entities/city';
import { SearchCityService } from 'src/domain/services/search-city.service';
import { ToastController } from '@ionic/angular';
import { CacheService } from 'src/domain/services/cache-service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  cities: City[];
  hasError: boolean = false;
  errorMessage: string;
  lastCities: City[] =[];
  showHistory: boolean = true;

  constructor(
    private readonly searchService: SearchCityService,
    private readonly router: Router,
    private toastCtrl: ToastController,
    private cacheService: CacheService
  ) {
  }
  async ionViewDidEnter(){
    this.lastCities = await this.cacheService.loadCache();
  }

  async onSearch(query: string) {
    try {
      this.hasError = false;
      this.cities = await this.searchService.search(query);
      if(this.cities.length !=0){
        this.showHistory = false;
      }
      else{
        this.showHistory = true;
      }
    } catch (error) {
      this.hasError = true;
      this.errorMessage = error.message;
    }
  }

  async clearCache(){
    this.lastCities = await this.cacheService.clearCache();
    let toast = this.toastCtrl.create({
      message: 'Historico Limpado!',
      duration: 2000
    })
    ;(await toast).present();
  }

  async onSelectCity(cityId: string) {
    this.router.navigateByUrl(`/weather/${cityId}`);
    this.cacheService.setCache(cityId);
  }
}
