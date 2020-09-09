const db = require('../data/dbConfig.js');

module.exports = {
    find,
    findById,
    findSteps,
    add,
    update,
    remove
}

function find() {
    return db('schemes');
}

function findById(id) {
    return db('schemes').where({ id }).first();
}

function findSteps(id) {
    return db('steps').where({ id });
}

function add(scheme) {
    return (
        db('schemes')
            .insert(scheme)
            .returning(id)
            .then(ids => {
                const id = id[0];
                return findById(id);
            })
    );
}

function addStep(stepData, scheme_id) {
    const steps = {
        ...steps,
        scheme_id: scheme_id
    }
    return (
        db('steps')
            .insert(stepData)
            .then(() => {
                return findSteps(scheme_id)
            })
    );
}

function update(changes, id) {
    return (
        db('schemes')
            .where({ id })
            .update(changes)
            .then(() => {
                return findById(id)
            })
    );
}

function remove(id) {
    return db('schemes').where({ id }).del();
}