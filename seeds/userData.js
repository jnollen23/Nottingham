const {Users} = require('../models');

const usersData = [
    {
        userID:1
    },{
        userID:2
    },{
        userID:3
    },{
        userID:4
    },{
        userID:5
    },{
        userID:6
    },{
        userID:7
    },
];
const seedUsers = () => Users.bulkCreate(usersData);
module.exports = seedUsers;