import config from '@config';

import { getAccessToken, resetAccessToken } from '@/shared/store/auth';

type BodyType = Record<string, unknown>;
type OptionsType = { noAuth?: boolean } & Omit<RequestInit, 'method' | 'body'>;

const API_ENDPOINT = config.API_URL;

const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    if (response.status === 401) {
      resetAccessToken();
    }

    const errorMessage = await response.json();
    throw typeof errorMessage === 'string' ? new Error(errorMessage || '[Error] Unexpected error') : errorMessage;
  }

  return response.json();
};

export const get = async <T>(url: string, { noAuth, ...options }: OptionsType = {}): Promise<T> => {
  const BEARER_TOKEN = getAccessToken();

  const response = await fetch(API_ENDPOINT + url, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      ...(noAuth || !BEARER_TOKEN ? {} : { Authorization: `Bearer ${BEARER_TOKEN}` }),
    },
    ...options,
  });

  return handleResponse<T>(response);
};

export const post = async <T>(url: string, body?: BodyType, { noAuth, ...options }: OptionsType = {}): Promise<T> => {
  const BEARER_TOKEN = getAccessToken();
  const parsedBody = JSON.stringify(body);

  const response = await fetch(API_ENDPOINT + url, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json; charset=UTF-8',
      ...(noAuth || !BEARER_TOKEN ? {} : { Authorization: `Bearer ${BEARER_TOKEN}` }),
    },
    body: parsedBody,
    ...options,
  });

  return handleResponse<T>(response);
};

export const put = async <T>(url: string, body?: BodyType, { noAuth, ...options }: OptionsType = {}): Promise<T> => {
  const BEARER_TOKEN = getAccessToken();
  const parsedBody = JSON.stringify(body);

  const response = await fetch(API_ENDPOINT + url, {
    method: 'PUT',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json; charset=UTF-8',
      ...(noAuth || !BEARER_TOKEN ? {} : { Authorization: `Bearer ${BEARER_TOKEN}` }),
    },
    body: parsedBody,
    ...options,
  });

  return handleResponse<T>(response);
};

export const del = async <T>(url: string, { noAuth, ...options }: OptionsType = {}): Promise<T> => {
  const BEARER_TOKEN = getAccessToken();

  const response = await fetch(API_ENDPOINT + url, {
    method: 'DELETE',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json; charset=UTF-8',
      ...(noAuth || !BEARER_TOKEN ? {} : { Authorization: `Bearer ${BEARER_TOKEN}` }),
    },
    ...options,
  });

  return handleResponse<T>(response);
};

export const patch = async <T>(url: string, body?: BodyType, { noAuth, ...options }: OptionsType = {}): Promise<T> => {
  const BEARER_TOKEN = getAccessToken();
  const parsedBody = JSON.stringify(body);

  const response = await fetch(API_ENDPOINT + url, {
    method: 'PATCH',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json; charset=UTF-8',
      ...(noAuth || !BEARER_TOKEN ? {} : { Authorization: `Bearer ${BEARER_TOKEN}` }),
    },
    body: parsedBody,
    ...options,
  });

  return handleResponse<T>(response);
};
