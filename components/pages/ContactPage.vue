<script setup lang="ts">
	import { getCollectionData } from '@/scripts/cms';
	// FORM
  const formCollectionName = 'messages';
  const defaultValues = [
    {
      name: 'name',
      type: 'text',
      placeholder: 'Your Name',
      required: true,
      defaultValue: '',
    },
    {
      name: 'email',
      type: 'email',
      placeholder: 'Your Email',
      required: true,
      defaultValue: '',
    },
    {
      name: 'message',
      type: 'textarea',
      placeholder: 'Your Message',
      rows: '4',
      required: true,
      defaultValue: '',
    },
  ];
</script>
<template>
	<div class="contact-page page-container">
		<div class="inner-page-container">
			<div class="w-full h-full row-start-1 row-span-3 col-start-3 col-span-2 flex flex-col justify-end">
				<div>
					<small class="micro">I'm open to work</small>
					<p class="body mb-[1.5vh]">
						You have heard enough about me, now it's time for you to tell me about your cool project!
					</p>
					<p class="body mb-[1.5vh]">
						Use the contact form below if you would like to to collaborate with me, or maybe you just want to say hi!
					</p>
				</div>
			</div>
			<div class="row-start-4 row-span-3 col-start-3 col-span-2">
				<FormsCollectionForm
	        :defaultValues="defaultValues"
	        :collectionName="formCollectionName"
	      />
			</div>
			<div class="row-start-1 row-span-6 col-start-1 col-span-2 flex flex-col justify-end">
				<div>
					<small class="micro">Open to work</small>
					<h1 class="heading-base">Let's</h1>
					<h1 class="heading-base">make</h1>
					<h1 class="heading-base">something</h1>
					<h1 class="heading-base">awesome</h1>
				</div>
			</div>
		</div>
	</div>
</template>
