<script setup lang="ts">
	import gsap from 'gsap';

	const props = defineProps(['scrollContainer']);

	const { loadingState } = useLoaderComposable();
	const { toggleTransitionComplete } = useTransitionComposable();

  const runtimeConfig = useRuntimeConfig();
  const { title } = runtimeConfig.public;

	const transitionHTML = ref(null);
	const transitionTitle = ref(null);

  onMounted(() => {
		class InitialLoadTransition {
		  constructor() {
				this.startTransition();
		  }

		  startTransition = () => {
				gsap.set(transitionHTML.value, { display: 'block' });
		    if (loadingState.loadingComplete) {
		      this.outroTransition();
		    } else {
		      this.loadingAnimation();
		    }
		  }

		  loadingAnimation = () => {
		    console.log('Loading...', loadingState.totalProgress);
		    if (loadingState.loadingComplete) {
		      this.outroTransition();
		    } else {
		      requestAnimationFrame(this.loadingAnimation);
		    }
		  }

		  outroTransition = () => {
				gsap.timeline()
					.to(props.scrollContainer, {
						y: 0,
						rotate: 0,
						duration: 3,
						ease: 'power4.out',
					}, 0)
					.to(transitionHTML.value, {
						backgroundColor: 'black',
						duration: 2.7,
						ease: 'power3.out',
					}, 0.3)
				toggleTransitionComplete(true);
		  }
		}
    new InitialLoadTransition();  
  });
</script>
<template>
  <div>
    <div class="relative">
      <!-- TRANSITION HTML -->
      <div
        ref="transitionHTML"
        class="bg-white h-dvh inset-0 z-transition-html"
      >
        <!-- LOGO -->
        <div class="pointer-events-none h-auto absolute top-1/2 -translate-y-1/2 p-4 sm:p-6 flex justify-center w-full">
          <div class="overflow-hidden">
            <h1 ref="transitionTitle" class="h3">{{ title }}</h1>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
