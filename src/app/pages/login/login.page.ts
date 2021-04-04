import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonSlides, NavController, ToastController, MenuController } from '@ionic/angular';
import { UserDelivery } from 'src/app/commons/interfaces/user-delivery';
import { AvatarCatalog } from 'src/app/commons/interfaces/avatar-catalog';
import { DeliveryAgentService } from '../../services/delivery-agent.service';
import { StorageService } from '../../services/storage.service';

const AVATAR_DEFAULT = "https://www.gravatar.com/userimage/198148610/fbbfd805411147d5782a0a4afa972199?size=120";

const AGENTREGISTER_SUCCESS       = "¡ Registro correcto !";
const AGENTREGISTER_FAIL          = "No se pudo registrar";
const AGENTREGISTER_REQUIRED      = "Favor de completar los datos solicitados";
const AGENTREGISTER_SAMEPASS      = "Las contraseñas deben coincidir";
const AGENTREGISTER_AGENTIDEXIST  = "Ya existe el nombre de usuaio";

const LOGIN_ERROR                 = "Usuario o contraseña invalidos";

const SUCCESS_COLOR_TRUE          = "success";
const SUCCESS_COLOR_FALSE         = "danger";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, AfterViewInit {

  @ViewChild('mSlides') mSlides: IonSlides;

  myAgentDelivery: UserDelivery = {
    avatar: AVATAR_DEFAULT
    , role: 'agent'
  };

  loginAgentDelivery = {
    userId: ''
    , password: ''
  };

  avatar: string = AVATAR_DEFAULT;
  passwordTmp: string = "";
  avatartCatalogList: AvatarCatalog[] = new Array();
  avatarIdCurrent: string;
  myAvatatDefaul: string = AVATAR_DEFAULT;

  avatarSlide = {
    slidesPerView: 3.5
    , centeredSlides: true
  };

  constructor(private deliveryAgentService: DeliveryAgentService
    , public toastController: ToastController
    , private storageService: StorageService
    , private navController: NavController
    , private menuController: MenuController) { }

  ngOnInit() {
    this.disableMenu();
    this.consumeGetAvatarCatalog();

    if(this.storageService.getDarkTheme() == 'T')
      document.body.classList.add('dark');
    else if(this.storageService.getDarkTheme() == 'F')
      document.body.classList.remove('dark');
  }

  ngAfterViewInit() {
    this.mSlides.lockSwipes(true);
  }

  consumeGetAvatarCatalog(): void {
    this.deliveryAgentService.getAvatarCatalog().subscribe(
      data => {
        this.avatartCatalogList = data as AvatarCatalog[];
      }
    );
  }

  async login(formLogin: NgForm) {
    if (formLogin.invalid)
      this.showAgentRegisterStatus(AGENTREGISTER_REQUIRED, SUCCESS_COLOR_FALSE);

    const exist = await this.deliveryAgentService.login(this.loginAgentDelivery.userId, this.loginAgentDelivery.password);
    if(exist)
      this.navController.navigateRoot('myDelivery', {
        animated:true
      });
    else
      this.showAgentRegisterStatus(LOGIN_ERROR, SUCCESS_COLOR_FALSE);

  }

  agentRegister(formAgentRegister: NgForm) {
    this.myAgentDelivery.createDate = new Date();
    if (formAgentRegister.valid)
      if (this.myAgentDelivery.password === this.passwordTmp)
        this.deliveryAgentService.registerAgent(this.myAgentDelivery).subscribe(
          data => {
            if (data.success) {
              this.showAgentRegisterStatus(AGENTREGISTER_SUCCESS, SUCCESS_COLOR_TRUE);
            }
            else
              this.showAgentRegisterStatus(AGENTREGISTER_AGENTIDEXIST, SUCCESS_COLOR_FALSE);
          }, err => {
            console.log("err",err);
            this.showAgentRegisterStatus(AGENTREGISTER_FAIL, SUCCESS_COLOR_FALSE);
          }
        );
      else
        this.showAgentRegisterStatus(AGENTREGISTER_SAMEPASS, SUCCESS_COLOR_FALSE);
    else
      this.showAgentRegisterStatus(AGENTREGISTER_REQUIRED, SUCCESS_COLOR_FALSE);
  }

  async showAgentRegisterStatus(notice: string, success: string) {
    const toast = await this.toastController.create({
      message: notice,
      duration: 3000
      , color: success
    });
    toast.present();
  }

  selectAvatar(avatar: AvatarCatalog) {
    this.avatartCatalogList.forEach(
      av => {
        av.selected = false;
      });
    avatar.selected = true;
    this.myAgentDelivery.avatar = avatar.avatarUrl;
    this.avatarIdCurrent = avatar.avatarId;
  }

  showLogin() {
    this.mSlides.lockSwipes(false);
    this.mSlides.slideTo(0);
    this.mSlides.lockSwipes(true);
  }

  showReg() {
    this.mSlides.lockSwipes(false);
    this.mSlides.slideTo(1);
    this.mSlides.lockSwipes(true);
  }

  disableMenu()
  {
    this.menuController.enable(false);
  }
}
