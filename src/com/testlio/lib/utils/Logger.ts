const path = require('path');
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;

// tslint:disable-next-line:only-arrow-functions
const getLabel = function(moduleName) {
    const parts = moduleName.filename.split(path.sep);
    return path.join(parts[parts.length - 2], parts.pop());
};

const myFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${level}] [${label}]: ${message}`;
});

// tslint:disable-next-line:only-arrow-functions
module.exports = function (moduleName) {
    return createLogger({
        format: combine(
            label({ label: getLabel(moduleName) }),
            timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
            myFormat
        ),
        transports: [new transports.Console()]
    });
};