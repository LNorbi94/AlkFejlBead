'use strict';

const Category = use('App/Model/Category');
const Todo = use('App/Model/Todo');
const Validator = use('Validator');

class TodoController {
    * index (request, response) {
        const categories = yield Category.all();
        for (let category of categories) {
            const topTodos = yield category.todos().limit(5).fetch();
            category.topTodos = topTodos.toJSON();
        }
        yield response.sendView ('main', { categories: categories.toJSON() });
    }

    * create (request, response) {
        const categories = yield Category.all();
        yield response.sendView('createTodo', { categories: categories.toJSON() });
    }

    * doCreate (request, response) {
        const todoData = request.except('_csrf');
        const rules = {
            name: 'required'
            , instructions: 'required'
            , category_id: 'required'
        };
        const validation = yield Validator.validateAll(todoData, rules);

        if (validation.fails()) {
            yield request
                .withAll()
                .andWith({ errors: validation.messages() })
                .flash();
            response.redirect('back');
        } else {
            todoData.user_id = request.currentUser.id;
            yield Todo.create(todoData);
            response.redirect('/');
        }
    }

    * showTodo (request, response) {
        const id = request.param('id');
        const todo = yield Todo.find(id);
        if (todo) {
            yield todo.related('category').load();
            yield response.sendView('showTodo', {
                todos : [ todo.toJSON() ]
                , currentUser : request.currentUser
            });
        } else {
            response.notFound('Nincs ilyen To-Do.');
        }
    }

    * doDelete (request, response) {
        const id = request.param('id');
        const todo = yield Todo.find(id);
        if (todo) {
            if (request.currentUser.id !== todo.user_id) {
                response.unauthorized('Hozzáférés megtagadva.');
            } else {
                yield todo.delete();
                response.redirect('/');
            }
        } else {
            response.notFound('Nincs ilyen To-Do.');
        }
    }

    * edit (request, response) {
        const id = request.param('id');
        const categories = yield Category.all();
        const todo = yield Todo.find(id);
        if (todo) {
            if (request.currentUser.id !== todo.user_id) {
                response.unauthorized('Hozzáférés megtagadva.')
            } else {
                yield response.sendView('editTodo', {
                    todo : todo.toJSON()
                    , categories: categories.toJSON()
                });
            }
        } else {
            response.notFound('Nincs ilyen To-Do.');
        }
    }
    
    * doEdit (request, response) {
        const id = request.param('id');
        const todoData = request.except('_csrf');
        const rules = {
            name: 'required'
            , instructions: 'required'
            , category_id: 'required'
        };
        const validation = yield Validator.validateAll(todoData, rules);

        if (validation.fails()) {
            yield request
                .withAll()
                .andWith({ errors: validation.messages() })
                .flash();
            response.redirect('back');
        } else {
            const todo = yield Todo.find(id);
            todo.name = todoData.name;
            todo.instructions = todoData.instructions;
            todo.category_id = todoData.category_id;

            yield todo.save();
            response.redirect('/');
        }
    }

    * search (request, response) {
        const filters = { todoName: request.input('todoName') };

        if (filters.todoName.length > 0) {
            const todos = yield Todo.query()
            .where(function () {
                if (filters.todoName.length > 0) this.where('name', 'LIKE', `%${filters.todoName}%`)
            });

            for (let todo of todos) {
                const category = yield Category.find(todo.category_id);
                todo.category = category;
            }

            var fromSearch = true;
            yield response.sendView('showTodo', {
                todos
                , fromSearch
            })
        } else {
            yield response.sendView('showTodo', {
                todos: []
                , noFilter: true
            })
        }
  }
}

module.exports = TodoController;
