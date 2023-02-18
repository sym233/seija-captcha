# Seija Captcha

This is a toy captcha, rotating Kijin Seija to proper angle.

Do **NOT** use for security or production

Example at GH pages: https://sym233.github.io/seija-captcha

### Install
```sh
# via npm
npm i seija-captcha
# or yarn
yarn add seija-cpatcha
```

# usage
```js
import seijaCaptcha from 'seijaCaptcha';
import 'seijaCaptcha/dist/style.css';

// Call the function to create captcha window
const closeWindow = seijaCaptcha(
    /* afterRotateCallback, option */
);

// close the window
closeWindow();
```

The Kijin Seija image is by Zun and the use is unauthorized.
