type ExtractArrayType<T extends unknown[]> = T extends (infer U)[] ? U : never
