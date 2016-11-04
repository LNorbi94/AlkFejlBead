'use strict'

const Lucid = use('Lucid')

class Category extends Lucid {
    todos () {
        return this.hasMany('App/Model/Todo');
    }
}

module.exports = Category
