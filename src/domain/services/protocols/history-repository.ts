import { City } from "src/domain/entities/city";

export abstract class HistoryRepository{
    abstract getHistory(): Promise<City[]>;
    abstract setHistory(cityId: string, city: City):Promise<void>;
    abstract clearHistory();
}