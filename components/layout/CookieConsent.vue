<script setup lang="ts">
	import gsap from 'gsap';
	import { getCookie, setCookie } from '@/scripts/utils';

	const banner = ref(null);
	const acceptButton = ref(null);
	const declineButton = ref(null);

	onMounted(() => {

		function checkCookieConsent() {
			if (getCookie('cookie-consent')) {
				banner.value.style.display = 'none';
			} else {
				banner.value.style.display = 'block';
			}
		}

		acceptButton.value.addEventListener('click', () => {
			gsap.to(banner.value, {
				opacity: 0,
				duration: 0.6,
				onComplete: () => {
					setCookie('cookie-consent', 'true', 365);
					checkCookieConsent();
				}
			});
		});
		declineButton.value.addEventListener('click', () => {
			gsap.to(banner.value, {
				opacity: 0,
				duration: 0.6,
				onComplete: () => {
					setCookie('cookie-consent', 'false', 365);
					checkCookieConsent();
				}
			});
		});

		checkCookieConsent();
	});

</script>
<template>
	<div ref="banner" style="display: none;" class="absolute right-0 bottom-0 w-auto p-4">
		<div class="bg-primary rounded-lg border border-secondary/50 shadow p-4 w-full sm:max-w-md">
			<div class="body prose-p:mt-0 text-white">
				<p>
					This website uses cookies to ensure you get the best experience. Would you like to enable cookies on this site?
				</p>
			</div>
			<div class="grid grid-cols-2 gap-4">
				<div>
					<button ref="acceptButton" class="btn w-full">Accept cookies</button>
				</div>
				<div>
					<button ref="declineButton" class="btn w-full">Reject cookies</button>
				</div>
			</div>
		</div>
	</div>
</template>
