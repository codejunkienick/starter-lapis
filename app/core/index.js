const req = require.context(
  '.',
  true,
  /\.\/(molecules|organisms|atoms)\/[^\/]+\/index\.js$/,
);
req.keys().forEach(key => {
  const componentName = key.replace(/^.+\/([^\/]+)\/index\.js/, '$1');
  module.exports[componentName] = req(key);
});
