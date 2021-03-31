import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { City } from 'src/domain/entities/city';
import { SearchCityService } from 'src/domain/services/search-city.service';
import { Storage } from '@ionic/storage-angular';
import { ToastController } from '@ionic/angular';

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
    private storage: Storage,
    private toastCtrl: ToastController
  ) {}

  async ngOnInit() {
    await this.storage.create();
    this.loadCache();
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

  async loadCache(){
    /*
        let i = 0;
    while(i < this.key){
      console.log(i);
      var cache: City =  await this.storage.get(i.toString());
      console.log(cache)
      this.lastCities.push(cache);
      i++;
    }
    */
   this.lastCities = [];
   this.storage.forEach((value) => {
    this.lastCities.push(value)
   })
  }

  async clearCache(){
    let toast = this.toastCtrl.create({
      message: 'Historico Limpado!',
      duration: 2000
    })
    ;(await toast).present();
    await this.storage.clear();
    this.lastCities = []
  }

  async onSelectCity(cityId: string) {
    this.router.navigateByUrl(`/weather/${cityId}`);
    try{
      this.storage.set(cityId, await this.searchService.getById(Number(cityId)))
    }
    catch{
      console.error();
    }
  }
}
