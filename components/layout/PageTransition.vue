<template>
  <div>
    <!-- FRAME TRANSITION HTML -->
    <div
      id="page-frame-transition-html"
      class="fixed bg-primary h-dvh inset-0 z-transition-html"
      style="clip-path: polygon(
        0% 0%,
        0% 100%,
        0% 100%,
        0% 0%,
        100% 0%,
        100% 100%,
        0% 100%,
        0% 100%,
        100% 100%,
        100% 0%
      );"
    />
    <!-- SWIPE TRANSITION HTML -->
    <div
      id="page-swipe-transition-html"
      class="fixed bg-primary h-dvh inset-0 z-transition-html"
      style="clip-path: inset(100% 0% 0%);"
    />
  </div>
</template>
