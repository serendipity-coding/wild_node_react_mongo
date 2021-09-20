const WilderModel = require('../models/Wilder')



// Create and Save a new Wilder
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
        res.status(400).send({ message: "Please enter a valid name" });
        return;
    }
    if (!req.body.city) {
        res.status(400).send({ message: "Please enter a valid city" });
        return;
    }
    // Create a Wilder
    const wilder = new WilderModel({
        name: req.body.name,
        city: req.body.city,
        // skills: [
        //         { title: , votes: 5 },
        //         { title: "drink coffe", votes: 10 }
        //     ]
    });
    // Save wilder in the database
    wilder
        .save()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Tutorial."
            });
        });
};

// Retrieve all Wilders from the database.
exports.findAll = (req, res) => {
    WilderModel.find()
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        });

};

// Find a single Wilder with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    WilderModel.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found wilder with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving wilder with id=" + id });
        });
};

// Update a Wilder by name in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const filter = req.body.name;

    WilderModel.findOneAndUpdate({ name: filter }, { city: req.body.city }, { new: true })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update wilder with name=${filter}.`
                });
            } else res.send({ message: "wilder was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating wilder with name=" + filter
            });
        });

};

// Delete a Wilder with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    WilderModel.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete wilder with id=${id}.`
                });
            } else {
                res.send({
                    message: "wilder was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete wilder with id=" + id
            });
        });
};

// Delete all Wilders from the database.
exports.deleteAll = (req, res) => {
    WilderModel.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} wilders were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all tutorials."
            });
        });

};

//Search wilder 
exports.searchWilder = (req, res) => {
    const filter = req.params.filter
    WilderModel.find(
        { $text: { $search: filter } }
    )
        .then(data => {
            if (data.length === 0)
                res.status(404).send({ message: "Ops Nothing found " });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error searching for " + filter });
        });


}

