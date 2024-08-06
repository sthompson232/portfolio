<script setup lang="ts">
	const testimonials = [
		{
	    body: '<p>[Sam] unscrambled my website needs and redesigned the site to make it visually dynamic and easy to use. The design process was always collaborative and, although [Sam] was behind the technical aspects of the website, I was never left out of the loop in the process. Nothing was ever done without my first green lighting the idea.</p>',
	    website: 'wilkinsonproductions.com',
	    name: 'Andy Wilkinson',
	  },
		{
	    body: '<p>I was delighted with the website created by Sam and can\'t speak highly enough of his friendly, professional manner. He was always happy to take in my ideas and go the extra mile to get everything exactly as I wanted.</p>',
	    website: 'davidchadwick.co.uk',
	    name: 'David Chadwick',
	  },
	  {
	    body: '<p>It was so easy to work with Sam to build a really professional author website which gives me a valuable platform to promote my work. A flexible range of options enabled me to tailor my website to my needs and the ongoing support is excellent.</p>',
	    website: 'rosemarygriggs.co.uk',
	    name: 'Rosemary Griggs',
	  },
		{
	    body: '<p>Sam made the process very easy, with his clear, quick and complete answers. He provided guidance when I needed it, and useful suggestions when I asked for them.</p>',
	    website: 'jeffprobst.co.uk',
	    name: 'Jeff Probst',
	  },
	  {
	    body: '<p>Sam has done a great job and produced a really professional website which meets all of my needs.</p>',
	    website: 'robertkeable.com',
	    name: 'Simon Keable-Elliott',
	  },
	];
</script>
<template>
	<div class="projects-page page-container">
		<div class="inner-page-container">
			<div class="relative w-full h-full row-start-1 row-span-6 col-start-3 col-span-2 place-items-end flex flex-col justify-around">
				<div v-for="testimonial in testimonials" class="text-end">
					<div class="body text-[1.8vh] mb-[0.7vh]" v-html="testimonial.body" />
					<p class="micro mb-1">{{ testimonial.name }} &#183; {{ testimonial.website }}</p>
				</div>
			</div>
			<div class="w-full h-full row-start-1 row-span-3 col-start-1 col-span-2 flex items-center justify-start">
				<div>
					<p class="body mb-[1.5vh]">
						I have designed and developed websites and applications for over 150 (happy) clients. Let's take a look at some of my favourite projects that I have worked on.
					</p>
					<p class="body">
						But before we do that, let me show off a little, by sharing a few testimonials from some of my previous clients.
					</p>
				</div>
			</div>
			<div class="row-start-4 row-span-3 col-start-1 col-span-2 flex flex-col justify-end">
				<div>
					<small class="micro">Time to show off</small>
					<h1 class="heading-base">Selected Projects</h1>
				</div>
			</div>
		</div>
	</div>
</template>
