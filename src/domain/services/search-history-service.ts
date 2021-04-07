import { LocalHistoryRepository } from 'src/data/local-history-repository';
import { City } from '../entities/city';
import { CityRepository } from './protocols/city-repository';

export class SearchHistoryService{
    constructor(private readonly historyRepo: LocalHistoryRepository,
        private readonly cityRepo: CityRepository){
    }
    
    getHistory(): Promise<City[]>{
        try{
            return this.historyRepo.getHistory();
        }
        catch(error){
            throw error;
        }
    }

    async setHistory(cityId: string): Promise<void>{
        try{
            const city = await this.cityRepo.getById(Number(cityId))
            await this.historyRepo.setHistory(city);
        }
        catch(error){
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