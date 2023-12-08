import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Category, targetAudience } from 'src/enums';
import { RepositoryService } from '../services/repository.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.scss'],
  providers: [RepositoryService, ToastService],
})
export class AddArticleComponent {
  targetAudience = targetAudience;
  category = Category;
  file?: File;
  image?: string;
  constructor(
    private repositoryService: RepositoryService,
    private toastService: ToastService,
    private storage: AngularFireStorage,
    private firestore: AngularFirestore
  ) {}

  addArticleForm: FormGroup = new FormGroup({
    productName: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    targetAudience: new FormControl('', [Validators.required]),
    stock: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });

  getError(name: string) {
    const field = this.addArticleForm.get(name);
    let error: string;

    if (field!.touched || !field!.pristine) {
      if (field!.hasError('required')) {
        error = 'Dit veld is verplicht';
      }
    }
    return error! as string;
  }

  onFileSelected(event: any) {
    this.file = event.target.files[0];
  }

  async submitForm() {
    if (this.addArticleForm.invalid) {
      return this.addArticleForm.markAllAsTouched();
    }

    const productName: string =
      this.addArticleForm.controls['productName'].value;
    const category: string = this.addArticleForm.controls['category'].value;
    const price: number = this.addArticleForm.controls['price'].value;
    const targetAudience: string =
      this.addArticleForm.controls['targetAudience'].value;
    const stock: number = this.addArticleForm.controls['stock'].value;
    const description: string =
      this.addArticleForm.controls['description'].value;

    const documentId = this.firestore.createId();
    const filePath = `shop/articles/${documentId}/${this.file?.name}`;
    await this.storage.upload(filePath, this.file);
    this.image = await this.storage.ref(filePath).getDownloadURL().toPromise();

    try {
      this.repositoryService.shop.doc(documentId).set({
        productName: productName,
        category: category,
        price: price,
        targetAudience: targetAudience,
        stock: stock,
        description: description,
        image: this.image,
      });
    } catch (e) {
      this.toastService.show(
        'Oeps! Er is iets verkeerd gegaan. Probeer het later nog een keer'
      );
    }
  }
}
