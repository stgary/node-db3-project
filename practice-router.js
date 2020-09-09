const express = require('express');
const Schemes = require('./practice-model.js');
const router = express.Router();

router.get('/', (req, res) => {
    Schemes.find()
        .then(scheme => {
            res.status(200).json(scheme);
        })
        .catch(error => {
            res.status(404).json({
                error: 'Failed to get Schemes'
            })
        });
});

router.get('/id', (req, res) => {
    const { id } = req.params;
    Schemes.findById(id)
        .then(scheme => {
            if(scheme) {
                res.json(scheme);
            } else {
                res.status(404).json({ 
                    error: 'Could not find scheme with given id' 
                });
            }
        })
        .catch(error => {
            res.status(500).json({
                error: 'There was an error while retrieving the scheme'
            });
        });

});

router.get('/id/steps', (req, res) => {
    const { id } = req.params;
    Schemes.findSteps(id)
        .then(steps => {
            if(steps.length) {
                res.json(steps)
            } else {
                res.status(404).json({
                    error: 'Could not find step with given id'
                })
            }
        })
        .catch(error => {
            res.status(500).json({
                error: 'There was an error while retrieving the step'
            });
        });
});

router.post('/', (req, res) => {
    const schemeData = req.body;
    Schemes.add(schemeData)
        .then(scheme => {
            res.status(201).json(scheme)
        })
        .catch(error => {
            res.status(500).json({
                error: 'There was an error while inserting the scheme'
            });
        });
});

router.post('/id/steps', (req, res) => {
    const stepsData = req.body;
    const { id } = req.params;
    Schemes.findById(id)
        .then(scheme => {
            if(scheme) {
            Schemes.addStep(stepData, id)
                .then(step => {
                    res.status(201).json(step)
                })
            } else {
                res.status(404).json({
                    error: 'Scheme not found'
                })
            }
        })
        .catch(error => {
            res.status(500).json({
                error: error.message
            })
        });
});

router.put('/id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    Schemes.findById(id)
        .then(scheme => {
            if(scheme) {
                Schemes.update(changes, id)
                    .then(updatedScheme => {
                        res.json(updatedScheme);
                    })
            } else {
                res.status(404).json({
                    error: 'Could not find scheme with the given id'
                })
            }
        })
        .catch(error => {
            res.status(500).json({
                error: error.message
            });
        });
});

router.delete('/id', (req, res) => {
    const { id } = req.params;

    Schemes.remove(id)
        .then(deleted => {
            if(deleted) {
                res.json({ removed: deleted })
            } else {
                res.status(404).json({
                    error: 'Could not find the scheme with the given id'
                })
            }
        })
        .catch(error => {
            res.status(500).json({
                error: error.message
            });
        });
});

module.exports = router;