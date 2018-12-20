import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController,ActionSheetController,ModalController,ViewController } from 'ionic-angular';
import { Dish } from '../../shared/dish';
import { Comment } from '../../shared/comment';
import { FavoriteProvider } from '../../providers/favorite/favorite';
import { CommentPage } from '../comment/comment';
import { SocialSharing } from '@ionic-native/social-sharing';
/**
 * Generated class for the DishdetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-dishdetail',
  templateUrl: 'dishdetail.html',
})
export class DishdetailPage {
  dish: Dish;
  errMess: string;
  avgstars: string;
  numcomments: number;
 favorite:boolean;
  
  constructor(public navCtrl: NavController, public navParams: NavParams,
    @Inject('BaseURL') private BaseURL,
	private favoriteservice:FavoriteProvider,
	  public modalCtrl: ModalController,
	private toastCtrl: ToastController,
	public viewCtrl: ViewController,
	public actionSheetCtrl: ActionSheetController,
	private socialSharing: SocialSharing) {
    this.dish = navParams.get('dish');
	this.favorite= this.favoriteservice.isFavorite(this.dish.id);
    this.numcomments = this.dish.comments.length;
	
    let total = 0;
    this.dish.comments.forEach(comment => total += comment.rating);
    this.avgstars = (total/this.numcomments).toFixed(2);
//profileModal.dismiss();   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DishdetailPage');
  }
	addToFavorites(){
		console.log("Adding to Favorite:", this.dish.id);
		this.favorite = this.favoriteservice.addFavorite(this.dish.id);
		 this.toastCtrl.create({
			message: 'Dish ' + this.dish.id + ' added as favorite successfully',
			position: 'middle',
			duration: 3000}).present();
	}
	
	
	presentActionSheet() {
   let actionSheet = this.actionSheetCtrl.create({
     title: 'Select Actions',
     buttons: [
       {
         text: 'Add to Favorite',
         role: 'destructive',
         handler: () => {
           console.log('Destructive clicked');
		   this.favorite = this.favoriteservice.addFavorite(this.dish.id);
			this.toastCtrl.create({
			message: 'Dish ' + this.dish.id + ' added as favorite successfully',
			position: 'middle',
			duration: 3000}).present();
         }
       },
       {
         text: 'Add Comments',
         handler: () => {
           console.log('Archive clicked');
		  let modal = this.modalCtrl.create(CommentPage);
		  modal.onDidDismiss(data => {
	   console.log(data);
	   this.dish.comments.push(data);
	   console.log("addEventListener");
	   
   });
			modal.present();
         }
       },
	    {
          text: 'Share via Facebook',
          handler: () => {
            this.socialSharing.shareViaFacebook(this.dish.name + ' -- ' + this.dish.description, this.BaseURL + this.dish.image, '')
              .then(() => console.log('Posted successfully to Facebook'))
              .catch(() => console.log('Failed to post to Facebook'));
          }
        },
        {
          text: 'Share via Twitter',
          handler: () => {
            this.socialSharing.shareViaTwitter(this.dish.name + ' -- ' + this.dish.description, this.BaseURL + this.dish.image, '')
              .then(() => console.log('Posted successfully to Twitter'))
              .catch(() => console.log('Failed to post to Twitter'));
          }
        },
       {
         text: 'Cancel',
         role: 'cancel',
         handler: () => {
           console.log('Cancel clicked');
         }
       }
     ]
   });

   actionSheet.present();
 }
 



 
}