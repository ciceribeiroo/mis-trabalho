import { City } from "src/domain/entities/city";
import { HistoryRepository } from "src/domain/services/protocols/history-repository";
import { Storage } from '@ionic/storage-angular';
import { CityRepository } from "src/domain/services/protocols/city-repository";
import { Injectable } from "@angular/core";
import { HistoryError } from "src/domain/errors/history.error";

@Injectable()
export class LocalHistoryRepository extends HistoryRepository{
    constructor(private readonly storage: Storage,
        private readonly cityRepo: CityRepository){
        super();
        this.ngOnInit();
    }

    async ngOnInit() {
        await this.storage.create();
    }

    async getHistory(): Promise<City[]> {
        try{
            let history: City[] = [];
            await this.storage.forEach((value) => {
                history.push(value)
            })
            return history;
        }
        catch{
            throw new HistoryError("Erro ao obter as cidades");
        }
    }

    async setHistory(cityId: string) {
        try{
            this.storage.set(cityId, await this.getCityById(Number(cityId)));
          }
          catch{
            throw new HistoryError("Erro ao adicionar cidade");
          }
    }

    async clearHistory(){
        try{
            await this.storage.clear();
            let history: City[] = [];
            return history;
        }
        catch{
            throw new HistoryError("Erro ao limpar histórico");
        }
    }

    getCityById(id: number): Promise<City>{
        //como passar a dependencia do cityRepo pro serviço?
        return this.cityRepo.getById(id);
    }
}