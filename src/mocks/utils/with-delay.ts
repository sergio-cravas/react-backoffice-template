/**
 * Wraps a promise to introduce an artificial delay before resolving or rejecting.
 * @param promise - The promise to wrap.
 * @param ms - The delay in milliseconds.
 * @returns A new promise that resolves or rejects after the specified delay.
 */
export function withDelay<T>(promise: Promise<T>, ms: number): Promise<T> {
  return new Promise((resolve, reject) => {
    promise
      .then((result) => setTimeout(() => resolve(result), ms))
      .catch((error) => setTimeout(() => reject(error), ms));
  });
}
