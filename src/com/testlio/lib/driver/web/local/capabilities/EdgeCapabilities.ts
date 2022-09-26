import Capabilities from './Capabilities';

interface EdgeCapabilities extends Capabilities {
    'moz:ms:edgeOptions'?: {
        args?: string[],
        binary?: string,
        debuggerAddress?: string
    }
}

export default EdgeCapabilities;
