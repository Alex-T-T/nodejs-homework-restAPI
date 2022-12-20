const isValidId = require('./isValidId');
const { addContactValidation, putContactValidation,
    updateContactFavouriteValidation, userRegisterValidation,
    userLoginValidation, updateContactSubscriptionValidation} = require('./validationMiddlewares');
const auth = require('./auth');

module.exports = {
    isValidId,
    addContactValidation,
    putContactValidation,
    updateContactFavouriteValidation,
    userRegisterValidation,
    userLoginValidation,
    auth,
    updateContactSubscriptionValidation
}