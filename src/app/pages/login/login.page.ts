import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonSlides, NavController, ToastController, MenuController } from '@ionic/angular';
import { UserDelivery } from 'src/app/commons/interfaces/user-delivery';
import { AvatarCatalog } from 'src/app/commons/interfaces/avatar-catalog';
import { SecurityService } from '../../services/security.service';
import { UtilService } from '../../commons/services/util.service';
import { StorageService } from '../../commons/services/storage.service';

const AVATAR_DEFAULT                    = "https://www.gravatar.com/userimage/198148610/3764815d46c1285fd8f2cc6a174e7061?size=120";

const AGENT_REGISTER_SUCCESS            = "¡ Registro correcto !";
const AGENT_REGISTER_FAIL               = "No se pudo registrar";
const AGENT_REGISTER_REQUIRED           = "Favor de completar los datos solicitados";
const AGENT_REGISTER_SAMEPASS           = "Las contraseñas deben coincidir";
const AGENT_REGISTER_AGENTIDEXIST       = "Ya existe el nombre de usuaio";
const AGENT_REGISTER_REQUIRED_AVATAR    = "Favor de Seleccionar un avatar";

const LOGIN_ERROR                       = "Usuario o contraseña invalidos";
const ROLE_AGENT                        = "agent"

const DARK_THEME                        = "dark";

const SUCCESS_TRUE                      = true;
const SUCCESS_FALSE                     = false;

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, AfterViewInit {

  @ViewChild('mSlides') mSlides: IonSlides;

  myAgentDelivery: UserDelivery = {
    avatar: AVATAR_DEFAULT
    , role: ROLE_AGENT
  };

  loginAgentDelivery = {
    userId: ''
    , password: ''
  };

  avatar              : string = AVATAR_DEFAULT;
  passwordTmp         : string = "";
  avatartCatalogList  : AvatarCatalog[] = new Array();
  avatarIdCurrent     : string = "";

  avatarSlide = {
    slidesPerView: 3.5
    , centeredSlides: true
  };

  constructor(private securityService: SecurityService
    , private utilService: UtilService
    , public toastController: ToastController
    , private storageService: StorageService
    , private navController: NavController
    , private menuController: MenuController) { }

  ngOnInit() {
    this.disableMenu();
    this.consumeGetAvatarCatalog();

    if(this.storageService.getDarkTheme() == 'T')
      document.body.classList.add(DARK_THEME);
    else if(this.storageService.getDarkTheme() == 'F')
      document.body.classList.remove(DARK_THEME);
  }

  ngAfterViewInit() {
    this.mSlides.lockSwipes(true);
  }

  consumeGetAvatarCatalog(): void {
    this.utilService.getAvatarCatalog().subscribe(
      data => {
        this.avatartCatalogList = data as AvatarCatalog[];
      }
    );
  }

  async login(formLogin: NgForm) {
    if (formLogin.invalid)
      this.utilService.showAgentRegisterStatus(AGENT_REGISTER_REQUIRED, SUCCESS_FALSE);

    const exist = await this.securityService.login(this.loginAgentDelivery.userId, this.loginAgentDelivery.password);
    if(exist)
      this.navController.navigateRoot('myDelivery', {
        animated:true
      });
    else
      this.utilService.showAgentRegisterStatus(LOGIN_ERROR, SUCCESS_FALSE);

  }

  async agentRegister(formAgentRegister: NgForm) {
    this.myAgentDelivery.createDate = new Date();
    console.log(formAgentRegister);
    if (formAgentRegister.valid)
      if (this.avatarIdCurrent !== "")
        if (this.myAgentDelivery.password === this.passwordTmp){
          const exist = await this.securityService.registerAgent(this.myAgentDelivery);
          if ( exist == 1 ) {
            this.utilService.showAgentRegisterStatus(AGENT_REGISTER_SUCCESS, SUCCESS_TRUE);
            formAgentRegister.reset();

            this.navController.navigateRoot('myDelivery', {
              animated:true
            });
          }
          else if( exist == 0 )
            this.utilService.showAgentRegisterStatus(AGENT_REGISTER_AGENTIDEXIST, SUCCESS_FALSE);
          else if( exist == -1 )
            this.utilService.showAgentRegisterStatus(AGENT_REGISTER_FAIL, SUCCESS_FALSE);
        } 
        else
          this.utilService.showAgentRegisterStatus(AGENT_REGISTER_SAMEPASS, SUCCESS_FALSE);
      else
        this.utilService.showAgentRegisterStatus(AGENT_REGISTER_REQUIRED_AVATAR, SUCCESS_FALSE);
    else
      this.utilService.showAgentRegisterStatus(AGENT_REGISTER_REQUIRED, SUCCESS_FALSE);
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
