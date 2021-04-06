import { City } from "src/domain/entities/city";

export abstract class LocationRepository{
    abstract getCloserCity(): Promise<City>;
}