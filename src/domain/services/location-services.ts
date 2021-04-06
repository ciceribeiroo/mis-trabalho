import { LocalLocationRepository } from "src/data/local-location-repository";
import { City } from "../entities/city";
import { LocationRepository } from "./protocols/location-repository";
import { Geolocation } from '@ionic-native/geolocation/ngx';

export class LocationService extends LocationRepository{
    constructor(private readonly locationRepo: LocalLocationRepository,
        private geolocation: Geolocation,){
        super();
    }
    async getCloserCity(): Promise<City> {
        return this.locationRepo.getCloserCity();
    }
    
}