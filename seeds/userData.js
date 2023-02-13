const {User} = require('../models');

const usersData = [
    {
        id:1,
        name:'mike jones',
        email:'mike@gmail.com',
        password:'password'
    },{
        id:2,
        name:'steve jobs',
        email:'jobs@gmail.com',
        password:'password1!'
    },
];
const seedUsers = () => User.bulkCreate(usersData);
module.exports = seedUsers;