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
        this.message = error;
    }
}

class NoAliveCharacterInArray extends Error {
    constructor(error) {
        super(error.message);
        this.data = { error };
        this.message = error;
    }
}

class EncounterEndedError extends Error {
    constructor(error) {
        super(error.message);
        this.data = { error };
        this.message = error;
    }
}

module.exports = {
    NoPositionAvailableError,
    WorldGenerationFailedError,
    MissingParameterError,
    NoAliveCharacterInArray
}