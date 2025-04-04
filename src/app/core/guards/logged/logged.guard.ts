import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const loggedGuard: CanActivateFn = (route, state) => {

  const router =  inject(Router);
  const pLATFORM_ID = inject(PLATFORM_ID);

  if (isPlatformBrowser(pLATFORM_ID)){
    if (localStorage.getItem('socialToken') !== null){
      // router.navigate(['./timeline'])
      return true;
    } else {

      return true;
    }

  }else {
    return false;
  }
};
