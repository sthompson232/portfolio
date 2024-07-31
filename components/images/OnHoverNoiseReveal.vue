<script setup lang="ts">
	// https://tympanus.net/codrops/2019/03/12/image-distortion-effects-with-svg-filters/
	import gsap from "gsap";
	import { lerp, getMousePos, lineEq, distance } from '@/scripts/utils';

	onMounted(() => {
		const imageDistortionContainer = document.getElementById('image-distortion-container');
	  const feDisplacementMap = document.getElementById('image-distortion-displacement-map');
	  const menu = document.getElementById('image-distortion-menu');
	  const imageSvg = document.getElementById('image-svg');
	  const images = document.querySelectorAll('.image-distortion-image');
	  const menuItems = document.querySelectorAll('.image-distortion-menu-item');
	  let imageDistortionContainerOffset = imageDistortionContainer.getBoundingClientRect().top;
	  let dmScale = 0;
	  let activeItemIndex = -1;
	  let transitionFromNoOtherImage = true;
	  let mousePosition = {
	    x: window.innerWidth / 2,
	    y: window.innerHeight / 2,
	  };
	  let lastMousePosition = {
	    translation: {
	      x: window.innerWidth / 2,
	      y: window.innerHeight / 2,
	    },
	    displacement: {
	      x: 0,
	      y: 0,
	    }
	  };

	  window.addEventListener('scroll', () => {
	    imageDistortionContainerOffset = imageDistortionContainer.getBoundingClientRect().top;
	  });

	  window.addEventListener('mousemove', (e) => {
	    mousePosition = getMousePos(e);
	  });

	  menuItems.forEach((item, index) => {
	    item.addEventListener('mouseenter', () => {
	      // Hide the previous menu image.
	      if (activeItemIndex !== -1) {
	        gsap.killTweensOf(images[activeItemIndex]);
	        gsap.set(images[activeItemIndex], {
	          opacity: 0,
	        });
	      }

	      // Set the active image
	      activeItemIndex = index;

	      // Animate active image in
	      if (transitionFromNoOtherImage) {
	        gsap.to(images[activeItemIndex], {
	          ease: 'power3.out',
	          opacity: 1,
	        });
	        transitionFromNoOtherImage = false;
	      } else {
	        gsap.set(images[activeItemIndex], {
	          opacity: 1,
	        });
	      }
	    });
	  });

	  menu.addEventListener('mouseenter', () => {
	    transitionFromNoOtherImage = true;
	  });
	  menu.addEventListener('mouseleave', () => {
	    gsap.to(images[activeItemIndex], {
	      ease: 'power3.out',
	      opacity: 0,
	    });
	  });

	  function render() {
	    // Place image
	    lastMousePosition.translation.x = lerp(lastMousePosition.translation.x, mousePosition.x, 0.2);
	    lastMousePosition.translation.y = lerp(lastMousePosition.translation.y, mousePosition.y, 0.2);
	    // Place SVG filter on top of image
	    imageSvg.style.transform = `translateX(${(lastMousePosition.translation.x - (window.innerWidth / 2))}px) translateY(${lastMousePosition.translation.y - (window.innerHeight / 2) - imageDistortionContainerOffset}px)`;
	    
	    // Scale goes from 0 to 50 for mouseDistanceBetweenTwoPoints values between 0 to 140
	    lastMousePosition.displacement.x = lerp(lastMousePosition.displacement.x, mousePosition.x, 0.1);
	    lastMousePosition.displacement.y = lerp(lastMousePosition.displacement.y, mousePosition.y, 0.1);
	    const mouseDistanceBetweenTwoPoints = distance(
				mousePosition.x,
				mousePosition.y,
	      lastMousePosition.displacement.x,
				lastMousePosition.displacement.y,
	    );
	    dmScale = Math.min(lineEq(50, 0, 140, 0, mouseDistanceBetweenTwoPoints), 50);
	    feDisplacementMap.scale.baseVal = dmScale;

	    requestAnimationFrame(render);
	  }
	  requestAnimationFrame(render);
	})
  
</script>
<template>
	<div id="image-distortion-container" class="relative min-h-screen flex flex-col w-full justify-center items-center overflow-hidden">
	  <svg id="image-svg" class="absolute z-absolute pointer-events-none will-change-transform" width="350" height="450" viewBox="0 0 350 450">
	    <filter id="distortionFilter">
	      <feTurbulence type="turbulence" baseFrequency="0.07 0.01" numOctaves="5" seed="2" stitchTiles="stitch" x="0%" y="0%" width="100%" height="100%" result="noise"/>
	      <feDisplacementMap id="image-distortion-displacement-map" in="SourceGraphic" in2="noise" scale="0" xChannelSelector="R" yChannelSelector="B" x="0%" y="0%" width="100%" height="100%" filterUnits="userSpaceOnUse"/>
	    </filter>
	    <g filter="url(#distortionFilter)">
	      <image class="image-distortion-image" width="250" height="350" x="50" y="50" xlink:href="/images/dev/1.jpg" />
	      <image class="image-distortion-image" width="250" height="350" x="50" y="50" xlink:href="/images/dev/2.jpg" />
	      <image class="image-distortion-image" width="250" height="350" x="50" y="50" xlink:href="/images/dev/3.jpg" />
	      <image class="image-distortion-image" width="250" height="350" x="50" y="50" xlink:href="/images/dev/4.jpg" />
	    </g>
	  </svg>
	  <nav id="image-distortion-menu" class="flex flex-col items-stretch text-center text-clamp-9xl z-10">
	    <a href="#" class="image-distortion-menu-item">Shanghai</a>
	    <a href="#" class="image-distortion-menu-item">Taipei</a>
	    <a href="#" class="image-distortion-menu-item">Bangkok</a>
	    <a href="#" class="image-distortion-menu-item">Kyoto</a>
	  </nav>
	</div>
</template>
