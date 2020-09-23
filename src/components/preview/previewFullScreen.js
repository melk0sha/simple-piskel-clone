export default function fullScreen(preview) {
  const element = preview;

  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else {
    element.requestFullscreen();
  }
}
