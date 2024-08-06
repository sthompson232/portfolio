<script setup lang="ts">
  import gsap from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  // Utils
  import { lerp } from '@/scripts/utils';

  gsap.registerPlugin(ScrollTrigger);

  const { appState, setCurrentScrollX, setTargetScrollX, setContentWidth, setScreenWidth, setIsDragging, setInnerContentTranslateX, setClonedInnerContentTranslateX } = useAppComposable();
  const { resetLoader, loadPage } = useLoaderComposable();
  const route = useRoute();
  
  useHead({
    titleTemplate: 'Sam Thompson',
    bodyAttrs: {
      class: "antialiased selection:bg-accent selection:text-secondary",
    },
  });

  const scrollContainer = ref(null);
  const innerContent = ref(null);
  const clonedInnerContent = ref(null);

  const isDown = ref(false);
  const prevX = ref(0);
  const currentX = ref(0);

  const navItemHovered = ref(false);

  const handleNavItemClicked = (page: string) => {
    const targetPage = document.querySelectorAll(`.${page}`);
    const targetPageOffset1 = targetPage[0].getBoundingClientRect().left;
    const targetPageOffset2 = targetPage[1].getBoundingClientRect().left;
    let closestTargetOffset = targetPageOffset1;
    const distance1 = Math.abs(appState.currentScrollX - targetPageOffset1);
    const distance2 = Math.abs(appState.currentScrollX - targetPageOffset2);
    if (distance1 > distance2) {
      closestTargetOffset = targetPageOffset2;
    }
    setTargetScrollX(appState.targetScrollX - closestTargetOffset);
  }

  const handleMouseDown = (e) => {
    isDown.value = true;
    prevX.value = e.pageX;

  };

  const handleMouseMove = (e) => {
    if (!isDown.value) return;
    e.preventDefault();
    
    if (scrollContainer.value) {
      setIsDragging(true);
      currentX.value = e.pageX;
      const walk = (currentX.value - prevX.value) * 3;
      setTargetScrollX(appState.targetScrollX += walk);

      prevX.value = currentX.value;
    }
  };

  const handleMouseLeave = () => {
    isDown.value = false;
    setIsDragging(false);
    if (scrollContainer.value) {
      scrollContainer.value.classList.remove('active', 'cursor-grabbing');
    }
  };
  const handleMouseUp = () => {
    isDown.value = false;
    setIsDragging(false);
    if (scrollContainer.value) {
      scrollContainer.value.classList.remove('active', 'cursor-grabbing');
    }
  };

  onMounted(() => {
    loadPage('app');

    // Get width of content
    setContentWidth(innerContent.value.$refs.outerDiv.scrollWidth);
    setScreenWidth(window.innerWidth);

    function tick() {
      // Lerp current scroll
      setCurrentScrollX(lerp(appState.currentScrollX, appState.targetScrollX, 0.1));

      // Get offset of the content element from when translate X is 0. Must work when scroll value is both positive and negative
      const scrollOffset = ((appState.currentScrollX % appState.contentWidth) + appState.contentWidth) % appState.contentWidth;

      // Use scroll offset to set translation values for content
      setInnerContentTranslateX(scrollOffset);
      setClonedInnerContentTranslateX(scrollOffset - appState.contentWidth);

      requestAnimationFrame(tick);
    }
    tick();

    window.addEventListener('wheel', (e) => {
      setTargetScrollX(appState.targetScrollX - e.deltaY);
    });

    window.addEventListener('resize', () => {
      setCurrentScrollX(0);
      setTargetScrollX(0);
      setContentWidth(innerContent.value.$refs.outerDiv.scrollWidth);
      setScreenWidth(window.innerWidth);
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
    <LayoutCustomCursor :navItemHovered="navItemHovered" />
    <main ref="scrollContainer" class="relative overflow-hidden cursor-none">
      <LayoutSidebar
        @navItemClicked="handleNavItemClicked"
        @navItemMouseEnter="navItemHovered = true"
        @navItemMouseLeave="navItemHovered = false"
      />
      <InnerContent ref="innerContent" :transform="appState.innerContentTranslateX" />
      <InnerContent ref="clonedInnerContent" :transform="appState.clonedInnerContentTranslateX" />
    </main>
  </div>
</template>
