'use strict';

const User = use('App/Model/User');
const Validator = use('Validator');
const Hash = use('Hash');

class UserController {
    * signup (request, response) {
        yield response.sendView('signup');
    }

    * doSignup (request, response) {
        const userData = request.except('_csrf');
        const rules = {
            username: 'required|unique:users|alpha_numeric'
            , password: 'required|min:3'
            , password_confirm: 'required|same:password'
            , email: 'required|unique:users|email'
        };
        const validation = yield Validator.validateAll(userData, rules);

        if (validation.fails()) {
            yield request
                .withAll()
                .andWith({ errors: validation.messages() })
                .flash();
            response.redirect('back');
        } else {
            const user      = new User();
            user.username   = userData.username;
            user.password   = yield Hash.make(userData.password);
            user.email      = userData.email;

            yield user.save();
            yield request.auth.login(user);
            response.redirect('/');
        }
    }

    * login (request, response) {
        yield response.sendView('login');
    }

    * doLogin (request, response) {
        const email     = request.input('email');
        const password  = request.input('password');

        try {
            const login = yield request.auth.attempt(email, password);
            if (login) {
                response.redirect('/')
            }
        } catch (err) {
            yield request
                .withAll()
                .andWith({ errors: [err] })
                .flash();
            response.redirect('back');
        }
    }

    * logout (request, response) {
        yield request.auth.logout();
        response.redirect('/');
    }

    * profile (request, response) {
        const id = request.currentUser.id;
        const user = yield User.find(id);
        yield response.sendView('profile', { user });
    }

    * editProfile (request, response) {
        const userData = request.except('_csrf');
        const rules = {
            username: 'required|unique:users|alpha_numeric'
            , password: 'required|min:3'
            , password_confirm: 'required|same:password'
        };
        const validation = yield Validator.validateAll(userData, rules);

        if (validation.fails()) {
            yield request
                .withAll()
                .andWith({ errors: validation.messages() })
                .flash();
            response.redirect('back');
        } else {
            const user      = yield User.find(request.currentUser.id);
            user.username   = userData.username;
            user.password   = yield Hash.make(userData.password);

            yield user.save();
            response.redirect('/');
        }
    }

    * doDelete (request, response) {
        const id = request.currentUser.id;
        const user = yield User.find(id);
        if (user) {
            var todos = yield user.todos().fetch();
            for (let todo of todos) {
                yield todo.delete();
            }
            yield user.delete();
            response.redirect('/');
        } else {
            response.notFound('Nincs ilyen felhasználó.');
        }
    }
}

module.exports = UserController;
