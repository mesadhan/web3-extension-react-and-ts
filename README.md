## Setup & Developing Locally CLI


## Test Extension locally

Initially, install all the dependencies, run `yarn install`

and, then run `yarn dev` 

- open your `chrome browser`, go to `chrome://extensions`
- enable `Developer mode`
- click `Load unpacked` and select the `dist` folder of this project

**Note:** Live reloading will mostly handle things for you, but if you change the `manifest.js`, env vars, or vite config, you will need to stop and restart `yarn dev`.

(Optional), also some specific errors may require going back to `chrome://extensions` and re-loading the plugin.


## To Run all the test cases,

run `yarn test`

## Building for production

run `yarn build`

- dist - for Chrome manifest-v3
- dist_firefox - for firefox manifest-v2

This will build the repo and zip it up into a zip file in the dist folder that can be uploaded to the chrome app store or shared with others.


Note: Build requirements: `node: v16` and `npm: v8.15.0`

___
Thank You ! developed by `Md. Sadhan Sarker` twitter: `https://twitter.com/eng_sadhan` 


## References & Support:

- https://reactjs.org/
- https://mui.com/
- https://www.digitalocean.com/community/tutorials/how-to-set-up-a-react-project-with-vite







