const {
    getAllContactsController,
    getContactController,
    postContactController,
    deleteContactController,
    putContactController,
    updateContactFavouriteController,
    } = require('./contactsController')
    
const {
    registerController,
    loginController,
    currentUserController,
    logoutUserController,
    updateUserSubscriptionController,
    updateUserAvatarController,
} = require('./authController');

module.exports = {
    getAllContactsController,
    getContactController,
    postContactController,
    deleteContactController,
    putContactController,
    updateContactFavouriteController,
    registerController,
    loginController,
    currentUserController,
    logoutUserController,
    updateUserSubscriptionController,
    updateUserAvatarController
}