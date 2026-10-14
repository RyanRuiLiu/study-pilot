EDU(
  'f7105100ce6ab22ef3f17da0e7b7d40f',
  '<div class="component-course-editor">\n    <div class="component-course-editor_hd f-fr">\n        <p class="component-course-editor_prompt {prompt.class}">{prompt.text}</p>\n    </div>\n    <textarea placeholder={defaultText} class="component-course-editor_textarea f-f0" r-model={content} on-blur={this.validate()}></textarea>\n    <ux-validation rules={emptyRules} value={content} ref="EmptyValidation"></ux-validation>\n</div>\n',
);
