import { useCallback, useEffect, useState } from 'react';

import { remote, ProgressBarOptions } from 'electron';

interface IWindowControls {
  setProgressBar(progress: number, options: ProgressBarOptions): void;
  setTitle(title: string): void;
  isVisibleNativeFrame: boolean;
  toggleMaximize(): void;
  isMaximized: boolean;
  isMinimized: boolean;
  isFocused: boolean;
  minimize(): void;
  title: string;
  close(): void;
}
export const useWindowControls = (): IWindowControls => {
  const window = useCallback(() => remote.getCurrentWindow(), []);

  const [isMaximized, setIsMaximized] = useState(window().isMaximized());
  useEffect(() => {
    window().on('unmaximize', () => setIsMaximized(window().isMaximized()));
    window().on('maximize', () => setIsMaximized(window().isMaximized()));
    window().on('restore', () => setIsMaximized(window().isMaximized()));

    return () => {
      window().removeListener('unmaximize', () => setIsMaximized(window().isMaximized()));
      window().removeListener('maximize', () => setIsMaximized(window().isMaximized()));
      window().removeListener('restore', () => setIsMaximized(window().isMaximized()));
    };
  }, [window]);

  const [isFocused, setIsFocused] = useState(window().isFocused());
  useEffect(() => {
    window().on('focus', () => setIsFocused(window().isFocused()));
    window().on('blur', () => setIsFocused(window().isFocused()));

    return () => {
      window().removeListener('focus', () => setIsFocused(window().isFocused()));
      window().removeListener('blur', () => setIsFocused(window().isFocused()));
    };
  }, [window]);

  const [isMinimized, setIsMinimized] = useState(window().isMinimized());
  useEffect(() => {
    window().on('minimize', () => setIsMinimized(window().isMinimized()));
    window().on('restore', () => setIsMinimized(window().isMinimized()));

    return () => {
      window().removeListener('minimize', () => setIsMinimized(window().isMinimized()));
      window().removeListener('restore', () => setIsMinimized(window().isMinimized()));
    };
  }, [window]);

  const toggleMaximize = useCallback(() => {
    if (window().isMaximized()) {
      window().unmaximize();
    } else {
      window().maximize();
    }
  }, [window]);

  const close = useCallback(() => {
    window().close();
  }, [window]);

  const minimize = useCallback(() => {
    window().minimize();
  }, [window]);

  const setProgressBar = useCallback((progress: number, options: ProgressBarOptions) => {
    if (progress >= 0 || progress <= 1) {
      window().setProgressBar(progress, options);
    } else {
      window().setProgressBar(0);
    }
  }, [window]);

  const setTitle = useCallback((title: string) => {
    window().setTitle(title);
  }, [window]);

  return {
    title: window().getTitle() || window().title || 'Generator',
    isVisibleNativeFrame: false,
    isMaximized: !!isMaximized,
    isMinimized: !!isMinimized,
    isFocused: !!isFocused,
    setProgressBar,
    toggleMaximize,
    setTitle,
    minimize,
    close
  };
};
