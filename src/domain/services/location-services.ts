import { LocalLocationRepository } from "src/data/local-location-repository";
import { City } from "../entities/city";
import { LocationRepository } from "./protocols/location-repository";

export class LocationService{
    constructor(private readonly locationRepo: LocalLocationRepository
    ){}
    async getCloserCity(): Promise<City> {
        return this.locationRepo.getCloserCity();
    }
    
}