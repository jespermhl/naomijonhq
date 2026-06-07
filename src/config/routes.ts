export interface PageConfig {
    showHeader: boolean;
    showFooter: boolean;
    showBurst: boolean;
    showSocials: boolean;
    showWebsite: boolean;
}

const DEFAULT_CONFIG: PageConfig = {
    showHeader: false,
    showFooter: true,
    showBurst: false,
    showSocials: true,
    showWebsite: true
}

const PAGE_CONFIGS: Record<string, PageConfig> = {
    "/": { ...DEFAULT_CONFIG, showHeader: true, showSocials: false, showWebsite: false },
    "/strawberry": { ...DEFAULT_CONFIG, showBurst: true, showSocials: true },
    "/strawberry-album": { ...DEFAULT_CONFIG, showBurst: true, showSocials: true },
    "/strawberry-tour": { ...DEFAULT_CONFIG, showBurst: true, showSocials: true },
    "/legal-notice": { ...DEFAULT_CONFIG, showHeader: true },
    "/privacy-policy": { ...DEFAULT_CONFIG, showHeader: true },
    "/contact": { ...DEFAULT_CONFIG, showHeader: true, showWebsite: false }
}

export const getPageConfig = (pathname: string): PageConfig => {
    if (PAGE_CONFIGS[pathname]) return PAGE_CONFIGS[pathname]

    return DEFAULT_CONFIG
}