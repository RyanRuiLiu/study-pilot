EDU(
  'a73e7ee2eea7fb7073b1b0af2916f224',
  '<div class="video-segment-list {className}">\n<i class="close" on-click={this.hide()}></i>\n<p class="video-segment-list_title">视频分段</p>\n<div class="video-segment-list_container">\n{#list segmentList as segment}\n<div class="video-segment-list_item" on-click={this.toSegmentInfo(segment)}>\n<img src="{segment.pictureUrl}" alt="">\n<div class="video-segment-list_item-content">\n<p class="video-segment-list_item-title">{segment.title}</p>\n<p class="video-segment-list_item-time">{this.formatTime(segment.startTime)}-{this.formatTime(segment.endTime)}</p>\n</div>\n</div>\n{/list}\n</div>\n</div>',
);
