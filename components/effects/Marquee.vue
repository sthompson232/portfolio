<!-- ENSURE THAT CONTENT INSIDE THE MARQUEE IS DOUBLED AS THE EFFECT RESETS HALF WAY THROUGH MAKING IT INFINITE -->
<style>
	@keyframes marquee {
		100% {
			transform: translate3d(-50%, 0, 0);
		}
	}

	#marquee {
		animation: marquee 15s linear infinite;
	}
</style>
<template>
	<div class="w-full h-full">
		<div id="w-full h-full">
			<div id="marquee" class="relative h-full w-fit flex items-center will-change-transform">
				<!-- CONTENT -->
				<span class="heading-base text-[7vw] whitespace-nowrap mr-8">One</span>
				<span class="heading-base text-[7vw] whitespace-nowrap mr-8">Two</span>
				<span class="heading-base text-[7vw] whitespace-nowrap mr-8">Three</span>
				<span class="heading-base text-[7vw] whitespace-nowrap mr-8">Four</span>
				<span class="heading-base text-[7vw] whitespace-nowrap mr-8">Five</span>
				<span class="heading-base text-[7vw] whitespace-nowrap mr-8">Six</span>
				<span class="heading-base text-[7vw] whitespace-nowrap mr-8">Seven</span>
				<span class="heading-base text-[7vw] whitespace-nowrap mr-8">Eight</span>
				<!-- REPEATED -->
				<span class="heading-base text-[7vw] whitespace-nowrap mr-8">One</span>
				<span class="heading-base text-[7vw] whitespace-nowrap mr-8">Two</span>
				<span class="heading-base text-[7vw] whitespace-nowrap mr-8">Three</span>
				<span class="heading-base text-[7vw] whitespace-nowrap mr-8">Four</span>
				<span class="heading-base text-[7vw] whitespace-nowrap mr-8">Five</span>
				<span class="heading-base text-[7vw] whitespace-nowrap mr-8">Six</span>
				<span class="heading-base text-[7vw] whitespace-nowrap mr-8">Seven</span>
				<span class="heading-base text-[7vw] whitespace-nowrap mr-8">Eight</span>
			</div>
		</div>
	</div>
</template>
