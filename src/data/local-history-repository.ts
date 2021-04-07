import { City } from "src/domain/entities/city";
import { HistoryRepository } from "src/domain/services/protocols/history-repository";
import { Storage } from '@ionic/storage-angular';
import { CityRepository } from "src/domain/services/protocols/city-repository";
import { Injectable } from "@angular/core";

@Injectable()
export class LocalHistoryRepository extends HistoryRepository{
    history: City[] = [];
    constructor(private readonly storage: Storage,
        private readonly cityRepo: CityRepository){
        super();
        this.ngOnInit();
    }

    async ngOnInit() {
        await this.storage.create();
    }

    async getHistory(): Promise<City[]> {
        this.history = [];
       var i = 0;
       await this.storage.forEach((value) => {
           this.history.push(value)
           i++;
       })
       return this.history;
    }

    async setHistory(cityId: string) {
        try{
            this.storage.set(cityId, await this.getCityById(Number(cityId)));
          }
          catch{
            console.error();
          }
    }

    async clearHistory(){
        try{
            await this.storage.clear();
            this.history = [];
            return this.history;
        }
        catch{
            console.error();
        }
    }

    getCityById(id: number): Promise<City>{
        return this.cityRepo.getById(id);
    }
}