EDU(
  'bc941246d2a905df5cd9a0df777e435b',
  '<div class="um-module-live-answer-sheet-choice-question {type}">\n    <div class="option-wrapper">\n        <ux-check-group\n            readonly={isReadonly}\n            class={isReadonlyClass} \n            source={UIData.liveAnswerOptions}\n            on-check={this.select($event)}>\n        </ux-check-group>\n    </div>\n    {#if type == \'view\'}\n        <div class="right-answer-wrapper">{UIData.rightAnswer}</div>\n        <div class="my-answer-wrapper {UIData.resultStyle.replace(\'th-wrong\', \'th-fc6\')}">{UIData.judgeResult}</div>\n    {/if}\n</div>\n',
);
