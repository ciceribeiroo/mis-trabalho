import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { City } from 'src/domain/entities/city';
import { SearchCityService } from 'src/domain/services/search-city.service';
import { ToastController } from '@ionic/angular';
import { SearchHistoryService } from 'src/domain/services/search-history-service';
import { LocationService } from 'src/domain/services/location-services';
import { AlertController } from '@ionic/angular';
import { PermissionDeniedLocationError } from 'src/domain/errors/permission-denied-location.error';

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
  lat: any = 0;
  long: any = 0;

  constructor(
    private readonly router: Router,
    private toastCtrl: ToastController,
    private historyService: SearchHistoryService,
    private searchService: SearchCityService,
    private locationService: LocationService,
    public alertController: AlertController
  ) {}
  
  async ionViewDidEnter(){
    try{
      this.lastCities = await this.historyService.getHistory();
    }
    catch(error){
      console.error();
      this.createAlert(error)
    }
  }

  async getLocation(){
    try{
      const city:City = await this.locationService.getCloserCity()
      this.onSelectCity(city.id.toString())
    }
    catch(error){
      if(error instanceof PermissionDeniedLocationError){
        const alert = await this.alertController.create({
          header: 'Atenção',
          subHeader: 'A navegação foi desabilitada pelo usuário',
          message: 'Para utilizar essa funcionalidade, é necessárioo acesso a sua localização',
          buttons: ['Entendi'],
        });
        await alert.present();
      }
      else{
        console.error();
        this.createAlert(error)
      }
    }
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
      this.showHistory = false;
    }
  }

  async clearCache(){
    try{
      this.lastCities = await this.historyService.clearHistory();
      this.createAlert("Histórico removido com sucesso!")   
    }
    catch(error){
      console.error();
      this.createAlert(error)
    }
  }

  async onSelectCity(cityId: string) {
    this.router.navigateByUrl(`/weather/${cityId}`);
    try{
      this.historyService.setHistory(cityId);
    }
    catch(error){
      console.error();
    }
  }
  async createAlert(text: string){
    let toast = this.toastCtrl.create({
      message: text,
      duration: 2000
    })
    ;(await toast).present();
  }
}
