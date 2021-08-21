export var ComfortNoiseLevel;
(function (ComfortNoiseLevel) {
    /**
     * The default comfort noise level that is based on the device database. The database includes the proper comfort noise levels, individual for all devices.
     */
    ComfortNoiseLevel[ComfortNoiseLevel["DEFAULT"] = 0] = "DEFAULT";
    /**
    * The medium comfort noise level.
    */
    ComfortNoiseLevel[ComfortNoiseLevel["MEDIUM"] = 1] = "MEDIUM";
    /**
    * The low comfort noise level.
    */
    ComfortNoiseLevel[ComfortNoiseLevel["LOW"] = 2] = "LOW";
    /**
    * The disabled comfort noise.
    */
    ComfortNoiseLevel[ComfortNoiseLevel["OFF"] = 3] = "OFF";
})(ComfortNoiseLevel || (ComfortNoiseLevel = {}));
//# sourceMappingURL=ComfortNoiseLevel.js.map