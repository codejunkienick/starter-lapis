import loremIpsum from 'lorem-ipsum';
import { logger } from './helpers/logger';

function generateMsgEvery20Sec(socket) {
  return function loop() {
    socket.emit('notifications.sendOne', {
      msg: loremIpsum({ count: 4, units: 'words' }),
    });
    setTimeout(loop, 1000 * 20);
  };
}

export default function handleUserSocket(socket) {
  try {
    socket.on('notifications.sendOne', data => {
      socket.emit('notifications.sendOne', { msg: data.msg });
    });

    generateMsgEvery20Sec(socket)();
  } catch (err) {
    logger.error(err);
  }
}
