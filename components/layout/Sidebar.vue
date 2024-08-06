<script setup lang="ts">

	const emit = defineEmits(['navItemClicked', 'navItemMouseEnter', 'navItemMouseLeave']);

	const currentTime = ref(null);

	onMounted(() => {
		function updateTime() {
      const now = new Date();
	    currentTime.value = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
	    });
    }
    updateTime();
    setInterval(updateTime, 1000);

		document.querySelectorAll('.nav-item').forEach((navItem) => {
			navItem.addEventListener('mouseenter', () => emit('navItemMouseEnter'));
			navItem.addEventListener('mouseleave', () => emit('navItemMouseLeave'));
		})
	});

	const navigate = (page: string) => {
		emit('navItemClicked', page);
	}
</script>
<template>
	<div class="fixed w-12 h-screen z-fixed top-0 left-0 bg-white grid gap-16 grid-cols-1 grid-rows-3 content-between py-4 border-r border-neutral-300">
		<div class="flex justify-end rotate-180" style="writing-mode: vertical-rl;">
			<p class="flex text-right self-center micro">London &#183; {{ currentTime }}</p>
		</div>
		<div>
			<svg class="w-full h-full rotate-90" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" width="1200" height="600">
				<clipPath id="s">
					<path d="M0,0 v30 h60 v-30 z"/>
				</clipPath>
				<clipPath id="t">
					<path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z"/>
				</clipPath>
				<g clip-path="url(#s)">
					<path d="M0,0 v30 h60 v-30 z" fill="#000000"/>
					<path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" stroke-width="6"/>
					<path d="M0,0 L60,30 M60,0 L0,30" clip-path="url(#t)" stroke="#000000" stroke-width="4"/>
					<path d="M30,0 v30 M0,15 h60" stroke="#fff" stroke-width="10"/>
					<path d="M30,0 v30 M0,15 h60" stroke="#000000" stroke-width="6"/>
				</g>
			</svg>
		</div>
		<div class="flex rotate-180" style="writing-mode: vertical-rl;">
			<ul class="flex space-y-4">
				<li @click="navigate('home-page')" class="self-center nav-item">Home</li>
				<li @click="navigate('projects-page')" class="self-center nav-item">Projects</li>
				<li @click="navigate('about-page')" class="self-center nav-item">About</li>
				<li @click="navigate('contact-page')" class="self-center nav-item">Contact</li>
			</ul>
		</div>
	</div>
</template>
