<!-- TO BE USED AS AN IMAGE COMPONENT -->
<script setup>
	import gsap from 'gsap';
	
	const { src, alt, className } = defineProps(['src', 'alt', 'className']);
	const imgContainer = ref(null);
	const parallaxImg = ref(null);
	const hiddenImg = ref(null);

	const overflow = 200;

	onMounted(() => {
		// GET ASPECT RATIO
		hiddenImg.onload = () => {
			imgContainer.value.style.aspectRatio = `${hiddenImg.value.image.naturalWidth} / ${hiddenImg.value.image.naturalHeight}`;
		}

		parallaxImg.value.style.height = `calc(100% + (${overflow}px))`;
		parallaxImg.value.style.top = `-${overflow}px`;
    gsap.to(parallaxImg.value, {
	    y: `${overflow}px`,
	    ease: "none",
	    scrollTrigger: {
	      trigger: hiddenImg.value,
	      scrub: true,
				start: 'top bottom',
				end: 'bottom top',
	    }
	  });
	});
</script>
<template>
	<div :class="className" ref="imgContainer" class="relative will-change-transform overflow-hidden">
		<img ref="hiddenImg" :src="src" :alt="alt" class="invisible" />
		<div
			ref="parallaxImg"
			class="absolute w-full bg-cover bg-center will-change-transform"
			:style="{'background-image': `url(${src})`}"
		/>
	</div>
</template>
