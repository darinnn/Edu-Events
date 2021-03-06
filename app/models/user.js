var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var Schema = mongoose.Schema;
var userSchema = Schema({
    name: {
        type: 'String',
        unique: true,
        index: true,
        required: true
    },
    password: {
        type: 'String',
        required: true,
    },
    email: {
        type: 'String',
        required: true,
    },
    school: String,
    schoolAddress: String,
    admin: Boolean
});

// generating a hash
userSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
