declare const opaqueSymbol: unique symbol;

type Opaque<T, U = string> = U & { readonly [opaqueSymbol]: T };

export type { Opaque };
