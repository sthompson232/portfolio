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

  const isDown = ref(false);
  const prevX = ref(0);
  const currentX = ref(0);

  const handleMouseDown = (e) => {
    isDown.value = true;
    prevX.value = e.pageX;
    if (scrollContainer.value) {
      scrollContainer.value.classList.add('active', 'cursor-grabbing');
    }
  };

  const handleMouseMove = (e) => {
    if (!isDown.value) return;
    e.preventDefault();
    
    if (scrollContainer.value) {
      currentX.value = e.pageX;
      const walk = (currentX.value - prevX.value) * 3;
      targetScrollX.value += walk;

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
    // Get width of content
    contentWidth.value = innerContent.value.scrollWidth;

    // Create cloned content
    clonedInnerContent.value = innerContent.value.cloneNode(true);
    scrollContainer.value.appendChild(clonedInnerContent.value);

    function tick() {
      // Lerp current scroll
      currentScrollX.value = lerp(currentScrollX.value, targetScrollX.value, 0.1);

      // Get offset of the content element from when translate X is 0. Must work when scroll value is both positive and negative
      const scrollOffset = ((currentScrollX.value % contentWidth.value) + contentWidth.value) % contentWidth.value;

      // Use scroll offset to set translation values for content
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
      currentScrollX.value = 0;
      targetScrollX.value = 0;
      screenWidth.value = innerContent.value.offsetWidth;
      contentWidth.value = innerContent.value.scrollWidth;
    });

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mousemove', handleMouseMove);
  });

  watch(() => route.name, () => {
    resetLoader(route.name);
  });
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
