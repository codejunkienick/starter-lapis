function postcss(webpack) {
  return function() {
    return {
      plugins: [
        require("postcss-import")({
          addDependencyTo: webpack,
            path: ['app/css'],
        }),
        require("postcss-cssnext")(),
        // add your "plugins" here
        require("postcss-nested")(),
        require('lost')(),
        require('postcss-inline-svg')(),
        //require("postcss-pxtorem")(),
        // and if you want to compress,
        // just use css-loader option that already use cssnano under the hood
        require("postcss-browser-reporter")(),
        require("postcss-reporter")(),
      ],
    };
  }
}


module.exports = postcss;
