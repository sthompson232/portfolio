<script setup lang="ts">
	import type { RuntimeConfig } from '@nuxt/schema';
	import pageTransition from '@/scripts/transitions/TransitionAPI';

	const route = useRoute();
	const { loadPage } = useLoaderComposable();
	const { transitionState } = useTransitionComposable();
	const runtimeConfig: RuntimeConfig = useRuntimeConfig();
	const { url } = runtimeConfig.public;

	useHead({
	  title: 'Privacy Policy'
	});

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
  <div class="page-container">
		<div class="body mx-auto">
			<h1>Privacy Policy</h1>

			<p>This Privacy Policy document contains types of information that is collected and recorded by {{ url }} and how we use it.</p>

			<p>If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us.</p>

			<h2>General Data Protection Regulation (GDPR)</h2>
			<p>We are a Data Controller of your information.</p>

			<p>{{ url }} legal basis for collecting and using the personal information described in this Privacy Policy depends on the Personal Information we collect and the specific context in which we collect the information:</p>
			<ul>
					<li>{{ url }} needs to perform a contract with you</li>
					<li>You have given {{ url }} permission to do so</li>
					<li>Processing your personal information is in {{ url }} legitimate interests</li>
					<li>{{ url }} needs to comply with the law</li>
			</ul>
				
			<p>{{ url }} will retain your personal information only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use your information to the extent necessary to comply with our legal obligations, resolve disputes, and enforce our policies.</p>

			<p>If you are a resident of the European Economic Area (EEA), you have certain data protection rights. If you wish to be informed what Personal Information we hold about you and if you want it to be removed from our systems, please contact us.</p>
			<p>In certain circumstances, you have the following data protection rights:</p>
			<ul>
				<li>The right to access, update or to delete the information we have on you.</li>
				<li>The right of rectification.</li> 
				<li>The right to object.</li>
				<li>The right of restriction.</li>
				<li>The right to data portability</li>
				<li>The right to withdraw consent</li>
			</ul>

			<h2>Log Files</h2>

			<p>{{ url }} follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services&apos; analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users&apos; movement on the website, and gathering demographic information.</p>

			<h2>Cookies and Web Beacons</h2>

			<p>Like any other website, {{ url }} uses &apos;cookies&apos;. These cookies are used to store information including visitors&apos; preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users&apos; experience by customizing our web page content based on visitors&apos; browser type and/or other information.</p>

			<p>For more general information on cookies, please read <a href="https://www.generateprivacypolicy.com/#cookies">&quot;Cookies&quot; article</a>.</p>

			<h2>Privacy Policies</h2>

			<p>You may consult this list to find the Privacy Policy for each of the advertising partners of {{ url }}.</p>

			<p>Third-party ad servers or ad networks uses technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on {{ url }}, which are sent directly to users&apos; browser. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit.</p>

			<p>Note that {{ url }} has no access to or control over these cookies that are used by third-party advertisers.</p>

			<h2>Third Party Privacy Policies</h2>

			<p>{{ url }}&apos;s Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options. </p>

			<p>You can choose to disable cookies through your individual browser options. To know more detailed information about cookie management with specific web browsers, it can be found at the browsers&apos; respective websites.</p>

			<h2>Children&apos;s Information</h2>

			<p>Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity.</p>

			<p>{{ url }} does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records.</p>

			<h2>Online Privacy Policy Only</h2>

			<p>Our Privacy Policy applies only to our online activities and is valid for visitors to our website with regards to the information that they shared and/or collect in {{ url }}. This policy is not applicable to any information collected offline or via channels other than this website.</p>

			<h2>Consent</h2>

			<p>By using our website, you hereby consent to our Privacy Policy and agree to its terms.</p>

			<h2>How we use Cookies</h2>

			<p>A cookie is a small text file that a website saves on your computer or mobile device when you visit the site. It enables the website to remember your actions and preferences (such as login, language, font size and other display preferences) over a period of time, so you don&apos;t have to keep re-entering them whenever you come back to the site or browse from one page to another.</p>

			<p>You can disable any cookies already stored on your computer, but these may stop our website from functioning properly.</p>

			<p>Our website uses cookies, and we shall ask you to consent to their use when you first visit the website. A number of our pages use cookies to remember:</p>

			<p>your display preferences, such as contrast colour settings or font size
			if you have already replied to a survey pop-up that asks you if the content was helpful or not (so you won&apos;t be asked again)
			if you have agreed (or not) to our use of cookies on this site</p>
			<p>Also, some videos embedded in our pages use a cookie to anonymously gather statistics on how you got there and what videos you visited.</p>

			<p>Enabling these cookies is not strictly necessary for the website to work but it will provide you with a better browsing experience. You can delete or block these cookies, but if you do that some features of this site may not work as intended.</p>

			<p>The cookie-related information is not used to identify you personally and the pattern data is fully under our control. These cookies are not used for any purpose other than those described here.</p>

			<p>The following are not Strictly Necessary, but are required to provide you with the best user experience and also to tell us which pages you find most interesting (anonymously).</p>

			<h2>Functional Cookies</h2>
			<p>This website may:</p>
			<ul>
				<li>Track the pages you visits via Google Analytics</li>
			</ul>

			<h2>Targeting Cookies</h2>
			<p>This website will not:</p>
			<ul>
				<li>Share any personal information with third parties.</li>
				<li>Host any advertising from third-party advertisers, nor ever share any customer information with third parties.</li>
			</ul>

			<h2>How to control cookies</h2>

			<p>You can control and/or delete cookies as you wish – for details, see <a class="text-dark-blue hover:text-mid-blue decoration-light-blue hover:decoration-dark-green underline decoration-2" href="https://www.aboutcookies.org">aboutcookies.org</a>. You can delete all cookies that are already on your computer and you can set most browsers to prevent them from being placed. If you do this, however, you may have to manually adjust some preferences every time you visit a site and some services and functionalities may not work.</p>
		</div>
  </div>
</template>
