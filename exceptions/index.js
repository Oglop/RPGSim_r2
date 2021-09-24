class NoPositionAvailableError extends Error {
    constructor(error) {
        super(error.message);
        this.data = { error };
    }
}

class WorldGenerationFailedError extends Error {
    constructor(error) {
        super(error.message);
        this.data = { error };
    }
}

class MissingParameterError extends Error {
    constructor(error) {
        super(error.message);
        this.data = { error };
    }
}

module.exports = {
    NoPositionAvailableError,
    WorldGenerationFailedError,
    MissingParameterError
}