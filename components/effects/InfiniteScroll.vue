<!-- CHANGE LENIS INFINITE SETTING TO TRUE -->
<script setup lang="ts">
	import gsap from 'gsap';
	import ScrollTrigger from 'gsap/ScrollTrigger';

	const images = [
		{
			src: '/images/dev/1.jpg',
			alt: 'Caption 1',
		},
		{
			src: '/images/dev/2.jpg',
			alt: 'Caption 2',
		},
		{
			src: '/images/dev/3.jpg',
			alt: 'Caption 3',
		},
		{
			src: '/images/dev/4.jpg',
			alt: 'Caption 4',
		},
		{
			src: '/images/dev/5.jpg',
			alt: 'Caption 5',
		},
		{
			src: '/images/dev/6.jpg',
			alt: 'Caption 6',
		},
		{
			src: '/images/dev/7.jpg',
			alt: 'Caption 7',
		},
		{
			src: '/images/dev/8.jpg',
			alt: 'Caption 8',
		},
		{
			src: '/images/dev/9.jpg',
			alt: 'Caption 9',
		},
	]

	const repeatItems = (parentEl, total = 0) => {
    const items = [...parentEl.children];
    for (let i = 0; i <= total-1; ++i) {
      const cln = items[i].cloneNode(true);
      parentEl.appendChild(cln);
    }
	};

	onMounted(() => {
		repeatItems(document.querySelector('.grid'), 1);

		// const refresh = () => {
    //   ScrollTrigger.clearScrollMemory();
    //   window.history.scrollRestoration = 'manual';
    //   ScrollTrigger.refresh(true);
    // }

    // refresh();
    // window.addEventListener('resize', refresh);
	});
</script>
<style>
.grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 5vh;
}

.grid__item {
    height: 47.5vh; 
    /* For an item height of 50vh we need to consider the grid gap and remove half of it from the item height. 
    Like that we guarantee that the looping content starts seamlessly. If the gap would be 2vh, our item height would be 49vh */
    background-size: cover;
    background-position: 50% 20%;
}

.grid__item:nth-child(3n-2) {
	border-radius: 0 2rem 2rem 0;
}

.grid__item:nth-child(3n) {
	border-radius: 2rem 0 0 2rem;
}

.grid__item:nth-child(3n-1) {
	border-radius: 2rem;
}

@media screen and (min-width: 53em) {
    .frame {
        height: 100vh;
        align-items: space-between;
    }
}
</style>
<template>
	<main>
		<div class="grid">
			<div v-for="image in images" class="grid__item" :style="`background-image:url(${image.src});`"></div>
		</div>
	</main>
</template>
