<!-- https://tympanus.net/codrops/2024/04/17/some-on-scroll-text-highlight-animations/ -->
<script setup lang="ts">
	import gsap from 'gsap';
	import ScrollTrigger from 'gsap/ScrollTrigger';
	import TextSplitter from '@/scripts/gsap/TextSplitter';

	const { transitionState } = useTransitionComposable();

	const highlight = ref(null);

	class HighlightEffect {
		highlightedElement;
		highlightedChars;
		wrapElement;

	  constructor(el) {
	    // Validates the input element to ensure it's an HTML element.
	    if (!el || !(el instanceof HTMLElement)) {
	      throw new Error('Invalid element provided.');
	    }

	    this.highlightedElement = el;
	    this.highlightedChars = this.highlightedElement.querySelectorAll('.char');
	    
	    // Calls the method to set up the initial effect.
	    this.initializeEffect(this.wrapElement);
	  }
	  
	  // Sets up the initial effect on the provided element.
	  initializeEffect(element) {
	    // Scroll effect.
	    this.scroll();
	  }

	  // Defines the scroll effect logic for the element.
	  scroll() {
	    ScrollTrigger.create({
	      trigger: this.highlightedElement,
	      start: 'top bottom',
	      onEnter: () => this.animateChars(),
	      onEnterBack: () => this.animateChars(),
	      onLeave: () => this.resetChars(),
	      onLeaveBack: () => this.resetChars()
	    });
	  }

	  animateChars() {
	    gsap
	    .timeline()
		    .fromTo(this.highlightedChars, {
		      scale: 1.3,
		      opacity: 0
		    }, { 
		      stagger: pos => 0.1 + 0.05 * pos,
		      scale: 1,
					duration: 0.4,
		      ease: 'power1',
		      opacity: 1
		    })
		    .fromTo(this.highlightedElement, {
		      '--after-scale': 0
		    }, {
		      duration: 0.8,
		      ease: 'expo',
		      '--after-scale': 1
		    }, 0);
	  }

	  resetChars() {
	    gsap.killTweensOf([this.highlightedChars, this.highlightedElement]);
	    gsap.set(this.highlightedElement, {
	      '--after-scale': 0
	    });
	  }
	}

	onMounted(() => {
		new TextSplitter(highlight.value, {
      splitTypeTypes: 'words, chars'
    });
	});

	watch(() => transitionState.transitionComplete, (transitionComplete) => {
		if (transitionComplete) {
			new HighlightEffect(highlight.value);
		}
	});
</script>
<style>
	.highlight::after {
	  content: '';
	  left: -2.5%;
	  top: 0%;
	  bottom: 0%;
	  position: absolute;
	  z-index: -1;
	  width: 105%;
	  transform: scale3D(var(--after-scale), var(--after-scale), var(--after-scale));
	  background: #6a5ace;
	  border-radius: 8px;
	}
</style>
<template>
	<div class="text-balance">
    <p class="h1">In the midst of the crowd, <mark ref="highlight" style="background: none" class="highlight relative whitespace-nowrap text-neutral-200 inline-flex">individual</mark> judgment is swamped by the
      overwhelming force of the group's influence.</p>
  </div>
</template>
