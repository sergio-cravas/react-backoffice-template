export type CompanyEntity<T> = T & {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};

export type List<T> = {
  list: T[];
  totalCount: number;
};

export type InfinityList<T> = {
  list: T[];
  hasMore: boolean;
};

export type HookMutateQueryConfig<Response = any> = {
  onSuccess?: (response?: Response) => void;
  onError?: (error?: Error) => void;
};

export type SortBy = { key: string; direction: 'asc' | 'desc' };
