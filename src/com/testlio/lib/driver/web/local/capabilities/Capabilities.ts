interface Capabilities {
    acceptInsecureCerts?: boolean,
    browserName?: string,
    browserVersion?: string,
    connectionRetryCount?: number,
    connectionRetryTimeout?: number,
    logLevel?: string,
    outputDir?: string,
    platformName?: string,
    strictSSL?: boolean
}

export default Capabilities;
