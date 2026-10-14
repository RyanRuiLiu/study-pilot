EDU(
  '5dc94803fafcfd5cf78c2b274d63647c',
  function (e, t, n, i, o, a) {
    if ('trident' === t._$KERNEL.engine)
      EDU('401b95825f6cf5a92b17c92d61812df9', function () {
        e.__set('storage.swf', (this.NEJ_CONF || i).storage || e.__get('root') + 'nej_storage.swf');
      });
    if ('trident' === t._$KERNEL.engine && t._$KERNEL.release <= '3.0')
      EDU('b6d746c41a32621109fb893d8ce923ad', function () {
        e.__set('blank.png', (this.NEJ_CONF || i).blank || e.__get('root') + 'nej_blank.gif');
      });
    return e;
  },
  '958518a6821b1f27da2979785195e893',
  'f051aeae7bb889518ead30ef6e491df3',
);
