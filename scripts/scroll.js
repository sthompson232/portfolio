import Lenis from 'lenis';
import { isTouchDevice } from '@/scripts/utils';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

export default class CustomScroll {
	constructor(scrollContainer) {
		if (!isTouchDevice()) {
			const lenis = new Lenis({
				easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
				orientation: 'horizontal',
				content: scrollContainer,
				wrapper: scrollContainer,
				virtualScroll: () => false,
			});
	
			function raf(time) {
				lenis.raf(time);
				requestAnimationFrame(raf);
			}
			requestAnimationFrame(raf);
	
			window.addEventListener('wheel', (e) => {
				scrollContainer.scrollLeft += e.deltaY;
			});
	
			lenis.on('scroll', (e) => {
				console.log(e);
			});

			gsap.ticker.add((time) => {
				lenis.raf(time * 1000);
			});
			
			gsap.ticker.lagSmoothing(0);
		}
	}
}
