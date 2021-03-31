import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SearchCityService } from 'src/domain/services/search-city.service';
import { LoadWeatherService } from 'src/domain/services/load-weather.service';
import { LocalCityRepository } from 'src/data/local-city-repository';
import { ApiWeatherRepository } from 'src/data/api-weather-repository';

import { IonicStorageModule } from '@ionic/storage-angular';
import { Storage } from '@ionic/storage-angular';
import { CacheService } from 'src/domain/services/cache-service';

const createSearchCityService = () => {
  return new SearchCityService(new LocalCityRepository());
};
const createCacheService = () => {
  return new CacheService(new Storage(), createSearchCityService());
}

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
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: SearchCityService,
      useFactory: createSearchCityService,
    },
    {
      provide: CacheService,
      useFactory: createCacheService
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
