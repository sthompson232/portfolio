<script setup lang="ts">
  const emit = defineEmits(['onClick']);
	const { defaultValue } = defineProps(['defaultValue']);

  const rating = ref(defaultValue);
  const hover = ref(0);

  const handleClick = (i) => {
    emit('onClick', i);
    rating.value = i;
  };
</script>
<template>
  <div>
    <div>
      <button
        v-for="i in 5"
        :key="i"
        type="button"
        @click="handleClick(i)"
        @mouseenter="hover = i"
        @mouseleave="hover = rating"
      >
        <FormsStarIcon :isEmpty="!(i <= (hover || rating))" :isLarge="true" />
      </button>
    </div>
  </div>
</template>
