import Adapt from 'core/js/adapt';
import ComponentView from 'core/js/views/componentView';
import '../libraries/lottie-player';
import * as LottieInteractivity from '../libraries/lottie-interactivity.min';
class LottieInteractivityView extends ComponentView {

  preRender() {
    const lottieModel = this.model.get('_lottie');
    const lottieplayerEl = document.createElement('lottie-player');

    lottieModel.controls && lottieplayerEl.setAttribute('controls', lottieModel.controls);
    if (lottieModel.loop !== -1) {
      lottieplayerEl.setAttribute('loop', true);
      lottieplayerEl.setAttribute('count', lottieModel.loop);
    }
    lottieModel.autoplay && lottieplayerEl.setAttribute('autoplay', lottieModel.autoplay);
    lottieModel.speed && lottieModel.speed > 1 && lottieplayerEl.setAttribute('speed', lottieModel.speed);
    lottieModel.style && lottieplayerEl.setAttribute('style', lottieModel.style);
    lottieModel.renderer && lottieplayerEl.setAttribute('renderer', lottieModel.renderer);
    lottieModel.background && lottieplayerEl.setAttribute('background', lottieModel.background);
    lottieModel.preserveAspectRatio && lottieplayerEl.setAttribute('preserveAspectRatio', lottieModel.preserveAspectRatio);
    lottieplayerEl.setAttribute('src', lottieModel.src);

    this.model.set('lottieplayer', lottieplayerEl.outerHTML);

    // this.$el.on('onscreen', this.onScreenChange.bind(this));
  }

  postRender() {

    const lottieplayer = this.$('lottie-player')[0];
    lottieplayer.addEventListener('ready', () => {
      Adapt.trigger('lottie:ready', this);
      this.setReadyStatus();
    });
    lottieplayer.addEventListener('error', () => {
      this.setReadyStatus();
      this.model.set('failed', this.model.get('_lottie').failed);
    });
    lottieplayer.addEventListener('play', () => {
      Adapt.trigger('lottie:play', this);
    });
    lottieplayer.addEventListener('pause', () => {
      Adapt.trigger('lottie:pause', this);
    });
    if (this.model.get('_setCompletionOn') === 'inview') {
      this.setupInviewCompletion('.component__widget');
    } else {
      lottieplayer.addEventListener('complete', () => {
        this.setCompletionStatus();
      });
    }
    const interactivity = this.model.get('_lottie').interactivity;
    if (interactivity) {
      interactivity.player = lottieplayer;
      LottieInteractivity.create(interactivity);
    }
  }

  /* onScreenChange(event, { onscreen, percentInview } = {}) {
    const isOffScreen = (!onscreen || percentInview < 1);
    if (isOffScreen) {

      return;
    }
    if (this.model.get('wasPlayed') === true) return;

    console.log(this.model.get('wasPlayed'));
    const lottieModel = this.model.get('_lottie');
    const lottieplayer = this.$('lottie-player')[0];
    if (lottieModel.autoplay) {
      this.model.set('wasPlayed', true);
      lottieplayer.play();
    }
  } */
}

LottieInteractivityView.template = 'lottieInteractivity.jsx';

export default LottieInteractivityView;
