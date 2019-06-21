export function configurePath(path) {
  return path.replace(new RegExp('/', 'g'), '+')
}
