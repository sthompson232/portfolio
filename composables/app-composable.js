import { reactive } from 'vue';

const appState = reactive({
  targetScrollX: 0,
  currentScrollX: 0,
  contentWidth: 0,
  screenWidth: 0,
  isDragging: false,
  innerContentTranslateX: 0,
  clonedInnerContentTranslateX: 0,
});

export const useAppComposable = () => {
  const setTargetScrollX = (value) => {
    appState.targetScrollX = value;
  }

  const setCurrentScrollX = (value) => {
    appState.currentScrollX = value;
  }

  const setContentWidth = (value) => {
    appState.contentWidth = value;
  }

  const setScreenWidth = (value) => {
    appState.screenWidth = value;
  }

  const setIsDragging = (value) => {
    appState.isDragging = value;
  }

  const setInnerContentTranslateX = (value) => {
    appState.innerContentTranslateX = value;
  }

  const setClonedInnerContentTranslateX = (value) => {
    appState.clonedInnerContentTranslateX = value;
  }

  return {
    appState,
    setTargetScrollX,
    setCurrentScrollX,
    setContentWidth,
    setScreenWidth,
    setIsDragging,
    setInnerContentTranslateX,
    setClonedInnerContentTranslateX,
  };
};
