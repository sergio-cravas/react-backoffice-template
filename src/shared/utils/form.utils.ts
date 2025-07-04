export function normalizeString(str: string, trim?: boolean) {
  let result = str;

  if (trim) result = result.trim();

  return result
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

export function toBase64(file): Promise<string | ArrayBuffer | null> {
  return new Promise((resolve, reject) => {
    if (file instanceof Blob) {
      const reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    }
  });
}
