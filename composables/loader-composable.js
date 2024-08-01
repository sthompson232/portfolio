import { reactive } from 'vue';
import * as THREE from 'three';
import imagesLoaded from 'imagesloaded';
import FontFaceObserver from 'fontfaceobserver';

const loadingState = reactive({
  loadedPages: [],
  fonts: ['freight-big-pro'],
  webglAssets: ['images/dev/1.jpg'],
  fontProgress: 0,
  imageProgress: 0,
  webglProgress: 0,
  totalProgress: 0,
  loadingComplete: false,
});

export const useLoaderComposable = () => {

  const toggleLoadingComplete = (value) => {
    loadingState.loadingComplete = value;
  };
  const updateLoadingProgress = (value) => {
    loadingState.totalProgress = value;
  }

  const pageHasLoaded = (name) => {
    return loadingState.loadedPages.includes(name);
  }

  const resetLoader = (name) => {
    if (!pageHasLoaded(name)) {
      loadingState.fontProgress = 0;
      loadingState.webglProgress = 0;
      loadingState.imageProgress = 0;
      loadingState.totalProgress = 0;
      loadingState.loadingComplete = false;
    }
  }

  const loadPage = (name) => {
    if (!pageHasLoaded(name)) {
      loadingState.loadedPages.push(name);
      loadFonts();
      loadWebGPU();
      loadImages();
    }
  }

  const loadFonts = () => {
    Promise.all(loadingState.fonts.map(loadFont)).then(() => {
      loadingState.fontProgress = 1;
      calculateProgress();
    });
  }

  const loadFont = (font) => new Promise((resolve, reject) => {
    new FontFaceObserver(font).load().then(() => {
      loadingState.fontProgress += (1 / loadingState.fonts.length);
      calculateProgress();
      resolve(font);
    }).catch((error) => {
      loadingState.fontProgress += (1 / loadingState.fonts.length);
      calculateProgress();
      reject(error);
    });
  });
  
  const loadWebGPU = () => {
    const webgpuLoadingManager = new THREE.LoadingManager(onWebGPULoadDone, onWebGPULoadProgress);
    const webgpuLoader = new THREE.TextureLoader(webgpuLoadingManager);
    loadingState.webglAssets.forEach((webglAsset) => {
      webgpuLoader.load(webglAsset);
    });
  }

  const onWebGPULoadProgress = (itemUrl, itemsLoaded, itemsTotal) => {
    loadingState.webglProgress = itemsLoaded / itemsTotal;
    calculateProgress();
  }

  const onWebGPULoadDone = () => {
    loadingState.webglProgress = 1;
    calculateProgress();
  }

  const loadImages = () => new Promise((resolve) => {
    const imgLoad = imagesLoaded(document.querySelectorAll('img'), {background: true}, resolve);

    imgLoad.on('done', (instance) => {
      loadingState.imageProgress = 1;
      calculateProgress();
    });
    imgLoad.on('progress', (instance, image) => {
      loadingState.imageProgress = instance.progressedCount / instance.images.length;
      calculateProgress();
    });
  });

  const calculateProgress = () => {
    const totalProgress = loadingState.imageProgress + loadingState.fontProgress + loadingState.webglProgress;
    loadingState.totalProgress = Math.ceil(((totalProgress) / 3) * 100);
    updateLoadingProgress(loadingState.totalProgress);
    if (loadingState.totalProgress === 100) {
      toggleLoadingComplete(true);
    }
  }

  return {
    loadingState,
    toggleLoadingComplete,
    updateLoadingProgress,
    loadPage,
    resetLoader,
  };
};
