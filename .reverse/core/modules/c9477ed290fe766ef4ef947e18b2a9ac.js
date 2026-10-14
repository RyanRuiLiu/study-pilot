EDU(
  'c9477ed290fe766ef4ef947e18b2a9ac',
  function (e, t, n, i) {
    e.$default(n);
    t.on('filter', function (e) {
      var t = e.req,
        n = e.url;
      if (/\/\/mozart.study.163.com/.test(n)) {
        t.headers = t.headers || {};
        t.headers['edu-client-version'] = i.version;
      }
    });
  },
  '8f34a99b20d362b3542aebd517390fc1',
  '395a9dcb034c1e85f57aec5bbd1340bf',
  '3f7b64d3ca09b290abd28fe102238091',
  'd9e1b3b2c525372012054b99dc1aef85',
);
