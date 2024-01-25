import {Component, OnInit} from '@angular/core';
import { NgxIndexedDBService } from "ngx-indexed-db";
import { Dexie } from 'dexie';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'indexed-db';
  all = null;
  public db;

  constructor(private dbService: NgxIndexedDBService ) {
    this.db = new Dexie("MyFriendDB");
  }

  async ngOnInit() {
    /**
     * This will add everything to the animals store
     */
    await this.addToPeople();
    await this.addToAnimals();

    // dexie add db with items
    this.db.version(1).stores({
      friends: '++id,name,age'
    });
  }
  // dexie add new list
  public async addItems() {
    const id = await this.db.friends.add({name: "Foo", age: 42});
    console.log("Got id: " + id);

    // Query
    const friends = await this.db.friends
      .where('age')
      .between(40, 65)
      .toArray();

    console.log("Found friends: " + JSON.stringify(friends, null, 2));
  }
  // indexed db
  public addToPeople() {
    const people = [
      { name: "Charles", email: "charles" },
      { name: "Charles", email: "charles" },
      { name: "Charles", email: "charles" },
      { name: "Charles", email: "charles" },
      { name: "Charles", email: "charles" }
    ];

    const promises = people.map(p => {
      console.log(p);
      this.dbService.currentStore = "people";
      return this.dbService.add(p);
    });

    return Promise.all(promises);
  }

  public addToAnimals() {
    const animals = [
      { name: "Stark", breed: "labrador" },
      { name: "Stark", breed: "labrador" },
      { name: "Stark", breed: "labrador" },
      { name: "Stark", breed: "labrador" },
      { name: "Stark", breed: "labrador" }
    ];

    let promises = animals.map(a => {
      console.log(a);
      this.dbService.currentStore = "animals";
      return this.dbService.add(a);
    });

    return Promise.all(promises);
  }

  public getAll() {
    this.dbService.getAll().then(result => {
      this.all = result;
    });
    alert('Anzahl: ' + this.all.length);
    this.dbService.getByID(1).then(r => {
      // @ts-ignore
      alert(r.id + ' / ' + r.name);
    });
  }
}
