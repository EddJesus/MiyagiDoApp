import { Product } from './../interfaces/product';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productsCollection: AngularFirestoreCollection<Product>;
  
  constructor(private afs: AngularFirestore) {
    this.productsCollection = this.afs.collection<Product>('Products');
   }

   getProducts(){
    return this.productsCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;

          return { id, ...data };

        });
      })
    );
   }

   getProduct(id: string){
    return this.productsCollection.doc<Product>(id).valueChanges();
  }


   addProduct(product: Product){
    return this.productsCollection.add(product);
   }

   updateProduct(id: string, product: Product){
    return this.productsCollection.doc<Product>(id).update(product);
   }

   deleteProduct(id: string){
    this.productsCollection.doc(id).delete();
   }


}
