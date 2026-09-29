/**
 * BEM 类名生成器（与 @vue-ui/shared 完全一致的框架无关实现）。
 *
 * 约定：
 *   block（块）    -> `rpc-button`
 *   element（元素） -> `rpc-button__icon`
 *   modifier（修饰）-> `rpc-button--primary`
 */
export function createNamespace(name: string) {
  const b = (): string => name
  const e = (element?: string): string => (element ? `${name}__${element}` : name)
  const m = (modifier?: string): string => (modifier ? `${name}--${modifier}` : name)
  const em = (element?: string, modifier?: string): string =>
    element ? `${name}__${element}${modifier ? `--${modifier}` : ''}` : name
  const is = (suffix: string, state?: boolean | string): string =>
    state ? `${name}--${suffix}` : ''

  return { b, e, m, em, is }
}

export type UseNamespaceReturn = ReturnType<typeof createNamespace>