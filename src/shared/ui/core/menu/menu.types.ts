export type Item = {
  label: string;
  items?: Item[];
  to?: string;
  target?: string;
  active?: boolean;
  onClick?: () => void;
};
