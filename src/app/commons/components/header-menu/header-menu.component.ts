import { Component, Input, OnInit } from '@angular/core';

const ANIMATE_CURRENT           = "animate__wobble";
const PATH_SOUND_CURRENT        = "../../../../assets/sounds/Information_Bell.ogg";
const ELEMENT_OF_NOTIFICATION   = ".myNotification"

@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.scss'],
})
export class HeaderMenuComponent implements OnInit {

  @Input() titleMain:string;

  constructor() { 
    
  }

  ngOnInit() {}

  onClick(){

    this.animateCSS(ELEMENT_OF_NOTIFICATION,ANIMATE_CURRENT).then((message) => {
      
    });

  }

  animateCSS(element, animation): Promise<string> {
    return new Promise(
      (resolve, reject) => {
        const animationName = animation;
        const node = document.querySelector(element);
        node.classList.add('animate__animated', animationName);
        // When the animation ends, we clean the classes and resolve the Promise
        function handleAnimationEnd(event) {
          event.stopPropagation();
          node.classList.remove('animate__animated', animationName);
          resolve('Animation ended');
        }
        node.addEventListener('animationend', handleAnimationEnd, { once: true });
        this.playAudio();
      }
    );
  }

  playAudio(){
    let audio = new Audio();
    audio.src = PATH_SOUND_CURRENT;
    audio.load();
    audio.play();
  }

}
