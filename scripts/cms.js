/**
 * 
 * @param template The name of the template the collection belongs to
 * @returns The URL of the API endpoint used to fetch the collection
 */
export const getFormCollectionUrl = (template, api_url, site_code) => {
  let url = `${api_url}/cms/public/collections/${site_code}/${template}/`;
  return url;
}

export const getDefaultBody = (defaultValues) => {
  const body = {};
  for (const field of defaultValues) {
    let defaultValue = field.defaultValue || '';
    if (field.defaultValue === false) {
      defaultValue = field.defaultValue;
    }
    body[field.name] = defaultValue;
  }
  return body;
}

export const getCollectionData = async (collectionName, slug=null) => {
  const { data } = await useFetch('/api/netlio');
  if (data.value.filter(collectionTemplate => collectionTemplate.template === collectionName).length) {
    const collectionTemplate = data.value.find(collectionTemplate => collectionTemplate.template === collectionName);
    if (collectionTemplate.detail) {
      return collectionTemplate.collection.fields;
    }
    if (slug) {
      return collectionTemplate.collections.find(collection => collection.slug === slug).fields;
    }
    return collectionTemplate.collections;
  }
  return null;
}
