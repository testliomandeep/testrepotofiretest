import Capabilities from './Capabilities';

interface FirefoxCapabilities extends Capabilities {
    'moz:firefoxOptions'?: {
        args?: string[],
        'moz:debuggerAddress'?: string,
    }
}

export default FirefoxCapabilities;
