export const getQueryOptions = (isInfinity?: boolean) => {
  return {
    retry: false,
    retryOnMount: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: true,
    ...(isInfinity ? { gcTime: Infinity } : {}),
  };
};
