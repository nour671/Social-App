import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';

export const headersInterceptor: HttpInterceptorFn = (req, next) => {

  // req
  const pLATFORM_ID = inject(PLATFORM_ID)
  if( isPlatformBrowser(pLATFORM_ID)){
    if(localStorage.getItem('socialToken')!== null){
      req = req.clone({
        setHeaders:{ token : localStorage.getItem('socialToken') !}
      })
    }

  }


  return next(req); // res
};
