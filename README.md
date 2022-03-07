# Friday Code Challenge: Car Selector App

The project lets users select a vehicle by brand and model to then select a specific car from a table. 
The result shows in modal window.

To make it easier for the user to find the specific vehicle, the user interface allows for sorting and filtering.
Sorting can be done by clicking the respective table column header to sort in ascending/descending order.
After vehicles are fetched, for all parameters (object keys) of the vehicle the user is presented with a filter.
So far there are two types of filters: `NumberFilter` and `StringFilter`:
- `NumberFilter` allows reducing the range of selectable cars based on minimum and maximum of the parameter-value.
- `StringFilter` allows for reducing the scope of selectable cars on a selection base.

The architecture allows for easily adding more types of filters.

Additionally, in order to reduce network calls, already fetched vehicles are cached locally.

## Notes

### Project base

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Browser compatability

I decided to use the fetch api directly, so Internet Explorer is not supported.

## Available Scripts

In the project directory, you can run:

### `node apiserver/server.js`

Runs the server locally to fetch data.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.
