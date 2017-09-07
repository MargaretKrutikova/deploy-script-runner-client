
module.exports.GetGenericErrorMessage = function(error) {
        if (!error) return "";

        let errorResponse = error.response;
        if (errorResponse.data && errorResponse.data.detail) {
            return errorResponse.data.detail;
        }
        let status = errorResponse.status, errorMessage;
        switch (status) {
            case 401:
                errorMessage = "You are unauthorized, please login!";
                break;
            case 404:
                errorMessage = "Not found."
                break;
            case 400:
                errorMessage = "User input invalid.";
                break;
            default:
                errorMessage = "Something went wrong.";
        }

        return errorMessage;
    }
    module.exports.GetLoginError = function(error) {
        let status = error.response.status, validationErrors = [];
        let errorMessage = "Something went wrong.";
        if (status === 401) { // unathorized
            errorMessage = "Username or password are incorrect.";
        }

        if (status === 400) { // bad request, assume failed validation
            validationErrors = error.response.data ? error.response.data.errors : []; 
            errorMessage = "Validation errors.";
        }

        return { message: errorMessage, validationErrors : validationErrors }
    }

//export default new ApiErrorHandler();