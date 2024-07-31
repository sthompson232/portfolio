<script setup lang="ts">
	import type { RuntimeConfig } from '@nuxt/schema';

	const runtimeConfig: RuntimeConfig = useRuntimeConfig();
	const { title, pages } = runtimeConfig.public;
</script>

<template>
	<header id="navbar" class="fixed z-fixed top-0 left-0 w-full transition-all duration-500 h-32 flex items-center">
	  <div class="layout-container w-full py-6">
	    <div class="relative flex justify-between gap-4">

	      <!-- TITLE -->
	      <div class="flex items-center justify-center lg:justify-start">
	        <div class="px-4">
	          <NuxtLink
	            class="nav-item group transition duration-300"
	            to="/"
	          >
	            <h2 class="navbar-title">{{ title }}</h2>
	            <span class="underline-hover" />
	          </NuxtLink>
	        </div>
	      </div>

	      <!-- NAV LINKS -->
	      <div class='flex flex-1 justify-end'>
	        <nav>
	          <div class="relative">
	            <ul role="list">
								<li v-for="page in pages" :key="page.href" class="flex">
						      <NuxtLink class="nav-item desktop-navitem group transition duration-300" :to="page.href">
						        <span>{{ page.name }}</span>
						        <span class="underline-hover"></span>
						      </NuxtLink>
						    </li>
	            </ul>
	          </div>
	        </nav>
	      </div> 

	    </div>
	  </div>
	</header>
</template>
