<script setup lang="ts"> 
	const outerDiv = ref(null);

	defineExpose({ outerDiv });

	const props = defineProps(['transform']);
</script>
<template>
	<div
    ref="outerDiv"
    class="fixed inset-0 flex flex-row flex-nowrap will-change-transform"
    :style="`transform: translate3d(${props.transform}px, 0, 0);`"
  >
    <PagesHomePage />
    <PagesCareerPage />
    <PagesAboutPage />
    <PagesProjectsPage />
    <PagesShowcase1Page />
    <PagesShowcase2Page />
    <PagesShowcase3Page />
    <PagesContactPage />
  </div>
</template>
