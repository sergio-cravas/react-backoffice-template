import { IconType } from 'react-icons';

export type Option<Value = string> = {
  label: string;
  value: Value;
  icon?: IconType;
};

export type UploadFileObject = {
  base64: string | ArrayBuffer | null;
  name: string;
  file: File;
};
