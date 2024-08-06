<script setup lang="ts">
  const runtimeConfig = useRuntimeConfig();
  const { api_url, site_code, site_key } = runtimeConfig.public;

	const name = ref('');
	const email = ref('');
	const message = ref('');
	let showAlert = ref(false);
	let submitButtonLabel = ref('Send');
	let submitSuccessful = ref(null);
	let sending = ref(false);
	let honeypot = ref(false);

	const submitCollection = () => {
    const form = document.getElementById('collection-form') as HTMLFormElement;
    if (form.checkValidity() && !sending.value) {
      sending.value = true;
			submitButtonLabel.value = 'Sending';
      window.grecaptcha.ready(_ => {
        window.grecaptcha
          .execute(site_key, { action: 'contact' })
          .then(token => {
						const body = JSON.stringify({
              subject: `Troubador website notification - ${name.value}`,
              message: `
								The following message was submitted on your website contact form: "${message.value}" - To respond to this message, please reply to ${name.value} on ${email.value}
							`,
              url: site_code,
              honeypot: honeypot.value,
              token,
              site_key,
            });
						const sendEmailEndpoint = `${api_url}/api/send-email`;
            fetch(sendEmailEndpoint, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body,
            })
            .then(res => {
              sending.value = false;
              if (res.status === 200) {
                submitButtonLabel.value = 'Sent';
								submitSuccessful.value = true;
                form.reset();
              } else {
                submitButtonLabel.value = 'Send';
								submitSuccessful.value = false;
                showAlert.value = true;
                setTimeout(() => {
                  showAlert.value = false;
                }, 5000);
              }
            });
          });
      });
    } else {
      form.reportValidity();
    }
  };
</script>
<template>
	<div id="contact">
		<form id="collection-form">
			<input
				v-model="name"
		    type="name"
		    id="name"
		    class="text-input" 
		    placeholder="Your name"
		    required
		  />
			<input
				v-model="email"
		    type="email"
		    id="email"
		    class="text-input" 
		    placeholder="Your email"
		    required
		  />
			<textarea
				v-model="message"
		    type="message"
		    id="message"
		    class="text-input" 
		    placeholder="Your message"
		    required
		  />
      <div class="hidden">
        <input
					name='mobile'
					type="checkbox"
					value="1"
					@change="honeypot = true"
        	tabIndex="-1"
					autoComplete="false"
				/>
				<input type='submit' value='Subscribe' />
      </div>
      <div>
        <button
					@click.prevent="submitCollection"
          type="submit"
					class="btn"
          :value="submitButtonLabel"
          :disabled="sending || submitSuccessful"
        >
					{{ submitButtonLabel }}
				</button>
      </div>
    </form>
		<div v-if="showAlert">
			<p class="small-body font-semibold text-red-500">Error - please try again later</p>
		</div>
	</div>
</template>
