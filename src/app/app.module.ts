import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Geolocation } from '@ionic-native/geolocation/ngx';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SearchCityService } from 'src/domain/services/search-city.service';
import { LoadWeatherService } from 'src/domain/services/load-weather.service';
import { LocalCityRepository } from 'src/data/local-city-repository';
import { ApiWeatherRepository } from 'src/data/api-weather-repository';

import { IonicStorageModule } from '@ionic/storage-angular';
import { Storage } from '@ionic/storage-angular';
import { SearchHistoryService } from 'src/domain/services/search-history-service';
import { LocalHistoryRepository } from 'src/data/local-history-repository';
import { LocationService } from 'src/domain/services/location-services';
import { LocalLocationRepository } from 'src/data/local-location-repository';

const createSearchCityService = () => {
  return new SearchCityService(new LocalCityRepository());
};

const createHistoryService = () => {
  return new SearchHistoryService(new LocalHistoryRepository(new Storage(), new LocalCityRepository()));
};

const createLocationService = () => {
  return new LocationService(new LocalLocationRepository( new Geolocation(), new LocalCityRepository()));
};

const createLoadWeatherService = (http: HttpClient) => {
  return new LoadWeatherService(
    new LocalCityRepository(),
    new ApiWeatherRepository(http)
  );
};

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    Geolocation,
    {
      provide: LocationService,
      useFactory: createLocationService,
    },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: SearchCityService,
      useFactory: createSearchCityService,
    },
    {
      provide: SearchHistoryService,
      useFactory: createHistoryService
    },
    {
      provide: LoadWeatherService,
      useFactory: createLoadWeatherService,
      deps: [HttpClient],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
