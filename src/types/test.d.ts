declare module 'node:test' {
  export function describe(name: string, fn: () => void): void;
  export function it(name: string, fn: () => void): void;
}

declare module 'node:assert/strict' {
  const assert: {
    equal: (actual: any, expected: any, message?: string) => void;
    ok: (value: any, message?: string) => void;
    match: (actual: string, regexp: RegExp, message?: string) => void;
  };
  export default assert;
}
