import { HttpResponse, http } from 'msw';

import { usersListMock } from '../database/users.mock';
import { withDelay } from '../utils/with-delay';

const getUsersMock = async ({ request }) => {
  const url = new URL(request.url);
  let usersList = [...usersListMock];

  const page = Number(url.searchParams.get('page') || 1);
  const limit = Number(url.searchParams.get('limit') || 10);
  const sortBy = url.searchParams.get('sortBy');
  const direction = url.searchParams.get('direction');

  const role = url.searchParams.get('role');
  const name = url.searchParams.get('name');
  const isDeleted = url.searchParams.get('isDeleted') === 'true';

  if (role) {
    usersList = usersList.filter((user) => user.role === role);
  }

  if (name) {
    const lowerCaseName = name.toLowerCase();

    usersList = usersList.filter(
      (user) =>
        user.firstName.toLowerCase().includes(lowerCaseName) || user.lastName.toLowerCase().includes(lowerCaseName)
    );
  }

  if (isDeleted) {
    usersList = usersList.filter((user) => !!user.deletedAt);
  }

  if (sortBy && direction) {
    usersList.sort((a, b) => {
      if (direction === 'asc') return a[sortBy] > b[sortBy] ? 1 : -1;
      else return a[sortBy] < b[sortBy] ? 1 : -1;
    });
  }

  const start = (page - 1) * limit;
  const end = start + limit;
  const paginatedList = usersList.slice(start, end);

  return HttpResponse.json({
    list: paginatedList,
    totalCount: usersList.length,
  });
};

const getUserByIdMock = async ({ params }) => {
  const userId = params.id;
  const user = usersListMock.find((user) => user.id === userId);

  if (!user) {
    return HttpResponse.json({ message: 'User not found', statusCode: 404 }, { status: 404 });
  }

  return HttpResponse.json({ user });
};

const updateUserMock = async ({ request, params }) => {
  const userId = params.id;
  const userIndex = usersListMock.findIndex((user) => user.id === userId);

  if (userIndex === -1) {
    return HttpResponse.json({ message: 'User not found', statusCode: 404 }, { status: 404 });
  }

  return request.json().then((updatedUser) => {
    usersListMock[userIndex] = { ...usersListMock[userIndex], ...updatedUser };
    return HttpResponse.json({ user: usersListMock[userIndex] });
  });
};

const createUserMock = async ({ request }) => {
  const newUser = await request.json();

  if (!newUser.email) {
    return HttpResponse.json({ message: 'Email and password are required', statusCode: 400 }, { status: 400 });
  }

  const existingUser = usersListMock.find((user) => user.email === newUser.email);

  if (existingUser) {
    return HttpResponse.json({ message: 'User already exists', statusCode: 409 }, { status: 409 });
  }

  newUser.id = String(usersListMock.length + 1);
  usersListMock.push(newUser);

  return HttpResponse.json({ user: newUser }, { status: 201 });
};

/**
 * Mock handlers for authentication-related endpoints.
 */
export const usersHandlers = [
  http.get('/users', (e) => withDelay(getUsersMock(e), 2000)),
  http.post('/users', createUserMock),
  http.get('/users/:id', getUserByIdMock),
  http.put('/users/:id', updateUserMock),
];
