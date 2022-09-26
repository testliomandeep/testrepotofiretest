import Capabilities from './Capabilities';

interface ChromeCapabilities extends Capabilities {
    'goog:chromeOptions'?: {
        args?: string[],
        binary?: string,
        debuggerAddress?: string
    }
}

export default ChromeCapabilities;
