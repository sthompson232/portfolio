<!-- TO BE ADDED TO app.vue -->
<script setup lang="ts">
	import gsap from 'gsap';
	import { getMousePos, distance, lerp, isTouchDevice } from '@/scripts/utils';

	onMounted(() => {
		const trailImages = [
			'/images/dev/1.jpg',
			'/images/dev/2.jpg',
			'/images/dev/3.jpg',
			'/images/dev/4.jpg',
			'/images/dev/5.jpg',
			'/images/dev/6.jpg',
			'/images/dev/7.jpg',
			'/images/dev/8.jpg',
			'/images/dev/9.jpg',
			'/images/dev/1.jpg',
			'/images/dev/2.jpg',
			'/images/dev/3.jpg',
			'/images/dev/4.jpg',
			'/images/dev/5.jpg',
			'/images/dev/6.jpg',
			'/images/dev/7.jpg',
			'/images/dev/8.jpg',
			'/images/dev/9.jpg',
			'/images/dev/1.jpg',
			'/images/dev/2.jpg',
		];

		class ImageTrailImage {
		  element;
		  rect;

		  constructor(element) {
		    this.element = element;
		    this.getRect();
		    window.addEventListener('resize', () => this.resize());
		  }
		  resize() {
		    gsap.set(this.element, {
		        scale: 1,
		        x: 0,
		        y: 0,
		        opacity: 0
		    });
		    this.getRect();
		  }
		  getRect() {
		    this.rect = this.element.getBoundingClientRect();
		  }
		  isActive() {
		    // check if image is animating or if it's visible
		    return gsap.isTweening(this.element) || parseFloat(this.element.style.opacity) !== 0;
		  }
		}

		class ImageTrail {
			imageSources = trailImages;
		  element;
		  images;
		  totalImages;
		  imgPosition;
		  zIndexVal;
		  mouseDistanceThreshold;
			mousePos = {x: 0, y: 0};
			lastMousePos = {x: 0, y: 0};
			cacheMousePos = {x: 0, y: 0};
			scrollX;
			scrollY;

		  constructor() {
				if (import.meta.client && !isTouchDevice()) {
					this.scrollX = window.scrollX;
					this.scrollY = window.scrollY;

					this.images = [];

					this.imageSources.forEach((imgSource) => {
						const img = new Image();
						img.src = imgSource;
						gsap.set(img, { position: 'absolute', maxWidth: '250px', top: 0, left: 0, opacity: 0, willChange: 'transform' });
						document.querySelector('.image-trail-container').appendChild(img);
						this.images.push(new ImageTrailImage(img));
					})

					this.totalImages = this.images.length;
					this.imgPosition = 0;
					this.zIndexVal = 1;
					this.mouseDistanceThreshold = 100;
					// render the images
					requestAnimationFrame(() => this.render());

					window.addEventListener('mousemove', (e) => (
						this.mousePos = getMousePos(e)
					));
					window.addEventListener('scroll', (e) => {
						this.scrollX = window.scrollX;
						this.scrollY = window.scrollY;
					});
				}
		  }

			getMouseDistance = () => distance(this.mousePos.x, this.mousePos.y, this.lastMousePos.x, this.lastMousePos.y);

		  render() {
		    let distanceBetweenMouseAndCurrentPosition = this.getMouseDistance();
		    this.cacheMousePos.x = lerp(this.cacheMousePos.x || this.mousePos.x, this.mousePos.x + this.scrollX, 0.1);
		    this.cacheMousePos.y = lerp(this.cacheMousePos.y || this.mousePos.y, this.mousePos.y + this.scrollY, 0.1);

		    if (distanceBetweenMouseAndCurrentPosition > this.mouseDistanceThreshold) {
		      this.showNextImage();
		      this.zIndexVal += 1;
		      if (this.imgPosition < this.totalImages - 1) {
		        this.imgPosition = this.imgPosition + 1;
		      } else {
		        this.imgPosition = 0;
		      }
		      this.lastMousePos = this.mousePos;
		    }

		    // Check if no images are animating so we can reset the z-index
		    let isIdle = true;
		    for (let img of this.images) {
		      if (img.isActive()) {
		        isIdle = false;
		        break;
		      }
		    }
		    if (isIdle && this.zIndexVal !== 1) {
		      this.zIndexVal = 1;
		    }

		    requestAnimationFrame(() => this.render());
		  }

		  showNextImage() {
		    const img = this.images[this.imgPosition];
		    gsap.killTweensOf(img.element);

		    gsap.timeline()
					.set(img.element, {
			      opacity: 1,
			      scale: 1,
			      zIndex: this.zIndexVal,
			      x: this.cacheMousePos.x - img.rect.width / 2,
			      y: this.cacheMousePos.y - img.rect.height / 2
			    }, 0)
			    .to(img.element, {
			      duration: 1,
			      ease: 'expo.out',
			      x: this.mousePos.x - img.rect.width / 2 + this.scrollX,
			      y: this.mousePos.y - img.rect.height / 2 + this.scrollY
			    }, 0)
					.to(img.element, {
			      duration: 1,
			      ease: 'power2.out',
						scale: 0,
			      opacity: 0,
			    }, 0.5)
		  }
		}
		new ImageTrail();
	})
</script>
<template>
	<div class="image-trail-container"></div>
</template>
