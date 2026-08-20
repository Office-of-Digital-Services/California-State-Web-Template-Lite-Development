 // MutationObserver.
    function observeAttributeChange(elements, callback) {
        var MutationObserverImpl = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;

        if (!MutationObserverImpl) {
            return function noop() { };
        }

        var observer = new MutationObserverImpl(function (mutations) {
            mutations.forEach(function (mutation) {
                if (mutation.type === "attributes") {
                    callback(mutation.target, mutation.attributeName);
                }
            });
        });

        elements.forEach(function (element) {
            observer.observe(element, { subtree: false, attributes: true });
        });

        return function disconnect() {
            observer.disconnect();
        };
    }

    // Initializes tab-like behavior for a details/summary group and returns cleanup.
    function setupDetailsTabs(container) {
        if (!container) {
            return function noop() { };
        }

        var detailsItems = Array.from(container.querySelectorAll("details"));
        var summaries = Array.from(container.querySelectorAll("details > summary"));

        detailsItems.forEach(function (item) {
            item.classList.add("details-item");
        });

        summaries.forEach(function (summary) {
            summary.classList.add("details-tab");
        });

        // Keep exactly one panel open: opening one details closes the rest.
        var disconnectObserver = observeAttributeChange(detailsItems, function (target, attributeName) {
            if (attributeName === "open" && target.hasAttribute("open")) {
                detailsItems.forEach(function (item) {
                    if (item !== target) {
                        item.removeAttribute("open");
                    }
                });
            }
        });

        function preventClosingIfAlreadyOpen(event) {
            var details = event.currentTarget.parentElement;
            if (details && details.hasAttribute("open")) {
                event.preventDefault();
            }
        }

        // Tabs should not toggle closed when the currently open summary is activated.
        function onKeyDown(event) {
            if (event.key === " " || event.key === "Enter") {
                preventClosingIfAlreadyOpen(event);
            }
        }

        summaries.forEach(function (summary) {
            summary.addEventListener("keydown", onKeyDown);
            summary.addEventListener("click", preventClosingIfAlreadyOpen);
        });

        // React-like cleanup: remove listeners and disconnect observer on unmount.
        return function cleanup() {
            disconnectObserver();
            summaries.forEach(function (summary) {
                summary.removeEventListener("keydown", onKeyDown);
                summary.removeEventListener("click", preventClosingIfAlreadyOpen);
            });
        };
    }

    // Expose initializer for framework integration (e.g. useEffect).
    window.setupDetailsTabs = setupDetailsTabs;

    var desktopTabsMediaQuery = window.matchMedia("(min-width: 768px)");
    var tabsCleanup = null;

    function ensureDesktopOpenState(container) {
        if (!container) {
            return;
        }

        var detailsItems = Array.from(container.querySelectorAll("details"));
        if (detailsItems.length === 0) {
            return;
        }

        var openItems = detailsItems.filter(function (item) {
            return item.hasAttribute("open");
        });

        // Keep one currently open item if present; otherwise default to the first tab.
        var itemToKeepOpen = openItems[0] || detailsItems[0];
        detailsItems.forEach(function (item) {
            if (item === itemToKeepOpen) {
                item.setAttribute("open", "");
            } else {
                item.removeAttribute("open");
            }
        });
    }

    function toggleResponsiveTabs(event) {
        var isDesktop = event.matches;
        var tabsContainer = document.querySelector(".template-tabs-container");

        if (isDesktop) {
            if (!tabsCleanup) {
                ensureDesktopOpenState(tabsContainer);
                tabsCleanup = setupDetailsTabs(tabsContainer);
            }
            return;
        }

        if (tabsCleanup) {
            tabsCleanup();
            tabsCleanup = null;
        }
    }

    function initializeTabs() {
        toggleResponsiveTabs(desktopTabsMediaQuery);

        if (typeof desktopTabsMediaQuery.addEventListener === "function") {
            desktopTabsMediaQuery.addEventListener("change", toggleResponsiveTabs);
        } else {
            desktopTabsMediaQuery.addListener(toggleResponsiveTabs);
        }
    }

    // Initialize when DOM is ready
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initializeTabs);
    } else {
        initializeTabs();
    }