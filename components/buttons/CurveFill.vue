<script setup lang="ts">
	import gsap from 'gsap';

	const btn = ref(null);
	const btnText = ref(null);
	const backgroundPath = ref(null);
	const backgroundMaskPath = ref(null);

	const initialCurve = "M 0 100 V 100 Q 50 100 100 100 V 100 z";
	const startCurve = "M 0 100 V 50 Q 50 10 100 50 V 100 z";
	const endCurve = "M 0 100 V 0 Q 50 0 100 0 V 100 z";

	onMounted(() => {
		const entranceTimeline = gsap.timeline({ paused: true })
			.set(backgroundPath.value, { attr: { d: initialCurve } })
			.set(backgroundMaskPath.value, { attr: { d: initialCurve }, display: 'none' })
			.to(backgroundPath.value, {
					attr: {
						d: startCurve,
					},
					duration: 0.3,
					ease: 'power2.in',
				}, 0)
				.to(btnText.value, {
					color: 'white',
					duration: 0.2,
				}, 0.2)
				.to(backgroundPath.value, {
					attr: {
						d: endCurve,
					},
					duration: 0.3,
					ease: 'power2.out',
				}, 0.3);
		
		const exitTimeline = gsap.timeline({paused: true })
			.set(backgroundPath.value, { attr: { d: endCurve } })
			.to(backgroundMaskPath.value, {
				attr: {
					d: startCurve,
				},
				duration: 0.3,
				ease: 'power2.in',
				onStart: () => {
					backgroundMaskPath.value.style.display = 'block';
				},
			}, 0)
			.to(btnText.value, {
					color: 'black',
					duration: 0.2,
				}, 0.2)
			.to(backgroundMaskPath.value, {
				attr: {
					d: endCurve,
				},
				duration: 0.3,
				ease: 'power2.out',
			}, 0.3);
		btn.value.addEventListener('mouseover', () => {
			entranceTimeline.restart();
		});
		btn.value.addEventListener('mouseout', () => {
			exitTimeline.restart();
		});
	});
</script>
<template>
	<div>
		<button ref="btn" class="box-border relative bg-secondary rounded-full px-8 py-2 overflow-hidden">
			<!-- Background SVG -->
			<svg class="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <mask id="backgroundMask">
            <!-- Add white rect to ensure full visibility initially -->
            <rect width="100" height="100" fill="white" />
            <!-- Add black mask to remove visibility with the animation -->
            <path ref="backgroundMaskPath" stroke="#000" fill="#000" stroke-width="2px" dur="10s" vector-effect="non-scaling-stroke" :d="initialCurve" />
          </mask>
        </defs>
        <path mask="url(#backgroundMask)" ref="backgroundPath" stroke="#171717" fill="#171717" stroke-width="2px" dur="10s" vector-effect="non-scaling-stroke" :d="initialCurve" />
        <animateMotion dur="10s" repeatCount="indefinite">
          <mpath xlink:href="#backgroundPath" />
        </animateMotion>
      </svg>
			<span ref="btnText" class="relative text-black font-bold uppercase pointer-events-none">Click me</span>
		</button>
	</div>
</template>
