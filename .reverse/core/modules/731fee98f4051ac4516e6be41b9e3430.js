EDU(
  '731fee98f4051ac4516e6be41b9e3430',
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
    return {
      rules: {
        rewrite: { 404: 'm/live/pc/' },
        alias: {
          'live-pc': 'm/live/pc/',
          'live-mobile': 'm/live/mobile/',
          'live-help': 'm/live/help/',
          'live-interactive-presenter': '/m/live/interactive/presenter/',
          'lecturer-answer-sheet': '/m/live/lecturerAnswerSheet',
          'lecturer-answer-sheet-publish-test': '/m/live/lecturerAnswerSheet/publishTest',
          'lecturer-answer-sheet-statistics-detail': '/m/live/lecturerAnswerSheet/statisticsDetail',
          'lecturer-answer-sheet-statistics-test': '/m/live/lecturerAnswerSheet/statisticsTest',
        },
      },
      modules: {
        '/m/live/pc/': 'eduos-live/src/live-pc/index.html',
        '/m/live/mobile/': 'eduos-live/src/live-mobile/index.html',
        '/m/live/help/': 'eduos-live/src/live-help/index.html',
        '/m/live/interactive/presenter/': 'eduos-live/src/live-interactive-presenter/index.html',
        '/m/live/lecturerAnswerSheet': 'eduos-live/src/lecturer-answer-sheet/index.html',
        '/m/live/lecturerAnswerSheet/publishTest':
          'eduos-live/src/lecturer-answer-sheet/publish-test/index.html',
        '/m/live/lecturerAnswerSheet/statisticsDetail':
          'eduos-live/src/lecturer-answer-sheet/statistics-detail/index.html',
        '/m/live/lecturerAnswerSheet/statisticsTest':
          'eduos-live/src/lecturer-answer-sheet/statistics-test/index.html',
      },
    };
  },
  '8f34a99b20d362b3542aebd517390fc1',
  '395a9dcb034c1e85f57aec5bbd1340bf',
  'e356b4a93ff6b3091ed9a7c0b270ea34',
  '745f7e382398d8d4d1b267ce63c64529',
);
