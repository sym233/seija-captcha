type TagNames = keyof HTMLElementTagNameMap;
interface EventHandle {
    onClick: (ev: MouseEvent) => void;
    onChange: (ev: InputEvent) => void;
    onInput: (ev: InputEvent) => void;
}
export declare function h<K extends TagNames>(tag: K, props: Partial<Exclude<HTMLElementTagNameMap[K], `on${string}`> & EventHandle>, ...children: (Node | string)[]): Node;
export declare function append(container: Element, el: Node): void;
export declare function remove(el: HTMLElement): void;
export {};
