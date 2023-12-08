import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HeaderComponent } from './header/header.component';
import { AddArticleComponent } from './add-article/add-article.component';
import { firebaseConfig } from './firebase/firebase';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';

import { getStorage, provideStorage } from '@angular/fire/storage';
@NgModule({
  declarations: [AppComponent, HeaderComponent, AddArticleComponent],
  imports: [
    AngularFireStorageModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    AngularFireModule.initializeApp(firebaseConfig),
    BrowserAnimationsModule,
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
