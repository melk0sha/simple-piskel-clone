export default function getCursorPosition(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  return [x, y];
}
