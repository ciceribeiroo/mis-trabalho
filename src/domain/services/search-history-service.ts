import { LocalHistoryRepository } from 'src/data/local-history-repository';
import { City } from '../entities/city';
import { HistoryRepository } from './protocols/history-repository';

export class SearchHistoryService extends HistoryRepository{
    constructor(private readonly historyRepo: LocalHistoryRepository){
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
    setHistory(cityId: string): void{
        try{
            this.historyRepo.setHistory(cityId);
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