import gsap from 'gsap';
// Composables
import { useTransitionComposable } from '@/composables/transition-composable';
import { useLoaderComposable } from '@/composables/loader-composable';

const { loadingState } = useLoaderComposable();
const { toggleTransitionComplete } = useTransitionComposable();

export default class PageTransition {
	frameTransitionHTML;
	swipeTransitionHMTL;
  width = 0;
  height = 0;
  aspect = 1;
  resolution = 1;
	startFrameClipPath = "0% 0%, 0% 100%, 0% 100%, 0% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 100%, 100% 100%, 100% 0%"
	endFrameClipPath = "0% 0%, 0% 100%, 5% 100%, 5% 5%, 95% 5%, 95% 95%, 5% 95%, 5% 100%, 100% 100%, 100% 0%"
	startSwipeClipPath = "100% 0% 0%"
	viaSwipeClipPath = "4.9% 0% 0%"
	endSwipeClipPath = "0% 0% 100%"

	constructor() {
		if (import.meta.client) {
			this.frameTransitionHTML = document.querySelector('div#page-frame-transition-html');
			this.swipeTransitionHTML = document.querySelector('div#page-swipe-transition-html');
  
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.aspect = window.innerHeight / window.innerWidth;
      this.resolution = Math.min(window.devicePixelRatio || 1, 2);

      window.addEventListener('resize', this.onResize);
		}
	}

	onBeforeLeave = (el) => {
		gsap.set(el, { scale: 1, transformOrigin: `50% ${window.innerHeight / 2 + window.scrollY}px` });
		gsap.set(this.frameTransitionHTML, { clipPath: `polygon(${this.startFrameClipPath})` });
		gsap.set(this.swipeTransitionHTML, { clipPath: `inset(${this.startSwipeClipPath})` });
	}

	onLeave = (el, done) => {
		gsap.timeline({
			onComplete: () => {
				toggleTransitionComplete(false);
				done();
			},
		})
			.to(el, {
				scale: 0.95,
				ease: 'power2.inOut',
				duration: 0.5,
			}, 0)
			.to(this.frameTransitionHTML, {
				clipPath: `polygon(${this.endFrameClipPath})`,
				ease: 'power2.inOut',
				duration: 0.5,
			}, 0)
			.to(this.swipeTransitionHTML, {
				clipPath: `inset(${this.viaSwipeClipPath})`,
				ease: 'power2.inOut',
				duration: 0.6,
			}, 0.2);
	}

	onBeforeEnter = (el) => {
		window.scrollTo(0, 0);
		gsap.set(el, { scale: 0.95, transformOrigin: `50% ${window.innerHeight / 2 + window.scrollY}px` });
	}

	onAfterLeave = (el) => {}

	onEnter = (el, done) => {
		this.loadingAnimation(el, done);
	}

	loadingAnimation = (el, done) => {
    if (loadingState.loadingComplete) {
			done();
    } else {
      window.requestAnimationFrame(() => this.loadingAnimation(el, done));
    }
  }

	onAfterEnter = (el) => {
		gsap.timeline({
			onComplete: () => {
				this.reset(el);
			},
		})
			.to(this.swipeTransitionHTML, {
				clipPath: `inset(${this.endSwipeClipPath})`,
				ease: 'power2.out',
				duration: 0.6,
			}, 0)
			.to(el, {
				scale: 1,
				ease: 'power2.out',
				duration: 0.5,
			}, 0.1)
			.to(this.frameTransitionHTML, {
				clipPath: `polygon(${this.startFrameClipPath})`,
				ease: 'power2.out',
				duration: 0.5,
			}, 0.1);
	}

	reset = (el) => {
		gsap.set(el, { clearProps: 'all' });
		toggleTransitionComplete(true);
	}

	onLeaveCancelled = (el) => {}

	onEnterCancelled = (el) => {}

	onLoadProgressCallback = (progress) => {}

  onLoadDoneCallback = () => {}

	showHTML() {
    this.frameTransitionHTML.style.display = 'block';
  }

  hideHTML() {
    this.frameTransitionHTML.style.display = 'none';
  }

  onResize = () => {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.aspect = window.innerHeight / window.innerWidth;
  }
}
