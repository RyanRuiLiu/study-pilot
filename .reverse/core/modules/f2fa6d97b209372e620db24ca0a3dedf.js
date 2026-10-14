EDU(
  'f2fa6d97b209372e620db24ca0a3dedf',
  function (e, t, n, i, o) {
    o[i.SETTING_KEY] = e._$merge(o[i.SETTING_KEY], t.get(i.SETTING_KEY) || {});
    t.batch(o);
    n.on({
      format: function (e) {
        if (e && 'login-set-bind-urs-phone' === e.key);
        else e.result = e.result || e.res.result;
      },
    });
  },
  'fe86216ed59e3103a56c42c850d389f0',
  '8f34a99b20d362b3542aebd517390fc1',
  '395a9dcb034c1e85f57aec5bbd1340bf',
  '2014b8348a8b1ce5cb92aa8db6bf1609',
  'bd72f3e3b4c8195905d5622e1dc2aa2f',
);
