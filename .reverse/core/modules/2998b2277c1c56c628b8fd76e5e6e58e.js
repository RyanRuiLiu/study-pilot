EDU(
  '2998b2277c1c56c628b8fd76e5e6e58e',
  function (e, t, n, i) {
    i = e.$extends({
      name: 'segmentAILectureNote',
      data: {
        segmentList: [],
        currentKnowledgeId: '',
        aiSegmentStatus: null,
        euConst: t,
        emptyBoxIcon:
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAM2SURBVHgB7ZtLTttQFIZPEiDxLJ0gwShILCDdQNsllHErlSV03A7KpEzbHUClztuugQWUThkQhHhIkSIgT6VJ7J6TXguLxEnsY2M7/J9042vZxsef79M2RAAAAAAAAAAAMkaOYqRWq5WLxeJvzlYoGc76/f7zra2tW4qJPMUIyzug5OQJFY7hB2WR6+vrT1dXVw6nGucr9MjIOeXcJoYvlCU88px6vV6lhJBzcww3Jpb3lAXOz89fu/LSEDTfzF03Hs6/ojRjqs34jl9eXu5RSpBYjMSbJJqThfC2ORcXF18pZXBch3G0yZH1wrZtS29XcRzneDAY7FHK4OGMNCfHnCom1kiIRKD0crlcTjqLs3w+vxPnuCssEhPHuMPZM4mVq/UBpQFPj5ve9sWDt2eW2EmJaibCAbzjKntoVn/ynf1F2eAlx70rGY55d2Nj4xuFRCVQGmRKdqYRBbebm5vPKCQrpKMiP5ZlURbp9XqyKJMCrcAx5bIqhsQwAlXE+jDhKQCBSiBQCQQqgUAlEKgEApVAoBIIVAKBSiKZyoWFHy3RaDQiDYVCgdbX1ykpUAKVJFoCkyw5UYESqAQClUCgEghUAoFKIFAJBCqBQCUQqAQClUCgEghUAoFKIFAJBCqBQCVhH6gWKOZ/E3tkxIPDKfD7hSACC2Z/KbXLJE9YM0uRaNN/kcNFDpxXhUXUKif5grJIkyXvTn5s26as4ROzXJtcowiVa5Zrn+lo1kYpbSXzR6aWOH6j9keWnU6Hsob7ceVwODzy2cUtPFJwfGuqn0A5YI3mVNVGo7Evy3a7PZaYhZIoMbZaLWo2m+N1jvv7nEPEgbhY8ds4DYsWbOdOT08/lEqlj5RBut3u/vb29ucFd5f2ceKbYLVA4eTk5K1lWW/4JfcLSj930vRI7alWq0cBjgskcNUkcM9fmtIzF3x2lsZMjC/jkCUo4mFAPsOaeXJk+4pJT02kiBua5PjtFESKO4hetlmIF3cgLdIWmpWEFeFKdEtmVoV6Zx6hpnJRXXie7ttLd5kmsW4VdGW5efXANe4LzM1JRJMxzIvJmbLuPMh7hTk0ow0DAAAAAAAAAABAMP4BteZXIWB3j0oAAAAASUVORK5CYII=',
        myNoteUrl:
          window.location.href.substring(0, window.location.href.indexOf('#')) + '#/learn/mynote',
      },
      config: function (e) {
        this.supr();
      },
      init: function () {
        this.supr();
        this.formatPreviewText();
      },
      formatTime: function (e) {
        var t = Math.floor(e / 1e3);
        var n = Math.floor(t / 60);
        t %= 60;
        return n.toString().padStart(2, '0') + ':' + t.toString().padStart(2, '0');
      },
      skipSegment: function (e) {
        this.data.currentKnowledgeId = e.knowledgeId;
        this.$emit('setVideoTime', { time: parseInt(e.startTime / 1e3), segment: e });
        this.$emit('skipSegment', e);
        this.$update();
      },
      formatPreviewText: function () {
        var e = this.$refs.previewTextDom;
        if (e)
          if (this.data.aiSegmentStatus == t.AI_STATUS.NOT_COMMIT)
            e.innerHTML = '视频未发布，未触发智能数据生成任务';
          else if (
            this.data.aiSegmentStatus == t.AI_STATUS.NO_GENERATE ||
            this.data.aiSegmentStatus == t.AI_STATUS.GENERATING
          )
            e.innerHTML = '智能分段数据生成排队中，<br />24小时之内完成生成。';
      },
    });
    return i;
  },
  '235c21779ec98ac90606962a862dadc9',
  '93828627ddb358ed890cb65967a0c1de',
  '217dcfc103efb36d2f192eecc4548797',
);
