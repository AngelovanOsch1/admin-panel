import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { User } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class RepositoryService {
  usersCollection: AngularFirestoreCollection<User>;
  addresses: AngularFirestoreCollection<any>;
  purchaseHistory: AngularFirestoreCollection<any>;
  forum: AngularFirestoreCollection<any>;
  forumPosts: AngularFirestoreCollection<any>;
  forumPostUserComments: AngularFirestoreCollection<any>;
  shop: AngularFirestoreCollection<any>;
  shopArticles: AngularFirestoreCollection<any>;
  shopArticlesUserComments: AngularFirestoreCollection<any>;
  activities: AngularFirestoreCollection<any>;
  gameHighscores: AngularFirestoreCollection<any>;

  constructor(private firestore: AngularFirestore) {
    this.usersCollection = this.firestore.collection('users');
    this.addresses = this.firestore.collection('addresses');
    this.purchaseHistory = this.firestore.collection('purchaseHistory');
    this.forum = this.firestore.collection('forum');
    this.purchaseHistory = this.firestore.collection('purchaseHistory');
    this.forumPosts = this.firestore.collection('forumPosts');
    this.forumPostUserComments = this.firestore.collection(
      'forumPostUserComments'
    );
    this.shop = this.firestore.collection('shop');
    this.shopArticles = this.firestore.collection('shopArticles');
    this.shopArticlesUserComments = this.firestore.collection(
      'shopArticlesUserComments'
    );
    this.activities = this.firestore.collection('activities');
    this.gameHighscores = this.firestore.collection('gameHighscores');
  }
}
