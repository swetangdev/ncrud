
const constants = {
    common: {
        notFound: 'Sorry nothing found.',
        wentWrong: 'Something went wrong.',
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
        filestatus: ' - Profile picture uploaded!',
        fileUploaded: ' - No profile picture uploaded.',
        userPassEmpty: 'Username or password not valid or empty.',
        userNotRegistered: 'Sorry username is not registered!!!',
        userInactive: 'Your account is disabled, please contact administrator.',
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