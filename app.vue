<script setup lang="ts">
  import gsap from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  // Utils
  import { lerp } from '@/scripts/utils';

  gsap.registerPlugin(ScrollTrigger);

  const { resetLoader, loadPage } = useLoaderComposable();
  const route = useRoute();
  
  useHead({
    titleTemplate: 'Sam Thompson',
    bodyAttrs: {
      class: "antialiased selection:bg-accent selection:text-secondary",
    },
  });

  const targetScrollX = ref(0);
  const currentScrollX = ref(0);

  const scrollContainer = ref(null);
  const innerContent = ref(null);
  const clonedInnerContent = ref(null);

  const contentWidth = ref(0);

  const isDown = ref(false);
  const isDragging = ref(false);
  const prevX = ref(0);
  const currentX = ref(0);

  const navItemHovered = ref(false);

  const handleNavItemClicked = (page: string) => {
    const targetPage = document.querySelectorAll(`.${page}`);
    const targetPageOffset1 = targetPage[0].getBoundingClientRect().left;
    const targetPageOffset2 = targetPage[1].getBoundingClientRect().left;
    let closestTargetOffset = targetPageOffset1;
    const distance1 = Math.abs(currentScrollX.value - targetPageOffset1);
    const distance2 = Math.abs(currentScrollX.value - targetPageOffset2);
    if (distance1 > distance2) {
      closestTargetOffset = targetPageOffset2;
    }
    targetScrollX.value -= closestTargetOffset;
  }

  const handleMouseDown = (e) => {
    isDown.value = true;
    prevX.value = e.pageX;

  };

  const handleMouseMove = (e) => {
    if (!isDown.value) return;
    e.preventDefault();
    
    if (scrollContainer.value) {
      isDragging.value = true;
      currentX.value = e.pageX;
      const walk = (currentX.value - prevX.value) * 3;
      targetScrollX.value += walk;

      prevX.value = currentX.value;
    }
  };

  const handleMouseLeave = () => {
    isDown.value = false;
    isDragging.value = false;
    if (scrollContainer.value) {
      scrollContainer.value.classList.remove('active', 'cursor-grabbing');
    }
  };
  const handleMouseUp = () => {
    isDown.value = false;
    isDragging.value = false;
    if (scrollContainer.value) {
      scrollContainer.value.classList.remove('active', 'cursor-grabbing');
    }
  };

  onMounted(() => {
    loadPage('app');

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
    <LayoutCustomCursor
      :navItemHovered="navItemHovered"
      :isDragging="isDragging"
    />
    <main ref="scrollContainer" class="relative overflow-hidden cursor-none">
      <LayoutSidebar
        @navItemClicked="handleNavItemClicked"
        @navItemMouseEnter="navItemHovered = true"
        @navItemMouseLeave="navItemHovered = false"
      />
      <div ref="innerContent" class="fixed inset-0 flex flex-row flex-nowrap will-change-transform" style="transform: translate3d(0, 0, 0);">
        <HomePage />
        <CareerPage />
        <AboutPage />
        <ProjectsPage />
        <Showcase1Page />
        <Showcase2Page />
        <Showcase3Page />
        <ContactPage />
      </div>
    </main>
    <LayoutCookieConsent />
  </div>
</template>
