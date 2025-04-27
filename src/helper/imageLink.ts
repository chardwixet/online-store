export function imageLink(img: string) {
  return new URL(`../assets/img/${img}`, import.meta.url).href;
}
