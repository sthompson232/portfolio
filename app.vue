<script setup lang="ts">
  import gsap from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  // Scripts
  import Lenis from 'lenis';
  import CustomScroll from '@/scripts/scroll';

  gsap.registerPlugin(ScrollTrigger);

  const { resetLoader } = useLoaderComposable();
  const route = useRoute();
  
  useHead({
    titleTemplate: title => title ? `${title} | Netlio` : 'Netlio',
    bodyAttrs: {
      class: "antialiased selection:bg-accent selection:text-secondary",
    },
  });

  const lenis = ref(null);
  const scrollContainer = ref(null);
  const isDown = ref(false);
  const prevX = ref(0);
  const currentX = ref(0);
  const startX = ref(0);
  const scrollLeft = ref(0);

  const handleMouseDown = (e) => {
    isDown.value = true;
    prevX.value = e.clientX;
    scrollLeft.value = scrollContainer.value.scrollLeft;
    if (scrollContainer.value) {
      scrollContainer.value.classList.add('active', 'cursor-grabbing');
    }
  };

  const handleMouseMove = (e) => {
    if (!isDown.value) return;
    e.preventDefault();
    
    if (scrollContainer.value) {
      currentX.value = e.clientX;
      const walk = (currentX.value - prevX.value) * 100; // Difference between current position and start position

      prevX.value = currentX.value;
    }
  };

  const handleMouseLeave = () => {
    isDown.value = false;
    if (scrollContainer.value) {
      scrollContainer.value.classList.remove('active', 'cursor-grabbing');
    }
  };
  const handleMouseUp = () => {
    isDown.value = false;
    if (scrollContainer.value) {
      scrollContainer.value.classList.remove('active', 'cursor-grabbing');
    }
  };

  onMounted(() => {
    lenis.value = new Lenis({
			easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
			orientation: 'horizontal',
			content: scrollContainer.value,
			wrapper: scrollContainer.value,
		});

		function raf(time) {
			lenis.value.raf(time);
      if (!isDown.value) return;
      
      if (scrollContainer.value) {
        const walk = (currentX.value - prevX.value) * 100; // Difference between current position and start position
        console.log(walk);
        lenis.value.scrollTo(lenis.value.targetScroll - walk);

        prevX.value = currentX.value;
      }

			requestAnimationFrame(raf);
		}
		requestAnimationFrame(raf);

		gsap.ticker.add((time) => {
			lenis.value.raf(time * 1000);
		});
		
		gsap.ticker.lagSmoothing(0);

    if (scrollContainer.value) {
      scrollContainer.value.addEventListener('mousedown', handleMouseDown);
      scrollContainer.value.addEventListener('mouseleave', handleMouseLeave);
      scrollContainer.value.addEventListener('mouseup', handleMouseUp);
      scrollContainer.value.addEventListener('mousemove', handleMouseMove);
    }
  });

  watch(() => route.name, () => {
    resetLoader(route.name);
  })
</script>

<template>
  <div>
    <LayoutInitialLoadTransition />
    <LayoutPageTransition />
    <main ref="scrollContainer" class="overflow-x-hidden flex">
      <div class="min-w-[100vw] min-h-screen flex justify-center items-center bg-red-500">
  			<h1 class="h1">Section 1</h1>
  		</div>
  		<div class="min-w-[100vw] min-h-screen flex justify-center items-center bg-green-500">
  			<h1 class="h1">Section 2</h1>
  		</div>
  		<div class="min-w-[100vw] min-h-screen flex justify-center items-center bg-blue-500">
  			<h1 class="h1">Section 3</h1>
  		</div>
      <NuxtPage />
    </main>
    <LayoutCookieConsent />
  </div>
</template>
