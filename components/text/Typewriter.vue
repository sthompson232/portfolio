<script setup lang="ts">
  import gsap, { SteppedEase } from 'gsap';

	const speed = 0.2;
	const text = 'Typewriter effect';

	const container = ref(null);
	const cursor = ref(null);

  onMounted(() => {
	  text.split('').forEach((letter, index) => {
	    const span = document.createElement('span');
	    span.textContent = letter;
	    
	    gsap.timeline().to(span, {
	      duration: 0.1,
	      onComplete: () => {
	        container.value.insertBefore(span, cursor.value);
	      },
	    }, index * speed);
			
	  });

	  gsap.to(cursor.value, {
	    opacity: 0,
	    duration: 1,
	    repeat: -1,
	    ease: SteppedEase.config(1),
	  });
	})
</script>
<template>
	<p ref="container" class="relative h2 inline">
    <div ref="cursor" class="absolute right-1 bottom-2 text-clamp-4xl">|</div>
    <span class="invisible">|</span>
  </p>
</template>
