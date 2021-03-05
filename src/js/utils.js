String.prototype.hashCode = function () {
  let hash = 0; let i; let
    chr;

  if (this.length === 0) {
    return hash;
  }

  for (i = 0; i < this.length; i++) {
    chr = this.charCodeAt(i);
    hash = ((hash << 5) - hash) + chr;
    hash |= 0;
  }

  return hash;
};

export function clearSlashes(path) {
  return path.toString().replace(/\/$/, '').replace(/^\//, '');
}

export function loading(state = false) {
  const preloader = document.querySelector('.preloader');

  if (!preloader) {
    return;
  }

  state ? preloader.classList.remove('loaded') : preloader.classList.add('loaded');
}
