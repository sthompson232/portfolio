import Lenis from 'lenis';
import { isTouchDevice } from '@/scripts/utils';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

export default class CustomScroll {
	lenis;

	constructor(scrollContainer) {
		if (!isTouchDevice()) {
			this.lenis = new Lenis({
				direction: 'horizontal',
				orientation: 'horizontal',
				gestureOrientation: 'horizontal',

				easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),

				content: scrollContainer,
				wrapper: scrollContainer
			});

			window.addEventListener('wheel', (e) => {
				scrollContainer.scrollLeft += e.deltaY;
			});

			requestAnimationFrame(this.raf);


		}
	}

	raf = (time) => {
		this.lenis.raf(time);
		requestAnimationFrame(this.raf.bind(this));
	}
}
