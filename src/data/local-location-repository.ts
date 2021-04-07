import { City } from "src/domain/entities/city";
import { Coordinate } from "src/domain/entities/coordinate";
import { LocationRepository } from "src/domain/services/protocols/location-repository";
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LocalCityRepository } from "./local-city-repository";
import { PermissionDeniedLocationError } from "src/domain/errors/permission-denied-location.error";


export class LocalLocationRepository extends LocationRepository{
    atualCordinates: Coordinate = null
    constructor(private geolocation: Geolocation,
        private localCityRepo : LocalCityRepository
        ){
        super();
    }

    async getCloserCity(): Promise<City> {
        this.atualCordinates = await this.getMyCoordinates();
        const cities = await this.localCityRepo.getAll();
        let distance = 999999999999999;
        let closerCity: City = null;
        cities.forEach(element => {
            const distanceTemp = this.haversineDistance(element.coord);
            if(distanceTemp < distance){
                distance = distanceTemp;
                closerCity = element;
            }
        });
        return closerCity;
    }

    async getMyCoordinates(){
        let cord: Coordinate = {
            latitude : 0,
            longitude : 0
        };
        try{
            let myCord = await this.geolocation.getCurrentPosition();
            cord.latitude = myCord.coords.latitude;
            cord.longitude = myCord.coords.longitude;
            return cord;
        }
        catch {
            throw new PermissionDeniedLocationError();
        }
    }

    haversineDistance(city: Coordinate): number {
        var radius = 6371;    
    
        const deltaLatitude = (city.latitude - this.atualCordinates.latitude) * Math.PI / 180;
        const deltaLongitude = (city.longitude - this.atualCordinates.longitude) * Math.PI / 180;
    
        const halfChordLength = Math.cos(
            this.atualCordinates.latitude * Math.PI / 180) * Math.cos(city.latitude * Math.PI / 180) 
            * Math.sin(deltaLongitude/2) * Math.sin(deltaLongitude/2)
            + Math.sin(deltaLatitude/2) * Math.sin(deltaLatitude/2);
    
        const angularDistance = 2 * Math.atan2(Math.sqrt(halfChordLength), Math.sqrt(1 - halfChordLength));
    
        return radius * angularDistance;
    }
}