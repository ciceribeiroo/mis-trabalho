import { LocalHistoryRepository } from 'src/data/local-history-repository';
import { City } from '../entities/city';
import { HistoryError } from '../errors/history.error';
import { CityRepository } from './protocols/city-repository';
import { HistoryRepository } from './protocols/history-repository';

export class SearchHistoryService extends HistoryRepository{
    constructor(private readonly historyRepo: LocalHistoryRepository,
        private readonly cityRepo: CityRepository){
        super();
    }
    
    getHistory(): Promise<City[]>{
        try{
            return this.historyRepo.getHistory();
        }
        catch(error){
            throw error;
        }
    }
    async setHistory(cityId: string, city: City = null): Promise<void>{
        try{
            city = await this.cityRepo.getById(Number(cityId))
            this.historyRepo.setHistory(cityId, city);
        }
        catch(error){
            console.log("Pegou erro")
            throw error;
        }  
    }
    clearHistory(){
        try{
            return this.historyRepo.clearHistory();
        }
        catch(error){
            throw error;
        }  
    }
}