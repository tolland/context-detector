import { RequestContext } from "./types";

/**
 * Detects the context in which the code is running.
 *
 * - `content`: Running in a content script (web page).
 * - `background`: Running in a background script (extension).
 * - `sidebar`: Running in a sidebar (extension).
 * - `popup`: Running in a popup (extension).
 *
 *
 */
export class ContextDetector {

    static getRequestContext(): RequestContext {
        if (ContextDetector.isContent()) {
            return 'content';
        } else if (ContextDetector.isBackgroundScript()) {
            return 'background';
        } else if (ContextDetector.isSidebar()) {
            return 'sidebar';
        } else if (ContextDetector.isPopup()) {
            return 'popup';
        }

        throw Error('Context could not be detected, defaulting to broadcast');
    }

    static isPopup(): boolean {
        const extUrl = browser.runtime.getURL('');
        return window.location.href.startsWith(extUrl) &&
            window.location.pathname.includes('/popup');
    }


    static isSidebar(): boolean {
        const extUrl = browser.runtime.getURL('');
        return window.location.href.startsWith(extUrl) &&
            window.location.pathname.includes('/sidebar');
    }

    static isNode() {
        return typeof process !== 'undefined' && process.versions && process.versions.node;
    }

    static isContent(): boolean {
        return window.location.protocol === 'http:' || window.location.protocol === 'https:';
    }

    static isBackgroundScript(): boolean {
        // Firefox specific check
        if ((browser as any).extension?.inBackgroundPage === true) {
            return true;
        }

        // URL pattern checks
        if (window?.location?.href) {
            return window.location.href.includes('_generated_background_page.html') ||
                window.location.pathname === '/_generated_background_page.html';
            // ||
            //     // Additional check for older Chrome extension models
            //     (window.location.protocol === 'chrome-extension:' &&
            //         window.location.pathname === '/_generated_background_page.html');
        }

        // Function availability check
        try {
            return typeof browser.runtime.getBackgroundPage === 'function';
        } catch (e) {
            // If we're in a service worker context
            return typeof window === 'undefined';
        }
    }

    private isServiceWorkerBackground() {
        return typeof self !== 'undefined' && typeof window === 'undefined' && typeof browser !== 'undefined';
    }

    private hasBackgroundAPIs() {
        return typeof browser !== 'undefined' && typeof browser.alarms !== 'undefined';
    }

}

