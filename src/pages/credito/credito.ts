import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { ToastController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database-deprecated';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { LoginPage } from '../login/login';


/**
 * Generated class for the CreditoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-credito',
  templateUrl: 'credito.html',
})
export class CreditoPage {
  codigo: string;
  miScan={};
  creditoActual:number = 0;
  credito100: string;
  credito50: string;
  credito10: string;
  usuarioFirebase: boolean;
  usuarioOnline:string ="";

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private barcodeScanner: BarcodeScanner,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public afDB: AngularFireDatabase,
    private MiAuth:AngularFireAuth,
    private alertCtrl: AlertController) {
      
  }
  getUserID(){
    console.log("getUserID: "+this.MiAuth.auth.currentUser.uid);
    return this.MiAuth.auth.currentUser.uid;
  }
  getEmail(){
  console.log("getEmail: "+this.MiAuth.auth.currentUser.email);
  return this.MiAuth.auth.currentUser.email;
  }

  guardaCredito(){
    //let hora = Date.now();
    let sitio  = {
      "id":this.getUserID(),
      "usuario":this.getEmail(),
      "credito10":this.credito10,
      "credito50":this.credito50,
      "credito100":this.credito100,
      "credito":this.creditoActual};
    return this.afDB.database.ref('cargaCredito/'+this.getUserID()).set(sitio);
  }

  ionViewDidLoad() {
    this.usuarioOnline = this.getEmail();
    this.usuarioFirebase = false;
    let spinner = this.cargando();
    spinner.present();  
    this.afDB.list('/cargaCredito', { preserveSnapshot: true})
                .subscribe(snapshots => {
                snapshots.forEach(snapshot => {
                  if (snapshot.val().usuario == this.getEmail()) {
                    this.usuarioFirebase = true;
                    this.credito10 = snapshot.val().credito10;
                    this.credito50 = snapshot.val().credito50;
                    this.credito100 = snapshot.val().credito100;                           
                  }
              });
              spinner.dismiss();
              if(this.usuarioFirebase == false)
              {
                
              this.credito10 = "vacio";
              this.credito50 = "vacio";
              this.credito100 = "vacio";
              this.guardaCredito();
              
              }
              this.traerCreditoActual();
            })
            
  }

  traerCreditoActual()
  {
    this.creditoActual = 0;
      if(this.credito10 != "vacio")
      {
        this.creditoActual += 10;
      }

      if(this.credito50 != "vacio")
      {
        this.creditoActual += 50;
      }

      if(this.credito100 != "vacio")
      {
        this.creditoActual += 100;
      }
  }
  scan()
  {
    this.barcodeScanner.scan().then((barcodeData) => {

        console.log(barcodeData);
        this.miScan = barcodeData;
        this.codigo = barcodeData.text;
        //this.getCreditoACargar();
        this.Cargar();
    }, (err) => {
        console.log("Error occured : " + err);
    });  
  }

  Cargar(){
    switch (this.codigo) {
      case "8c95def646b6127282ed50454b73240300dccabc":
          if(this.credito10 == "vacio"){
            this.credito10 = "8c95def646b6127282ed50454b73240300dccabc";
            this.creditoActual += 10;
            this.mostrarToast("Se acreditó $10","successToast");
            this.codigo = "";
          }
          else{
            this.mostrarToast("Código ya utilizado","warningToast");
          }
      break;
      case "ae338e4e0cbb4e4bcffaf9ce5b409feb8edd5172 ":
      if(this.credito50 == "vacio"){
        this.credito50 = "ae338e4e0cbb4e4bcffaf9ce5b409feb8edd5172 ";
        this.creditoActual += 50;
        this.mostrarToast("Se acreditó $50","successToast");
        this.codigo = "";
      }
      else{
        this.mostrarToast("Código ya utilizado","warningToast");
      }
      break;


      case "2786f4877b9091dcad7f35751bfcf5d5ea712b2f":
          if(this.credito100 == "vacio"){
            this.credito100 = "2786f4877b9091dcad7f35751bfcf5d5ea712b2f";
            this.creditoActual += 100;
            this.mostrarToast("Se acreditó $100","successToast");
            this.codigo = "";
          }
          else{
            this.mostrarToast("Código ya utilizado","warningToast");
          }
      break;
    
      default:
        this.mostrarToast("No es un código valido","warningToast");
        break;
    }
    this.guardaCredito();
  }

  scanDescargar()
  {
    this.barcodeScanner.scan().then((barcodeData) => {

        console.log(barcodeData);
        this.miScan = barcodeData;
        this.codigo = barcodeData.text;
        //this.getCreditoACargar();
        this.Descargar();
    }, (err) => {
        console.log("Error occured : " + err);
    });  
  }

  Descargar(){
    switch (this.codigo) {
      case "8c95def646b6127282ed50454b73240300dccabc":
          if(this.credito10 != "vacio"){
            this.credito10 = "vacio";
            this.creditoActual -= 10;
            this.mostrarToast("Se descargo $10","successToast");
            this.codigo = "";
          }
          else{
            this.mostrarToast("no disponía de ese código","warningToast");
          }
      break;
      case "ae338e4e0cbb4e4bcffaf9ce5b409feb8edd5172 ":
      if(this.credito50 != "vacio"){
        this.credito50 = "vacio";
        this.creditoActual -= 50;
        this.mostrarToast("Se descargo $50","successToast");
        this.codigo = "";
      }
      else{
        this.mostrarToast("no disponía de ese código","warningToast");
      }
      break;


      case "2786f4877b9091dcad7f35751bfcf5d5ea712b2f":
          if(this.credito100 != "vacio"){
            this.credito100 = "vacio";
            this.creditoActual -= 100;
            this.mostrarToast("Se descargo $100","successToast");
            this.codigo = "";
          }
          else{
            this.mostrarToast("no disponía de ese código","warningToast");
          }
      break;
    
      default:
        this.mostrarToast("No es un código valido","warningToast");
        break;
    }
    this.guardaCredito();
  }

  

//   scan() {
//     this.selectedProduct = {};
//     this.barcodeScanner.scan().then((barcodeData) => {
//       this.selectedProduct = this.products.find(product => product.plu === barcodeData.text);
//       if(this.selectedProduct !== undefined) {
//         this.productFound = true;
//       } else {
//         this.productFound = false;
//         this.toast.show(`Product not found`, '5000', 'center').subscribe(
//           toast => {
//             console.log(toast);
//           }
//         );
//       }
//     }, (err) => {
//       this.toast.show(err, '5000', 'center').subscribe(
//         toast => {
//           console.log(toast);
//         }
//       );
//     });
//   }


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

cerrarSesion() {
  let alert = this.alertCtrl.create({
    title: 'Cerrar sesión',
    message: '¿Está seguro?',
    cssClass: 'infoAlert',
    buttons: [
      {
        text: 'No',
        role: 'cancel',
        handler: () => {
          console.log('Cancel click');
        }
      },
      {
        text: 'Si',
        handler: () => {
          console.log('Si click');
          this.MiAuth.auth.signOut();
          this.navCtrl.setRoot(LoginPage);
        }
      }
    ]
  });
  alert.present();
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


 }
