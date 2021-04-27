// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production          : false
  , gateway           : "https://delivery-services.herokuapp.com"
  , securityResource  : "/UserDelivery"
  , deliveryResource  : "/Delivery"
  , avatarResource    : "/AvatarCatalog"
  , typeFailResource  : "/TypeFailCatalog"
  , senderId          : "633420006453"
  , onesignalAppId    : "42f1b696-d432-4509-9b5c-90a3ecaa7c88" 
};


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
