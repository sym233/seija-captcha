type TagNames = keyof HTMLElementTagNameMap;

interface EventHandle {
  onClick: (ev: MouseEvent) => void;
  // fired when a slide is done
  onChange: (ev: InputEvent) => void;
  // use onInput for realtime scroll input
  onInput: (ev: InputEvent) => void;
}

export function h<K extends TagNames>(
  tag: K,
  props: Partial<
    Exclude<HTMLElementTagNameMap[K], `on${string}`> & EventHandle
  >,
  ...children: (Node | string)[]
): Node {
  const el = document.createElement(tag);
  const { onClick, onInput, onChange, ...htmlProps } = props;
  for (const k in htmlProps) {
    (el as any)[k] = (htmlProps as any)[k];
  }
  onClick && el.addEventListener('click', onClick as any);
  onChange && el.addEventListener('change', onChange as any);
  onInput && el.addEventListener('input', onInput as any);
  for (const child of children) {
    el.append(child);
  }
  return el;
}

export function append(container: Element, el: Node) {
  container.appendChild(el as HTMLElement);
}

export function remove(el: HTMLElement) {
  el.remove();
}
