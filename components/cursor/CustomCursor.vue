<!-- TO BE ADDED TO app.vue -->
<script setup lang="ts">
	import gsap from 'gsap';
	// Utils
	import { lerp, getMousePos, isTouchDevice } from '@/scripts/utils';

	onMounted(() => {
		class CustomCursor {
		  currentMousePosition = {
		    x: 0,
		    y: 0,
		  };
		  cursorElement = document.getElementById('cursor');
		  cursorBounds = this.cursorElement.getBoundingClientRect();
		  cursorPosition = {
		    x: {
		      previous: 0,
		      current: 0,
		    },
		    y: {
		      previous: 0,
		      current: 0,
		    }
		  }
		  lerpAmount = 0.2;

		  constructor() {
		    if (!isTouchDevice()) {
		      window.addEventListener('mousemove', (e) => {
		        this.currentMousePosition = getMousePos(e);
		      });
		      window.addEventListener('mousemove', this.onInitMouseMove);
		    }
		  }

		  onInitMouseMove = () => {
		    const initialCursorPositionX = this.currentMousePosition.x - this.cursorBounds.width / 2;
		    const initialCursorPositionY = this.currentMousePosition.y - this.cursorBounds.height / 2;
		    this.cursorPosition.x.previous = initialCursorPositionX;
		    this.cursorPosition.x.current = initialCursorPositionX;
		    this.cursorPosition.y.previous = initialCursorPositionY;
		    this.cursorPosition.y.previous = initialCursorPositionY;
		    gsap.to(this.cursorElement, {
		      opacity: 1,
		      ease: 'power3.easeOut',
		    });
		    window.removeEventListener('mousemove', this.onInitMouseMove);
		    requestAnimationFrame(this.tick);
		  };

		  tick = () => {
		    this.cursorPosition.x.current = this.currentMousePosition.x - this.cursorBounds.width / 2;
		    this.cursorPosition.y.current = this.currentMousePosition.y - this.cursorBounds.height / 2;
		  
		    this.cursorPosition.x.previous = lerp(this.cursorPosition.x.previous, this.cursorPosition.x.current, this.lerpAmount);
		    this.cursorPosition.y.previous = lerp(this.cursorPosition.y.previous, this.cursorPosition.y.current, this.lerpAmount);            

		    this.cursorElement.style.transform = `translateX(${(this.cursorPosition.x.previous)}px) translateY(${this.cursorPosition.y.previous}px)`;
		    
		    requestAnimationFrame(this.tick);
		  }
		}
		new CustomCursor();
	});
</script>
<template>
	<svg
		id="cursor"
		class="fixed z-cursor top-0 left-0 block pointer-events-none will-change-transform opacity-0"
		width="80"
		height="80"
		viewBox="0 0 80 80"
	>
		<circle class="fill-accent stroke-primary opacity-30" cx="40" cy="40" r="15"/>
	</svg>
</template>
