import { useCallback, useState } from 'react';

import { remote } from 'electron';
import os from 'os';

interface IWindowControls {
  toggleMaximize(): void;
  isMaximized: boolean;
  minimize(): void;
  close(): void;
}
export const useWindowControls = (): IWindowControls => {
  const window = remote.getCurrentWindow();

  const [isMaximized, setIsMaximized] = useState(window.isFullScreen());
  window.on('unmaximize', () => setIsMaximized(false));
  window.on('maximize', () => setIsMaximized(true));

  const toggleMaximize = useCallback(() => {
    const isMacSystem = os.platform() === 'darwin';
    if (isMacSystem) {
      return window.setFullScreen(!window.isFullScreen());
    }

    const { width: currentWidth, height: currentHeight } = window.getBounds();

    const {
      width: maxWidth,
      height: maxHeight
    } = remote.screen.getPrimaryDisplay().workAreaSize;

    const isMaximized = currentWidth === maxWidth && currentHeight === maxHeight;

    if (!isMaximized) {
      window.maximize();
    } else {
      window.unmaximize();
    }
  }, [window]);

  const close = useCallback(() => {
    const window = remote.getCurrentWindow();
    window.close();
  }, []);

  const minimize = useCallback(() => {
    const window = remote.getCurrentWindow();
    window.minimize();
  }, []);

  return {
    toggleMaximize,
    isMaximized,
    minimize,
    close
  };
};
