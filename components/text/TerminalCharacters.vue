<!-- https://tympanus.net/codrops/2024/06/19/hover-animations-for-terminal-like-typography/ -->
<script setup lang="ts">
	import TextAnimator from '@/scripts/gsap/TextAnimator';

	const text = ref(null);

	onMounted(() => {
		// Use mouseenter event to trigger on hover
    const animator = new TextAnimator(text.value);
    animator.animate();
	});
</script>
<style>
	.hover-effect .word {
	  white-space: nowrap;
	}

	.hover-effect .char {
	  position: relative
	}

	.hover-effect-cursor .char {
	  --opa: 0;
	}

	.hover-effect-cursor .char::after {
		content: '';
		width: 1ch;
		top: 0;
		left: 0;
		position: absolute;
		opacity: var(--opa);
	}

	.hover-effect-cursor .char::after {
	  background: currentColor;
	  height: 100%;
	}
</style>
<template>
	<div>
		<p
			ref="text"
			class="hover-effect hover-effect-cursor relative font-mono uppercase tracking-wide text-clamp-xl"
			style="font-kerning: none;"
		>
			This is the hover enter animation This is the hover enter animation This is the hover enter animationThis is the hover enter animation This is the hover enter animation This is the hover enter animation This is the hover enter animation
		</p>
	</div>
</template>
