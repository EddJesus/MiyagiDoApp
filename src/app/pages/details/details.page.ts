import { ProductService } from './../../services/product.service';
import { AuthService } from './../../services/auth.service';
import { Product } from './../../interfaces/product';
import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  public product: Product = {};
  private loading: any;
  private toast: any;
  private productId: string = null;
  private productSubscription: Subscription;
  

  constructor(
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private authService: AuthService,
    private activeRoute: ActivatedRoute,
    private productService: ProductService,
    private navCtrl: NavController
    ) { 
      this.productId = this.activeRoute.snapshot.params['id'];

      if(this.productId) this.loadProduct();
    }

  ngOnInit() {
  }

  ngOnDestroy(){
    if(this.productSubscription) this.productSubscription.unsubscribe();
  }

  loadProduct (){
    this.productSubscription = this.productService.getProduct(this.productId).subscribe(data => {
      this.product = data;
    })
  }

  async saveProduct(){
    await this.presentLoading();

    this.product.userId = (await this.authService.getAuth().currentUser).uid;

    if (this.productId){
      try{
        await this.productService.updateProduct(this.productId, this.product);
        await this.loading.dismiss();
  
        this.navCtrl.navigateBack('/home');
      } catch(error) {
        this.presentToast('Somente quem criou pode atualizar a postagem');
        this.loading.dismiss();
        this.navCtrl.navigateBack('/home');
      }
      
    } else {
      this.product.createdAt = new Date().getTime();

      try{
        await this.productService.addProduct(this.product);
        await this.loading.dismiss();
  
        this.navCtrl.navigateBack('/home');
      } catch(error) {
        this.presentToast('Erro ao tentar salvar');
        this.loading.dismiss();
      }
  
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
