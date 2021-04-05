import { LocalHistoryRepository } from 'src/data/local-history-repository';
import { City } from '../entities/city';
import { HistoryRepository } from './protocols/history-repository';

export class SearchHistoryService extends HistoryRepository{
    constructor(private readonly historyRepo: LocalHistoryRepository){
        super();
    }
    
    getHistory(): Promise<City[]>{
        return this.historyRepo.getHistory();
    }
    setHistory(cityId: string): void{
        this.historyRepo.setHistory(cityId);
    }
    clearHistory(){
        return this.historyRepo.clearHistory();
    }
}