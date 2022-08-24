const formatError = (message) => {
    return {
        error:
        {
            details: [
                {
                    message: message
                }
            ]
        }

    };
}
module.exports = formatError;