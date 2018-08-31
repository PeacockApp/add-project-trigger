var mongoose = require('mongoose')
var encodedPass = 'YourPassword'
var connectionString = 'mongodb://peacockapdb:' + encodedPass + '@peacockapdb.documents.azure.com:10255/?ssl=true'

module.exports = function (context, req) {
    mongoose.connect(connectionString).then(function(){
        var Project = mongoose.model('Project', {
            name: String
        })

        new Project(req.body.name).save().then(function(newProject) {
            context.res = {
                body: newProject,
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            context.done();
        })
    })
};