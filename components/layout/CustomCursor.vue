<!-- TO BE ADDED TO app.vue -->
<script setup lang="ts">
	import gsap from 'gsap';
	import {
		ChevronLeftIcon,
		ChevronRightIcon,
	} from '@heroicons/vue/24/solid';
	// Utils
	import { lerp, getMousePos, isTouchDevice } from '@/scripts/utils';

	const chevronWidth = 24;
	const chevronLeft = ref(null);
	const chevronRight = ref(null);
	const innerCursor = ref(null);
	const outerCursor = ref(null);
	const dragTimeline = ref(null);
	const currentMousePosition = ref({
    x: 0,
    y: 0,
  });
  const cursorBounds = ref(null);
  const cursorPosition = ref({
    x: {
      current: 0,
			target: 0,
    },
    y: {
      current: 0,
			target: 0,
    }
  });

	const onInitMouseMove = () => {
    const initialCursorPositionX = currentMousePosition.value.x - cursorBounds.value.width / 2;
    const initialCursorPositionY = currentMousePosition.value.y - cursorBounds.value.height / 2;
    cursorPosition.value.x.current = initialCursorPositionX;
		cursorPosition.value.x.target = initialCursorPositionX;
    cursorPosition.value.y.current = initialCursorPositionY;
		cursorPosition.value.y.target = initialCursorPositionY;
    gsap.to([innerCursor.value, outerCursor.value], {
      opacity: 1,
      ease: 'power3.easeOut',
    });
    window.removeEventListener('mousemove', onInitMouseMove);
    requestAnimationFrame(tick);
  };

	const handleMouseDown = () => {
		dragTimeline.value.play();
	}

	const handleMouseUp = () => {
		dragTimeline.value.reverse();
	}

  const tick = () => {
    cursorPosition.value.x.target = currentMousePosition.value.x - cursorBounds.value.width / 2;
    cursorPosition.value.y.target = currentMousePosition.value.y - cursorBounds.value.height / 2;
  
    cursorPosition.value.x.current = lerp(cursorPosition.value.x.current, cursorPosition.value.x.target, 0.2);
    cursorPosition.value.y.current = lerp(cursorPosition.value.y.current, cursorPosition.value.y.target, 0.2);            

		// CURSOR POSITIONS
    innerCursor.value.style.transform = `translateX(${(cursorPosition.value.x.target)}px) 
																				 translateY(${cursorPosition.value.y.target}px)`;
		outerCursor.value.style.transform = `translateX(${(cursorPosition.value.x.current)}px)
																				 translateY(${cursorPosition.value.y.current}px)`;
    
		// CHEVRON POSITIONS
		chevronLeft.value.style.transform = `translate3d(${(currentMousePosition.value.x - (chevronWidth / 2)) - 30}px,
																										 ${currentMousePosition.value.y - (chevronWidth / 2)}px,
																										 0)`;
		chevronRight.value.style.transform = `translate3d(${(currentMousePosition.value.x - (chevronWidth / 2)) + 30}px,
																											${currentMousePosition.value.y - (chevronWidth / 2)}px,
																											0)`;

    requestAnimationFrame(tick);
  }

	onMounted(() => {
    if (!isTouchDevice()) {
			dragTimeline.value = gsap.timeline({ paused: true })
				.to(innerCursor.value.querySelector('circle'), {
					attr: {
						r: 8
					},
					duration: 0.3,
					ease: 'power2.inOut',
				}, 0)
				.to(outerCursor.value.querySelector('circle'), {
					attr: {
						r: 70,
					},
					duration: 0.3,
					ease: 'power2.inOut',
				}, 0)
				.to([chevronLeft.value, chevronRight.value], {
					opacity: 1,
					duration: 0.2,
					ease: 'power2.in',
				}, 0.1);
			cursorBounds.value = innerCursor.value.getBoundingClientRect();

      window.addEventListener('mousemove', (e) => {
        currentMousePosition.value = getMousePos(e);
      });
      window.addEventListener('mousemove', onInitMouseMove);
			window.addEventListener('mousedown', handleMouseDown);
	    window.addEventListener('mouseleave', handleMouseUp);
	    window.addEventListener('mouseup', handleMouseUp);
    }
	});
</script>
<template>
	<div>
		<svg
			ref="outerCursor"
			class="fixed z-cursor top-0 left-0 block pointer-events-none will-change-transform opacity-0"
			width="160"
			height="160"
			viewBox="0 0 160 160"
		>
			<circle class="fill-none stroke stroke-neutral-300" cx="80" cy="80" r="14"/>
		</svg>
		<svg
			ref="innerCursor"
			class="fixed z-cursor top-0 left-0 block pointer-events-none will-change-transform opacity-0"
			width="160"
			height="160"
			viewBox="0 0 160 160"
		>
			<circle class="fill-black" cx="80" cy="80" r="15"/>
		</svg>
		<div ref="chevronLeft" class="fixed w-[160px] h-[160px] z-cursor top-0 left-0 pointer-events-none will-change-transform scale-0 opacity-0">
			<ChevronLeftIcon class="w-6 h-6" />
		</div>
		<div ref="chevronRight" class="fixed w-[160px] h-[160px] z-cursor top-0 left-0 pointer-events-none will-change-transform scale-0 opacity-0">
			<ChevronRightIcon class="w-6 h-6" />
		</div>
	</div>
</template>
