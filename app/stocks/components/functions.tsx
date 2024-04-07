export const createRange = (
  start: number,
  end: number,
  step: number = 1
): number[] =>
  Array.from(
    { length: Math.ceil((end - start) / step) },
    (_, index) => start + index * step
  );
