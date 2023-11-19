export type PartialUnknown<T> = {
  [K in keyof T]?: unknown;
};
export function isPartialUnknown<T>(
  value: unknown,
): value is PartialUnknown<T> {
  return typeof value === 'object' && value !== null;
}
export function isRecordOf<T>(
  value: unknown,
  predicate: (value: unknown) => value is T,
): value is Record<string, T> {
  return (
    typeof value === 'object' &&
    value !== null &&
    Object.values(value).every(predicate)
  );
}
export function nonNullable<T>(value: T, name = 'value'): NonNullable<T> {
  if (value === null || value === undefined) {
    throw new TypeError(`${name} is ${value}`);
  }
  return value as NonNullable<T>;
}
