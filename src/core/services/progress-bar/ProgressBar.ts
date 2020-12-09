import { remote, ProgressBarOptions } from 'electron';

export const setProgressBar = (progress: number, options: ProgressBarOptions): void => {
  progress = progress / 100;

  if (progress >= 0 || progress <= 1) {
    remote.getCurrentWindow().setProgressBar(progress, options);
  } else {
    remote.getCurrentWindow().setProgressBar(0);
  }
};
