// Export collection of Routes
// I don't really know if I want to have a centralized route config structure
// But if you want to implement it this is an example. 
// BUT it is not used anywhere in the code 
// For a much more complete extample visit: https://github.com/ReactTraining/react-router/blob/v4/packages/react-router-website/modules/examples/RouteConfig.js
const App ({children}) => <div>{children}</div>
const ROUTES = [
  {
    path: '/',
    component: App,
    routes: [
      {
        path: '/home',
        component: () => <h2>Home</h2>,
      },
      {
        path: '/contacts',
        component: () => <h2>Contacts</h2>,
      },
    ]
  }
];

export default ROUTES;
