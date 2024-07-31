<!-- ENSURE THAT CONTENT INSIDE THE MARQUEE IS DOUBLED AS THE EFFECT RESETS HALF WAY THROUGH MAKING IT INFINITE -->
<script setup lang="ts">
	import gsap from 'gsap';

	const marquee = ref(null);
	const scrollAmount = 1000;

	onMounted(() => {
		let xTransform = scrollAmount;
		const contentWidth = marquee.value.scrollWidth / 2;
		if (xTransform > contentWidth) {
			xTransform = contentWidth;
		}
		gsap.to(marquee.value, {
      x: -xTransform,
      ease: "none",
      scrollTrigger: {
        trigger: marquee.value,
        scrub: true,
      }
    });
	});
</script>
<template>
	<div class="w-full h-full">
		<div id="w-full h-full">
			<div ref="marquee" class="relative h-full w-fit flex items-center will-change-transform">
				<!-- CONTENT -->
				<span class="heading-base text-[7vw] whitespace-nowrap">One</span>
				<span class="heading-base text-[7vw] whitespace-nowrap">&#183;</span>
				<span class="heading-base text-[7vw] whitespace-nowrap">Two</span>
				<span class="heading-base text-[7vw] whitespace-nowrap">&#183;</span>
				<span class="heading-base text-[7vw] whitespace-nowrap">Three</span>
				<span class="heading-base text-[7vw] whitespace-nowrap">&#183;</span>
				<span class="heading-base text-[7vw] whitespace-nowrap">Four</span>
				<span class="heading-base text-[7vw] whitespace-nowrap">&#183;</span>
				<span class="heading-base text-[7vw] whitespace-nowrap">Five</span>
				<span class="heading-base text-[7vw] whitespace-nowrap">&#183;</span>
				<span class="heading-base text-[7vw] whitespace-nowrap">Six</span>
				<span class="heading-base text-[7vw] whitespace-nowrap">&#183;</span>
				<span class="heading-base text-[7vw] whitespace-nowrap">Seven</span>
				<span class="heading-base text-[7vw] whitespace-nowrap">&#183;</span>
				<span class="heading-base text-[7vw] whitespace-nowrap">Eight</span>
				<span class="heading-base text-[7vw] whitespace-nowrap">&#183;</span>
				<!-- REPEATED -->
				<span class="heading-base text-[7vw] whitespace-nowrap">One</span>
				<span class="heading-base text-[7vw] whitespace-nowrap">&#183;</span>
				<span class="heading-base text-[7vw] whitespace-nowrap">Two</span>
				<span class="heading-base text-[7vw] whitespace-nowrap">&#183;</span>
				<span class="heading-base text-[7vw] whitespace-nowrap">Three</span>
				<span class="heading-base text-[7vw] whitespace-nowrap">&#183;</span>
				<span class="heading-base text-[7vw] whitespace-nowrap">Four</span>
				<span class="heading-base text-[7vw] whitespace-nowrap">&#183;</span>
				<span class="heading-base text-[7vw] whitespace-nowrap">Five</span>
				<span class="heading-base text-[7vw] whitespace-nowrap">&#183;</span>
				<span class="heading-base text-[7vw] whitespace-nowrap">Six</span>
				<span class="heading-base text-[7vw] whitespace-nowrap">&#183;</span>
				<span class="heading-base text-[7vw] whitespace-nowrap">Seven</span>
				<span class="heading-base text-[7vw] whitespace-nowrap">&#183;</span>
				<span class="heading-base text-[7vw] whitespace-nowrap">Eight</span>
				<span class="heading-base text-[7vw] whitespace-nowrap">&#183;</span>
			</div>
		</div>
	</div>
</template>
