import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

//Agregado por mi
import { TabsPage } from '../tabs/tabs';
import { CreditoPage } from '../credito/credito'
import { FormGroup} from '@angular/forms';
import { LoadingController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { RegistroPage } from '../registro/registro';
import { AngularFireAuth } from 'angularfire2/auth';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  myForm: FormGroup;
  usuarioSeleccionado: string;
  usuario:string;
  clave:string;
  arrayUsuarios : Array <any> = [
    {id:1,nombre:"admin@gmail.com",clave:111111,perfil:"admin",sexo:"Female"},
    {id:2,nombre:"invitado@gmail.com",clave:222222,perfil:"invitado",sexo:"Female"},
    {id:3,nombre:"usuario@gmail.com",clave:333333,perfil:"usuario",sexo:"Male"},
    {id:4,nombre:"anonimo@gmail.com",clave:44,perfil:"usuario",sexo:"Male"},
    {id:5,nombre:"tester@gmail.com",clave:55,perfil:"tester",sexo:"Female"}
  ];
  

  band:number =0;
  splash = true;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController,
              public toastCtrl: ToastController,
              private MiAuth:AngularFireAuth) {
                this.band =0;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    setTimeout(() => {
      this.splash = false;
      //this.tabBarElement.style.display = 'flex';
    }, 4000);
  }
  async iniciarSesion(){
    if(this.usuario == null || this.clave == null || this.clave == '' || this.usuario == '')
    {
      return this.mostrarToast("Debe completar los campos","errorToast");
    }
    let spinner = this.cargando();
    spinner.present();  
    await this.MiAuth.auth.signInWithEmailAndPassword(this.usuario,this.clave)
              .then(result => 
                {
                  spinner.dismiss();
                  this.navCtrl.setRoot(CreditoPage, { usuario: this.usuario })
                })
              .catch(error =>
                {
                  console.log(error.message);
                  spinner.dismiss();
                  if (error.message == "The email address is badly formatted." ) {
                    return this.mostrarToast("El correo tiene un formate incorrecto","errorToast");
                  }
                  if (error.message == "The password is invalid or the user does not have a password." ) {
                    return this.mostrarToast("Error en la clave","errorToast");
                  }
                  if (error.message == "There is no user record corresponding to this identifier. The user may have been deleted." ) {
                    return this.mostrarToast("El usuario no existe o fue eliminado","errorToast");
                  }
                  setTimeout(() => {

                   }, 500);
                })

  }

  registrarUsuario(){
    return this.navCtrl.push(RegistroPage);

  }
  cargando() {
    let loader = this.loadingCtrl.create({
      content: "Cargando...",
      duration: 3000
    });
    //loader.present();
    //return loader.present();
    return loader;
  }
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

  // iniciarSesion(){
  //   if(this.usuario==null||this.clave==null||this.usuario==''||this.clave=='')
  //     {
  //       this.band =0;
  //       //return this.showAlert("Debe completar el Email y su Clave para ingresar","Campo vacio!");
  //       return this.mostrarToast("Debe completar los campos","warningToast");
  //     }
  //   for (let i = 0; i < this.arrayUsuarios.length; i++) {
      
  //     if (this.arrayUsuarios[i].nombre == this.usuario && this.arrayUsuarios[i].clave == this.clave) {
  //       this.cargando();
  //       console.log(this.arrayUsuarios[i]);
  //       this.band =1;
  //       return this.navCtrl.push(CreditoPage);
  //     }
      
  //   }
  //   if (this.band ==0) {
  //     return this.mostrarToast("Usuario o contraseña incorrecto","errorToast");
  //   }
    
  // }
  
  SeleccionarUsuario(){
    switch(this.usuarioSeleccionado){
      case "admin":{
        this.usuario="admin@gmail.com";
        this.clave="111111";
        break;
      }
      case "invitado":{
        this.usuario="invitado@gmail.com";
        this.clave="222222";
        break;
      }
      case "usuario":{
        this.usuario="usuario@gmail.com";
        this.clave="333333";
        break;
      }                
      case "anonimo":{
        this.usuario="anonimo@gmail.com";
        this.clave="44";
        break;
      }
      case "tester" :{
        this.usuario="tester@gmail.com";
        this.clave="55";
        break;
      }        
    }
  }
  showAlert(mensaje:string,titulo:string) {
    let alert = this.alertCtrl.create({
      title: titulo,
      subTitle: mensaje,
      buttons: ['Cerrar']
    });
    alert.present();
  }  
  



}
