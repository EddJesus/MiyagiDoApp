import { AuthService } from './../../services/auth.service';
import { LoadingController, ToastController } from '@ionic/angular';
import { Users } from './../../interface/users';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public userLogin: Users = {};
  public loading: any;
  public toast: any;

  constructor( 
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private authService: AuthService) { }

  ngOnInit() {
  }

  async login(){
    await this.presentLoading();

    try {
      await this.authService.login(this.userLogin);
    } catch (error) {
      let message: string;
      switch (error.code) {
        case 'auth/user-not-found':
          message = "Usuário não encontrado"
          break;
        case 'auth/invalid-email':
          message = "O email digitado é invalido!"
          break;
        case 'auth/wrong-password':
          message = "Senha incorreta!"
          break;
      }
      this.presentToast(message)
    } finally {
      console.log("logado!");
      this.loading.dismiss();
    }

    this.loading.dismiss();
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
