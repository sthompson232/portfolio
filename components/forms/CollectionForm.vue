<script setup lang="ts">
	import { getDefaultBody, getFormCollectionUrl } from '@/scripts/cms';

	const runtimeConfig = useRuntimeConfig();
  const { site_key, site_code, api_url } = runtimeConfig.public;

	interface DefaultValuesType {
		name: string,
		type: string,
		placeholder: string,
		required: boolean,
		defaultValue: string,
	}
  const props = defineProps<{
    defaultValues: DefaultValuesType[],
		collectionName: string,
  }>();
  const { defaultValues, collectionName } = props;

	const apiUrl = getFormCollectionUrl(collectionName, api_url, site_code);

	let body = reactive(getDefaultBody(defaultValues));
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
          .execute(site_key, { action: collectionName })
          .then(token => {
            fetch(apiUrl, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                fields: body,
                honeypot: honeypot.value,
                token,
                site_key: site_key,
              }),
            })
            .then(res => {
              sending.value = false;
              if (res.status === 201) {
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
			<div v-if="defaultValues">
				<div
					v-for="field in defaultValues"
					:key="field.name"
				>
					<div v-if="field.type === 'textarea'">
						<textarea
					    :type="field.type"
					    :name="field.name"
					    :id="field.name"
							@change="event => body[field.name] = event.target.value"
					    class="text-input" 
					    :placeholder="field.placeholder"
					    :required="field.required"
					  />
					</div>
					<div v-if="field.type === 'stars'">
						<FormsStarRating
							:defaultValue="field.defaultValue"
							@onClick="rating => body[field.name] = rating"
						/>
					</div>
					<div v-if="['email', 'text', 'number'].includes(field.type)">
						<input
					    :type="field.type"
					    :name="field.name"
					    :id="field.name"
							@change="event => body[field.name] = event.target.value"
					    class="text-input" 
					    :placeholder="field.placeholder"
					    :required="field.required"
					  />
					</div>
				</div>
			</div>
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
