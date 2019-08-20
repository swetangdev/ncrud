
const constants = {
    common: {
        notFound: 'Sorry nothing found.',
    },
    server: {
        serverListen: 'Listening to ',
    },
    assets: {
        userPhotosDir: './public/images/userphotos/'
    },
    user: {
        createTitle: 'Create a user',
        userOrPasswordRequired: 'Username and password both are required',
        created: 'User created Successfully',
        notFound: 'User not found!!!',
        deleted: 'User deleted',
        updated: 'User updated',
        createErr: 'Error while creating user.',
        fetchError: 'Unable to fetch users!!!',
        filestatus: ' - File uploaded!',
        userPassEmpty: 'Username or password not valid or empty.',
        userNotRegistered: 'Sorry username is not registered!!!',
        passwordIncorrect: 'Password is incorrect',
        alreadyRegistered: 'User already registered with this email, try with another email.',
    },
    token: {
        noToken: 'No token provided',
        authFail: 'Failed to authenticate token.',
    },
    db: {
        connectErr: 'Connection error!!',
        connected: 'Database Connected',
    }
};
module.exports = constants;