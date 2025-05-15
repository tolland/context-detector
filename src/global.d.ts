// global.d.ts
declare global {
    interface Window {
        browser: typeof browser;
        context: any;
        flags: any;
        __contentApiInstance?: ContentApi;
        __keydownManagerInstance?: KeydownManager;
        __messagingApiInstance?: MessagingApi;
        hasRun: boolean;
    }

    var context: any;
    var decoders: any;
    var flags: any;
    var contentListenerAdded: boolean;
}

declare namespace browser.menus {
    interface _OnShownInfo {
        frameId?: number; // Add missing frameId
    }
}

declare namespace browser.contextMenus {
    interface _OnShownInfo {
        frameId?: number;
    }
}

export {};
