<script setup lang="ts">
	import gsap from 'gsap';

	const btn = ref(null);
	const btnText = ref(null);
	const btnTransition = ref(null);

	onMounted(() => {
		const transitionTimeline = gsap.timeline({ paused: true })
			.to(btnTransition.value, {
				clipPath: 'inset(0% 0% 0%)',
				ease: 'power2.out',
				duration: 0.4,
			}, 0)
			.to(btnText.value, {
				color: 'white',
				ease: 'power2.inOut',
				duration: 0.1,
			}, 0.15)
		btn.value.addEventListener('mouseover', () => {
			transitionTimeline.play();
		});
		btn.value.addEventListener('mouseout', () => {
			transitionTimeline.reverse();
		});
	});

</script>
<template>
	<div>
		<button ref="btn" class="box-border relative bg-secondary rounded-full px-8 py-2 text-white overflow-hidden">
			<div
				ref="btnTransition"
	      class="absolute bg-primary inset-0"
	      style="clip-path: inset(100% 0% 0%);"
  		/>
			<span ref="btnText" class="relative text-black font-bold uppercase">Click me</span>
		</button>
	</div>
</template>
