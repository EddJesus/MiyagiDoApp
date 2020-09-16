import { AuthService } from './../../services/auth.service';
import { ProductService } from './../../services/product.service';
import { Product } from './../../interfaces/product';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})

export class HomePage {

  public loading: any;
  public toast: any;
  public products = new Array<Product>();
  private productsSubscription: Subscription;

  constructor(
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private productsService: ProductService,
    private authService: AuthService
    ) { 

    this.productsSubscription = this.productsService.getProducts().subscribe(data => {
      this.products = data;
    });

  }

  ngOnInit(){}

  ngOnDestroy(){
    this.productsSubscription.unsubscribe();
  }

  async logout(){
    try{
      await this.authService.logout();
    }catch(error){
      console.error(error);
    }
  }

  async deleteProduct(id: string){
    try{
      await this.productsService.deleteProduct(id);
    }catch(error){
      this.presentToast('Erro ao tentar salvar!')
    }
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({ message: 'Por favor aguarde...' });
    return this.loading.present();
  }

  async presentToast(message: string) {
    this.toast = await this.toastCtrl.create({ message: message, duration: 3000 });
    return this.toast.present();
  }

}
