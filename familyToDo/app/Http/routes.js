'use strict'

/*
|--------------------------------------------------------------------------
| Router
|--------------------------------------------------------------------------
|
| AdonisJs Router helps you in defining urls and their actions. It supports
| all major HTTP conventions to keep your routes file descriptive and
| clean.
|
| @example
| Route.get('/user', 'UserController.index')
| Route.post('/user', 'UserController.store')
| Route.resource('user', 'UserController')
*/

const Route = use('Route')

Route.get('/', 'FamilyController.index');
Route.get('/index', 'FamilyController.index');
Route.get('/todos/create', 'FamilyController.create');
Route.post('/todos/create', 'FamilyController.doCreate');
Route.get('/category/create', 'FamilyController.createCat');
Route.post('/category/create', 'FamilyController.doCreateCat');
Route.get('/todos/:id', 'FamilyController.showTodo');
Route.get('/todos/cat/:id', 'FamilyController.showCat');
Route.get('/signup', 'FamilyController.signup');
Route.post('/signup', 'FamilyController.doSignup');
/*
Route.get('/todos/:id/edit', 'FamilyController.edit');
Route.post('/todos/:id/edit', 'FamilyController.doEdit');
Route.get('/todos/:id/delete', 'FamilyController.delete');
Route.get('/todos/search', 'FamilyController.search');
Route.post('/todos/search', 'FamilyController.doSearch');
*/