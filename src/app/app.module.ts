import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxIndexedDBModule, DBConfig } from "ngx-indexed-db";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

const dbConfig: DBConfig = {
  name: "MyDb",
  version: 2,
  objectStoresMeta: [
    {
      store: "people",
      storeConfig: { keyPath: "id", autoIncrement: true },
      storeSchema: [
        { name: "name", keypath: "name", options: { unique: false } },
        { name: "email", keypath: "email", options: { unique: false } }
      ]
    },
    {
      store: "animals",
      storeConfig: { keyPath: "id", autoIncrement: true },
      storeSchema: [
        { name: "name", keypath: "name", options: { unique: false } },
        { name: "breed", keypath: "breed", options: { unique: false } }
      ]
    },
    {
      store: "houses",
      storeConfig: { keyPath: "id", autoIncrement: true },
      storeSchema: [
        { name: "name", keypath: "name", options: { unique: false } },
        { name: "street", keypath: "street", options: { unique: false } },
        { name: "town", keypath: "town", options: { unique: false }}
      ]
    }
  ]
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [NgxIndexedDBModule.forRoot(dbConfig),
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
