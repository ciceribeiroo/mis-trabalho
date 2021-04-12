import { City } from "src/domain/entities/city";
import { HistoryRepository } from "src/domain/services/protocols/history-repository";
import { Storage } from '@ionic/storage-angular';
import { Injectable } from "@angular/core";
import { HistoryError } from "src/domain/errors/history.error";

@Injectable()
export class LocalHistoryRepository extends HistoryRepository{
    constructor(private readonly storage: Storage){
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
            throw new HistoryError("Erro ao obter histórico");
        }
    }

    async setHistory(city: City): Promise<void> {
        try{
            this.storage.set(city.id.toString(), city);
          }
          catch{
            throw new HistoryError("Erro ao adicionar cidade ao histórico");
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
}