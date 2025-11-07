const glow = document.querySelector('#glow');

document.addEventListener('mousemove', (e) => {
  const { clientX, clientY } = e;
  glow.style.left = `${clientX}px`;
  glow.style.top = `${clientY}px`;
});
