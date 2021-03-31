import { City } from '../entities/city';
import { SearchCityService } from 'src/domain/services/search-city.service';
import { Storage } from '@ionic/storage-angular';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class CacheService {
    cache: City[] = [];

    constructor(
        private storage: Storage, 
        private searchService: SearchCityService
        ){
            this.ngOnInit()
        }

    async ngOnInit() {
        await this.storage.create();
    }

    async loadCache(): Promise<City[]>{
       this.cache = [];
       var i = 0;
       await this.storage.forEach((value) => {
           this.cache.push(value)
           i++;
       })
       return this.cache;

    }

    async clearCache(){
        try{
            await this.storage.clear();
            this.cache = [];
            return this.cache;
        }
        catch{
            console.error();
        }
    }

    async setCache(cityId: string){
        try{
            this.storage.set(cityId, await this.searchService.getById(Number(cityId)));
          }
          catch{
            console.error();
          }
    }
}