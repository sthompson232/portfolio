<!-- MUST HAVE OUTER CONTAINER WITH parallax-container CLASS AND INNER ELEMENT WITH data-speed ATTRIBUTE -->
<script setup lang="ts">
	import gsap from 'gsap';

	onMounted(() => {
		const parallaxElements = document.querySelectorAll("[data-speed]");
    if (parallaxElements && parallaxElements.length) {
      parallaxElements.forEach((parallaxElement) => {
        const parallaxContainer = parallaxElement.closest('.parallax-container');
        const maxScrollDistance = parallaxContainer.offsetHeight;
        gsap.to(parallaxElement, {
	        y: (i, el) => {
	          const speed = parseFloat(el.getAttribute("data-speed"));
	          const yTransform = (1 - speed) * maxScrollDistance;
	          return yTransform;
	        },
	        ease: "none",
	        scrollTrigger: {
	          trigger: parallaxContainer,
	          scrub: 0.5,
	          start: 'top bottom',
	          end: 'bottom top',
	        }
	      });
      })
    }
	})
</script>
<template>
	<div class="parallax-container min-h-dvh flex items-center justify-center bg-[url(/images/dev/1.jpg)] bg-center bg-cover bg-no-repeat">
		<img src="/images/dev/2.jpg" alt="" data-speed="0.8" class="max-w-[500px] mx-auto" />
	</div>
</template>
