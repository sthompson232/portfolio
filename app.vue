<script setup lang="ts">
  import gsap from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  // Scripts
  import Lenis from 'lenis';

  gsap.registerPlugin(ScrollTrigger);

  const { resetLoader } = useLoaderComposable();
  const route = useRoute();
  
  useHead({
    titleTemplate: title => title ? `${title} | Netlio` : 'Netlio',
    bodyAttrs: {
      class: "antialiased  selection:bg-accent selection:text-secondary",
    },
  });

  const scrollContainer = ref(null);

  onMounted(() => {
    const lenis = new Lenis({
      easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
      orientation: 'horizontal',
      content: scrollContainer.value,
      wrapper: scrollContainer.value,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    window.addEventListener('wheel', (e) => {
      scrollContainer.value.scrollLeft += e.deltaY;
    });

			lenis.on('scroll', () => {
					ScrollTrigger.update();
			});

			gsap.ticker.add((time) => {
				lenis.raf(time * 1000);
			});
			
			gsap.ticker.lagSmoothing(0);
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
      <div class="min-w-[50vw] min-h-screen flex justify-center items-center bg-red-500">
  			<h1 class="h1">Section 1</h1>
  		</div>
  		<div class="min-w-[50vw] min-h-screen flex justify-center items-center bg-green-500">
  			<h1 class="h1">Section 2</h1>
  		</div>
  		<div class="min-w-[50vw] min-h-screen flex justify-center items-center bg-blue-500">
  			<h1 class="h1">Section 3</h1>
  		</div>
      <NuxtPage />
    </main>
    <LayoutCookieConsent />
  </div>
</template>
