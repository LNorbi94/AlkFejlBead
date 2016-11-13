'use strict';

const Category = use('App/Model/Category');
const Validator = use('Validator');

class CategoryController {
    * create (request, response) {
        yield response.sendView('createCategory');
    }

    * doCreate (request, response) {
        const catData = request.except('_csrf');
        const rules = { name: 'required|unique:categories' };
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

    * show (request, response) {
        const id = request.param('id');
        const category = yield Category.find(id);
        if (category) {
            const todos = yield category.todos().fetch();
            yield response.sendView('showTodo', {
                todos : todos.toJSON()
                , category : category.toJSON()
            });
        } else {
            response.notFound('Nincs ilyen kategória.');
        }
    }

    * doDelete (request, response) {
        const id = request.param('id');
        const category = yield Category.find(id);
        if (category) {
            const todos = yield category.todos().fetch();
            for (let todo of todos) {
                yield todo.delete();
            }
            yield category.delete();
            response.redirect('/');
        } else {
            response.notFound('Nincs ilyen kategória.');
        }
    }

    * edit (request, response) {
        const id = request.param('id');
        const category = yield Category.find(id);
        if (category) {
            yield response.sendView('editCategory'
                                    , { category : category.toJSON() });
        } else {
            response.notFound('Nincs ilyen kategória.');
        }
    }
    
    * doEdit (request, response) {
        const id = request.param('id');
        const categoryData = request.except('_csrf');
        const rules = { name: 'required' };
        const validation = yield Validator.validateAll(categoryData, rules);

        if (validation.fails()) {
            yield request
                .withAll()
                .andWith({ errors: validation.messages() })
                .flash();
            response.redirect('back');
        } else {
            const category = yield Category.find(id);
            category.name = categoryData.name;
            yield category.save();
            response.redirect('/');
        }
    }
}

module.exports = CategoryController;
