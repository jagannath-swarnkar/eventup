import { DialogClose, DialogOpen, DrawerClose, DrawerOpen, handleLoader } from "./rxSubject";

export const init = (domain, options) => new window.JitsiMeetExternalAPI(domain, options);

 /**
 * @description method to start full page loader
 */
  export const startLoader = () => {
    return handleLoader.next(true);
  };
  
  
   /**
   * @description method to start full page loader
   */
  export const stopLoader = () => {
    return handleLoader.next(false);
  };
  

  export const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  /**
* @description method to open drawer
* @param params ("drawer_name", {drawer_data}, "opening_position")
*/
export const open_drawer = (...params) => {
    return DrawerOpen.next([...params])
  }
  
/**
 * @description method to close drawer
 * @param params:string - drawer name to close
 */
export const close_drawer = (...params) => {
    return DrawerClose.next([...params]);
}

/**
 * @description method to open dialog
 * @param params ("dialog_name", {dialog_data}, "opening_position")
 */
export const open_dialog = (...params) => {
    return DialogOpen.next([...params])
}

/**
 * @description method to close dialog
 * @param params ("dialog_name")
 */
export const close_dialog = (...params) => {
    return DialogClose.next([...params])
}


export const isMobile = () => {
    let isMobileViewServer = (navigator.userAgent).match(/Android|BlackBerry|iPhone|iPod|Opera Mini|IEMobile|WPDesktop/i);
    return Boolean(isMobileViewServer);
  };