<script setup lang="ts">
	const { isLarge, white, isEmpty } = defineProps(['isLarge', 'white', 'isEmpty']);
</script>
<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
		:class="{
      '-mx-[0.1rem] transition-all': true,
      'w-6 h-6': !isLarge,
      'w-10 h-10': isLarge,
      'text-white': white,
      'text-yellow-400': !isEmpty && !white,
      'text-slate-200': isEmpty && !white,
    }"
  >
    <path fill="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
  </svg>
</template>
