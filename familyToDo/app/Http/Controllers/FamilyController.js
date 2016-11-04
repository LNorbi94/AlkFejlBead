'use strict';

const Database = use('Database');
const Category = use('App/Model/Category');
const Todo = use('App/Model/Todo');
const User = use('App/Model/User');
const Validator = use('Validator');

class FamilyController {
    * index (request, response) {
        const categories = yield Category.all();
        for (let category of categories) {
            const topTodos = yield category.todos().limit(5).fetch();
            category.topTodos = topTodos.toJSON();
        }
        yield response.sendView ('main', {
            categories: categories.toJSON()
        })
    }

    * createCat (request, response) {
        yield response.sendView('createCategory');
    }

    * doCreateCat (request, response) {
        const catData = request.except('_csrf');
        const rules = {
            name: 'required'
        };
        const validation = yield Validator.validateAll(catData, rules);

        if (validation.fails()) {
            yield request
                .withAll()
                .andWith({ errors: validation.messages() })
                .flash();

            response.redirect('back');
        } else {
            yield Category.create(catData);
            response.redirect('/');
        }
    }

    * create (request, response) {
        const categories = yield Category.all();
        yield response.sendView('createTodo', {
            categories: categories.toJSON()
        });
    }

    * doCreate (request, response) {
        const todoData = request.except('_csrf');
        const rules = {
            name: 'required'
            , instructions: 'required'
        };
        const validation = yield Validator.validateAll(todoData, rules);

        if (validation.fails()) {
            yield request
                .withAll()
                .andWith({ errors: validation.messages() })
                .flash();

            response.redirect('back');
        } else {
            yield Todo.create(todoData);
            response.redirect('/');
        }
    }

    * showTodo (request, response) {
        const id = request.param('id');
        const todo = yield Todo.find(id);
        if (todo) {
            yield todo.related('category').load();
            var todos = [
                todo.toJSON()
            ];
            yield response.sendView('showTodo', {
                todos
            });
        } else {
            response.notFound('Nincs ilyen To-Do.');
        }
    }

    * showCat (request, response) {
        const id = request.param('id');
        const categories = yield Category.find(id);
        var todos = yield categories.todos().fetch();
        if (todos) {
            for (let todo of todos) {
                todos.category = categories;
            }
            yield response.sendView('showTodo', {
                todos : todos.toJSON()
            });
        } else {
            response.notFound('Nincs ilyen To-Do.');
        }
    }

    * signup (request, response) {
        yield response.sendView('signup');
    }

    * doSignup (request, response) {
        const signupData = request.except('_csrf');
        const rules = {
            username: 'required|unique:users'
            , password: 'required'
            , email: 'required|email'
        };
        const validation = yield Validator.validateAll(signupData, rules);

        if (validation.fails()) {
            yield request
                .withAll()
                .andWith({ errors: validation.messages() })
                .flash();

            response.redirect('back');
        } else {
            yield User.create(signupData);
            response.redirect('/');
        }
    }
}

module.exports = FamilyController;
