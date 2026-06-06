export interface PageConfig {
    path: string;
    showHeader: boolean;
    showFooter: boolean;
    showBurst: boolean;
    showSocials: boolean;
}

export const ALL_PAGES: PageConfig[] = [
    { path: "/", showHeader: true, showFooter: true, showBurst: false, showSocials: false },
    { path: "/strawberry", showHeader: false, showFooter: false, showBurst: true, showSocials: true },
    { path: "/strawberry-album", showHeader: false, showFooter: false, showBurst: true, showSocials: true },
    { path: "/strawberry-tour", showHeader: false, showFooter: false, showBurst: true, showSocials: true },
    { path: "/legal-notice", showHeader: true, showFooter: true, showBurst: false, showSocials: true },
    { path: "/privacy-policy", showHeader: true, showFooter: true, showBurst: false, showSocials: true },
    { path: "/contact", showHeader: true, showFooter: true, showBurst: false, showSocials: true },
]