import { Component, OnInit ,  ElementRef,ViewChildren } from '@angular/core';
import { AlertController } from '@ionic/angular';
import type { QueryList } from '@angular/core';
import type { Animation } from '@ionic/angular';
import { AnimationController, IonCard } from '@ionic/angular';
@Component({
  selector: 'app-reclamo',
  templateUrl: './reclamo.page.html',
  styleUrls: ['./reclamo.page.scss'],
})
export class ReclamoPage implements OnInit {
  @ViewChildren(IonCard, { read: ElementRef }) cardElements!: QueryList<ElementRef<HTMLIonCardElement>>;
  private animation!: Animation;

  constructor(private alertController: AlertController, private animationCtrl: AnimationController) { }
  ngAfterViewInit() {
    const card = this.animationCtrl
      .create()
      .addElement(this.cardElements.get(0)!.nativeElement)
      .duration(2000)
      .beforeStyles({
        filter: 'invert(75%)',
      })
      .beforeClearStyles(['box-shadow'])
      .afterStyles({
        'box-shadow': 'rgba(255, 0, 50, 0.4) 0px 4px 16px 6px',
      })
      .afterClearStyles(['filter'])
      .keyframes([
        { offset: 0, transform: 'scale(1)' },
        { offset: 0.5, transform: 'scale(1.5)' },
        { offset: 1, transform: 'scale(1)' },
      ]);

    this.animation = this.animationCtrl.create().duration(2000).addAnimation([card]);
  }

  play() {
    this.animation.play();
  }

  pause() {
    this.animation.pause();
  }

  stop() {
    this.animation.stop();
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Reclamo recibido',
      subHeader: 'Su reclamo a sido derivado con la administracion',
      message: 'Gracias por su comentario',
      buttons: ['OK'],
    });

    await alert.present();
  }


  ngOnInit() {
  }

}
