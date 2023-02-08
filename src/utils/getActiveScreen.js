/**
 * Crawl through navigation state to get route metadata.
 *
 * @param {*} navigationState
 * @returns {*}
 */
export function getActiveRouteMetadata(navigationState) {
    if (!navigationState) {
      return null;
    }
  
    const route = navigationState.routes[navigationState.index];
  
    // Dive into nested navigators as long we haven't reach current screen.
    if (route.routes) {
      return getActiveRouteMetadata(route);
    }
  
    return route;
  }