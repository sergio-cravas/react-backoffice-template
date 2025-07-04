import { HttpResponse, http } from 'msw';

import { userMock } from '../database/users.mock';

const getAuthMeMock = () => {
  return HttpResponse.json({ user: userMock });
};

const postSignUpMock = async ({ request }) => {
  const { firstName, lastName, email, password } = await request.clone().json();

  if (!firstName || !lastName || !email || !password) {
    return HttpResponse.json({ message: 'All fields are required', statusCode: 400 }, { status: 400 });
  }

  return HttpResponse.json({
    user: userMock,
    accessToken: 'mockAccessToken123',
  });
};

const postSignInMock = async ({ request }) => {
  const { email, password } = await request.clone().json();

  if (!email || !password) {
    return HttpResponse.json({ message: 'Email and password are required', statusCode: 400 }, { status: 400 });
  }

  if (email !== 'test@test.com') {
    return HttpResponse.json({ message: 'Invalid email or password', statusCode: 401 }, { status: 401 });
  }

  return HttpResponse.json({
    user: userMock,
    accessToken: 'mockAccessToken123',
  });
};

const postResetPasswordMock = async ({ request }) => {
  const { email } = await request.clone().json();

  if (!email) {
    return HttpResponse.json({ message: 'Email and password are required', statusCode: 400 }, { status: 400 });
  }

  return HttpResponse.json({
    success: true,
  });
};

const postSetNewPasswordMock = async ({ request }) => {
  const { token, password } = await request.clone().json();

  if (!token || !password) {
    return HttpResponse.json({ message: 'Token and Password are required', statusCode: 400 }, { status: 400 });
  }

  return HttpResponse.json({
    success: true,
  });
};

const putUpdateUserMock = async ({ request }) => {
  const { firstName, lastName } = await request.clone().json();

  if (firstName) userMock.firstName = firstName;
  if (lastName) userMock.lastName = lastName;

  return HttpResponse.json({
    user: userMock,
  });
};

/**
 * Mock handlers for authentication-related endpoints.
 */
export const authHandlers = [
  http.get('/auth/me', getAuthMeMock),
  http.put('/auth/me', putUpdateUserMock),
  http.post('/auth/sign-in', postSignInMock),
  http.post('/auth/sign-up', postSignUpMock),
  http.post('/auth/reset-password', postResetPasswordMock),
  http.post('/auth/set-new-password', postSetNewPasswordMock),
];
