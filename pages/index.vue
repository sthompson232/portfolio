<script setup lang="ts">
	import pageTransition from '@/scripts/transitions/TransitionAPI';

	const route = useRoute();
	const { loadPage } = useLoaderComposable();
	const { transitionState } = useTransitionComposable();

	definePageMeta({
    pageTransition,
  });
	
	onMounted(() => {
		loadPage(route.name);
	});

	watch(() => transitionState.transitionComplete, (transitionComplete) => {
		if (transitionComplete) {
			
		}
	});
</script>
<template>
	<div>
		
	</div>
</template>
