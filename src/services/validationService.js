let validationService = {};

validationService.isNullOrWhiteSpace = (string) => {
    return string === null || string.match(/^\s*$/) !== null
};

export default validationService;