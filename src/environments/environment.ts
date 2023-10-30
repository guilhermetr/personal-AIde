// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyD_u_thQhFoi_WjcCSeKchJE5tIJ1bPh-A",
    authDomain: "personal-aide.firebaseapp.com",
    projectId: "personal-aide",
    storageBucket: "personal-aide.appspot.com",
    messagingSenderId: "625673028062",
    appId: "1:625673028062:web:40a97612e5411a3d639d4f",
    measurementId: "G-N8B02D34PW"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

export const HUGGING_FACE_API_TOKEN = "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";
export const HUGGING_FACE_API_URL = 'https://api-inference.huggingface.co/models';
