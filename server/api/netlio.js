export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig();
  const { site_code } = runtimeConfig.public;

  const apiUrl = `https://api.netl.io/cms/public/website/${site_code}/`
  const response = await $fetch(apiUrl);
  return response;
});
