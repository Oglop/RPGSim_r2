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