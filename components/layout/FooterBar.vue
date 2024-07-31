<script setup lang="ts">
	import type { RuntimeConfig } from '@nuxt/schema';

	const runtimeConfig: RuntimeConfig = useRuntimeConfig();
	const { title, pages, socials } = runtimeConfig.public;

	let year = new Date().getFullYear();
	onMounted(() => {
    year = new Date().getFullYear();
  });
</script>

<template>
	<footer class="relative w-full">
	  <div class="layout-container py-6 sm:py-12">
	    <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
	      <div>
	        <h6 class="text-xs footer-text mb-2">Pages</h6>
	        <ul>
            <li v-for="page in pages" :key="page.href" class="footer-text">
              <NuxtLink :to="page.href">
                {{ page.name }}    
              </NuxtLink>
            </li>
	        </ul>
	      </div>
	      <div>
	        <h6 class="text-xs footer-text mb-2">Get in touch</h6>
	        <p class="footer-text">
	          <a class="hover:text-accent" href="mailto:contact@netl.io">contact@netl.io</a>
	        </p>
	      </div>
	      <div>
	        <h6 class="text-xs footer-text mb-2">Connect with us</h6>
	        <ul>
            <li v-if="socials.facebook" class="footer-text">
              <a class="flex items-center hover:text-accent" :href="socials.facebook">
                <span>Facebook</span>
                <SvgExternalLink className="h-4 w-4" />
              </a>
            </li>
            <li v-if="socials.instagram" class="footer-text">
              <a class="flex items-center hover:text-accent" :href="socials.instagram">
                <span>Instagram</span>
                <SvgExternalLink className="h-4 w-4" />
              </a>
            </li>
            <li v-if="socials.twitter" class="footer-text">
              <a class="flex items-center hover:text-accent" :href="socials.twitter">
                <span>TWITTER/X</span>
                <SvgExternalLink className="h-4 w-4" />
              </a>
            </li>
            <li v-if="socials.linkedin" class="footer-text">
              <a class="flex items-center hover:text-accent" :href="socials.linkedin">
                <span>LinkedIn</span>
                <SvgExternalLink className="h-4 w-4" />
              </a>
            </li>
            <li v-if="socials.youtube" class="footer-text">
              <a class="flex items-center hover:text-accent" :href="socials.youtube">
                <span>YouTube</span>
                <SvgExternalLink className="h-4 w-4" />
              </a>
            </li>
						<li v-if="socials.tiktok" class="footer-text">
              <a class="flex items-center hover:text-accent" :href="socials.tiktok">
                <span>TikTok</span>
                <SvgExternalLink className="h-4 w-4" />
              </a>
            </li>
						<li v-if="socials.threads" class="footer-text">
              <a class="flex items-center hover:text-accent" :href="socials.threads">
                <span>Threads</span>
                <SvgExternalLink className="h-4 w-4" />
              </a>
            </li>
						<li v-if="socials.pinterest" class="footer-text">
              <a class="flex items-center hover:text-accent" :href="socials.pinterest">
                <span>Pinterest</span>
                <SvgExternalLink className="h-4 w-4" />
              </a>
            </li>
						<li v-if="socials.website" class="footer-text">
              <a class="flex items-center hover:text-accent" :href="socials.website">
                <span>Website</span>
                <SvgExternalLink className="h-4 w-4" />
              </a>
            </li>
	        </ul>
	      </div>
	    </div>
	    <div class="grid grid-cols-2 gap-6 mt-6">
	      <div class="place-self-start">
	        <p class="footer-text text-xs">
	          <span class="block xs:inline">&copy; Copyright {{ title }} {{ year }} <span class="hidden xs:inline">|</span></span>
	          <span class="block xs:inline">
	            <a class="hover:text-accent" href="https://netl.io/">
	              Powered by Netlio
	            </a>
	          </span>
	        </p>
	      </div>
	      <div class="place-self-end">
	        <p class="footer-text text-xs">
	          <NuxtLink class="hover:text-accent" href="/privacy-policy">Privacy Policy</NuxtLink>
	        </p>
	      </div>
	    </div>
	  </div>
	</footer>
</template>
