'use strict';

const Route = use('Route');

Route.get('/', 'TodoController.index');
Route.get('/index', 'TodoController.index');
Route.post('/search', 'TodoController.search');

Route.get('/todos/create', 'TodoController.create').middleware('auth');
Route.post('/todos/create', 'TodoController.doCreate').middleware('auth');
Route.get('/todos/:id', 'TodoController.showTodo');
Route.get('/todos/:id/edit', 'TodoController.edit').middleware('auth');
Route.post('/todos/:id/edit', 'TodoController.doEdit').middleware('auth');
Route.get('/todos/:id/delete', 'TodoController.doDelete').middleware('auth');

Route.get('/categories/create', 'CategoryController.create').middleware('auth');
Route.post('/categories/create', 'CategoryController.doCreate').middleware('auth');
Route.get('/categories/:id', 'CategoryController.show');
Route.get('/categories/:id/delete', 'CategoryController.doDelete').middleware('auth');
Route.get('/categories/:id/edit', 'CategoryController.edit').middleware('auth');
Route.post('/categories/:id/edit', 'CategoryController.doEdit').middleware('auth');

Route.get('/signup', 'UserController.signup');
Route.post('/signup', 'UserController.doSignup');
Route.get('/login', 'UserController.login');
Route.post('/login', 'UserController.doLogin');
Route.get('/logout', 'UserController.logout');
Route.get('/profile', 'UserController.profile');
Route.post('/profile', 'UserController.editProfile');
Route.get('/profile/delete', 'UserController.doDelete');