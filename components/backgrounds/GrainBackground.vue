<!-- TO BE ADDED TO app.vue -->
<style>
  body::before {
    filter: url(#grainy);
    content: "";
    position: fixed;
    pointer-events: none;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 15%;
    z-index: -1;
  }
</style>
<!-- GRAIN EFFECT -->
<template>
	<svg class="pointer-events-none absolute"><filter id="grainy"><feTurbulence type="turbulence" baseFrequency="0.5"></feTurbulence><feColorMatrix type="saturate" values="0"></feColorMatrix></filter></svg>
</template>
