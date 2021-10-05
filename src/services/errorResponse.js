let errorResponseService = {};

class ErrorResponse {
    constructor(status, message) {
        this.status = status;
        this.message = message; 
    }
}
errorResponseService.getErrorResponse = (errorResponse) => {
    const message = 'No se pudo realizar la peticion'
    return new ErrorResponse(errorResponse.status, message)
}

export default errorResponseService;