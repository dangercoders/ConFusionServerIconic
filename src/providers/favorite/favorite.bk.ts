
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { baseURL } from '../../shared/baseurl';
import { Dish } from '../../shared/dish';
import { DishProvider} from '../dish/dish';
import { ProcessHttpmsgProvider } from '../process-httpmsg/process-httpmsg';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/catch';
import { LocalNotifications } from '@ionic-native/local-notifications';

/*
  Generated class for the FavoriteProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FavoriteProvider {

	favorites:Array<any>;
  constructor(public http: Http,
  private dishservice:DishProvider,
  private storage: Storage,
  private localNotifications: LocalNotifications) {
    console.log('Hello FavoriteProvider Provider');
	this.favorites=[];
  }
	addFavorite(id:number){
		if(!this.isFavorite(id)){
			this.favorites.push(id);
			this.storage.set('favorite', this.favorites);
			console.log("favorite storage"+this.favorites);
			      this.storage.get('favorite').then(favorites => {
						console.log("get favorites"+favorites);
				  });
		this.localNotifications.schedule({
				id: id,
				text: 'Dish ' + id + ' added as a favorite successfully'
		});
		}	
		return true;

	}
	/*isFavorite(id:number):boolean{
		storage.get('favorite').then(favorites => {
		
				console.log("isfavorites"+favorites);
				return this.favorites.find(id);
			
		}
	}
	*/
	isFavorite(id: number): boolean {
        return this.favorites.some(el => el === id);
  }
  
	getFavorites(): Observable<Dish[]>{
		this.storage.get('favorite').then(favorites => {
					if(favorites){
						console.log("get favorites"+favorites);
						this.favorites=favorites;
					}
				  });		
		return this.dishservice.getDishes()
		.map(dishes => dishes.filter(dish => this.favorites.some(el => el=== dish.id)))
	}
	
	deleteFavorite(id:number): Observable<Dish[]>{
		let index = this.favorites.indexOf(id);
		if(index >= 0){
			this.favorites.splice(index,1);
			this.storage.remove('favorite');
			this.storage.set('favorite',this.favorites);
			return this.getFavorites();
		}else{
			return Observable.throw('Deleting non exiting dish '+id); 
		}
	}
	
	
	
	
}
