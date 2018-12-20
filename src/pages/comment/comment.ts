import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController,ModalController  } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Comment } from '../../shared/comment';
import { Dish } from '../../shared/dish';
/**
 * Generated class for the CommentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-comment',
  templateUrl: 'comment.html',
})
export class CommentPage {

comment: FormGroup;
 comments: Comment;
	dishcopy = null;
	dish:Dish;
  constructor(public navCtrl: NavController, public navParams: NavParams,
  public viewCtrl: ViewController,
  public modalCtrl: ModalController,
  private formBuilder: FormBuilder) {
	   this.comment = this.formBuilder.group({
            author: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
			rating: 5,
			comment: ['', Validators.required],
			date: ''
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommentPage');
  }
  dismiss(){
	  this.viewCtrl.dismiss();
  }
  
    onSubmit() {
    console.log(this.comment.value);
	this.comments = this.comment.value;
    this.comments.date = new Date().toISOString();
	console.log("fgfgfgfg"+this.comments.date+ ","+ this.comments.rating+","+ this.comments.author);
    /*this.dishcopy.comments.push("dfgdfgdfgdfg"+this.comments);
	this.dishcopy.save();*/
    this.viewCtrl.dismiss(this.comments);
  }

}
