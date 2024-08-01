<script setup lang="ts">
  import gsap from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  // Utils
  import { lerp } from '@/scripts/utils';

  gsap.registerPlugin(ScrollTrigger);

  const { resetLoader } = useLoaderComposable();
  const route = useRoute();
  
  useHead({
    titleTemplate: title => title ? `${title} | Netlio` : 'Netlio',
    bodyAttrs: {
      class: "antialiased selection:bg-accent selection:text-secondary",
    },
  });

  const targetScrollX = ref(0);
  const currentScrollX = ref(0);
  const scrollContainer = ref(null);
  const innerContent = ref(null);
  const clonedInnerContent = ref(null);

  const screenWidth = ref(0);
  const contentWidth = ref(0);

  onMounted(() => {
    // Get width of content
    contentWidth.value = innerContent.value.scrollWidth;

    // Create cloned content
    clonedInnerContent.value = innerContent.value.cloneNode(true);
    scrollContainer.value.appendChild(clonedInnerContent.value);

    function tick() {
      currentScrollX.value = lerp(currentScrollX.value, targetScrollX.value, 0.1);

      const scrollOffset = ((currentScrollX.value % contentWidth.value) + contentWidth.value) % contentWidth.value;

      const innerContentTranslateX = scrollOffset;
      const clonedInnerContentTranslateX = scrollOffset - contentWidth.value;

      innerContent.value.style.transform = `translate3d(${innerContentTranslateX}px, 0, 0)`;
      clonedInnerContent.value.style.transform = `translate3d(${clonedInnerContentTranslateX}px, 0, 0)`;

      requestAnimationFrame(tick);
    }
    tick();

    window.addEventListener('wheel', (e) => {
      targetScrollX.value -= e.deltaY;
    });

    window.addEventListener('resize', () => {
      screenWidth.value = innerContent.value.offsetWidth;
      contentWidth.value = innerContent.value.scrollWidth;
    });
  });

  watch(() => route.name, () => {
    resetLoader(route.name);
  })
</script>

<template>
  <div>
    <LayoutInitialLoadTransition />
    <LayoutPageTransition />
    <main ref="scrollContainer" class="overflow-hidden">
      <div ref="innerContent" class="fixed inset-0 flex flex-row flex-nowrap will-change-transform" style="transform: translate3d(0, 0, 0);">
        <div class="min-w-[100vw] min-h-screen flex justify-center items-center bg-red-500">
    			<h1 class="h1">Section 1</h1>
    		</div>
    		<div class="min-w-[100vw] min-h-screen flex justify-center items-center bg-green-500">
    			<h1 class="h1">Section 2</h1>
    		</div>
    		<div class="min-w-[100vw] min-h-screen flex justify-center items-center bg-blue-500">
    			<h1 class="h1">Section 3</h1>
    		</div>
      </div>
      <NuxtPage />
    </main>
    <LayoutCookieConsent />
  </div>
</template>
