import Adapt from 'core/js/adapt';
import LottieInteractivityView from './LottieInteractivityView';
import LottieInteractivityModel from './LottieInteractivityModel';

export default Adapt.register('lottieInteractivity', {
  model: LottieInteractivityModel,
  view: LottieInteractivityView
});
