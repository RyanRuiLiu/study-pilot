EDU(
  '290ddb0fa4eb1c4998e979124ad33c3b',
  '<div class="um-module-live-answer-sheet-true-false-question {type}">\n    <div class="option-wrapper">\n        <ux-radio-group\n            readonly={isReadonly}\n            class={isReadonlyClass}\n            source={UIData.liveAnswerOptions}\n            selected = {UIData.selected}\n            on-select={this.select($event)}>\n        </ux-radio-group>\n    </div>\n    {#if type == \'view\'}\n    <div class="right-answer-wrapper">{UIData.rightAnswer}</div>\n    <div class="my-answer-wrapper {UIData.resultStyle.replace(\'th-wrong\', \'th-fc6\')}">{UIData.judgeResult}</div>\n{/if}\n</div>\n',
);
