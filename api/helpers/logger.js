import bunyan from 'bunyan';
import bunyanRequest from 'bunyan-request';

export const logger = bunyan.createLogger({
  name: 'starter-lapis',
  streams: [
    {
      level: 'debug',
      path: 'debug.log',
    },
    {
      path: 'trace.log',
      level: 'trace'
    }
  ],
  serializers: {
    req: bunyan.stdSerializers.req,
    res: bunyan.stdSerializers.res,
  },
});

export const middleware = bunyanRequest({
  logger: logger,
  headerName: 'x-request-id'
});
