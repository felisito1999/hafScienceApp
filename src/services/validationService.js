let validationService = {};

validationService.isNullOrWhiteSpace = (string) => {
    return !string || !string.trim()
};

export default validationService;