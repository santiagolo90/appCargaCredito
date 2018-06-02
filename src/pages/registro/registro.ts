import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AngularFireAuth } from 'angularfire2/auth';
import { ToastController } from 'ionic-angular';

/**
 * Generated class for the RegistroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html',
})
export class RegistroPage {

  username:string;
  password:string;
  password2:string;
  Mensaje:string;

  constructor(private MiAuth:AngularFireAuth,
              public navCtrl: NavController, 
              public navParams: NavParams,
              public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistroPage');
  }

  async Cancelar()
  {
    this.navCtrl.setRoot(LoginPage);
  }
//
  async Registrar(){
    if(this.password != null && this.password.length > 5){
      if (this.password == this.password2) {
        if(this.username != null && this.username != ""){
          await this.MiAuth.auth.createUserWithEmailAndPassword(this.username,this.password)
          .then(result =>{
            this.mostrarToast("Bienvenido "+this.username ,"successToast");
            this.navCtrl.pop();
          })
          .catch(error =>{
           console.log(error);
           if (error.message == "The email address is badly formatted." ) {
             return this.mostrarToast("El correo tiene un formate incorrecto","errorToast");
           }
          //  setTimeout(() => {
          //  this.showAlert(error.message, "Error al registrarse");
          //  }, 500);
          })
        }
        else{
          return this.mostrarToast("Debe ingresar un correo","errorToast");
        }
        
      }else{
        return this.mostrarToast("Las contraseñas deben ser iguales","errorToast");
      }
    }else{
        return this.mostrarToast("Contraseña no debe ser menor a 6 caracteres","warningToast");
      }
  }

  // cargando() {
  //   let loader = this.loadingCtrl.create({
  //     content: "Cargando...",
  //     duration: 3000
  //   });
  //   //loader.present();
  //   return loader.present();
  // }
  mostrarToast(miMsj:string,color:string) {
    let toast = this.toastCtrl.create({
      showCloseButton: true,
      closeButtonText:"cerrar",
      cssClass: color,
      message: miMsj,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }
}