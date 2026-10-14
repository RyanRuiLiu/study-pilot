EDU('5147903096318e5db3d048c483fc6b12', function (e) {
  e.DEFAULT_PAGE_SIZE = 20;
  e.ORDER_RULES = {
    UPDATE_TIME_DESCENDING: 0,
    UPDATE_TIME_ASCENDING: 1,
    RATING_DECENDING: 2,
    MULTI_RULES: 3,
  };
  e.VOTE_TYPE = { UPVOTE: 1, DOWNVOTE: 0 };
  e.CANCEL_TYPE = { UPVOTE: 0, CANCEL_UPVOTE: 1 };
  e.REQUEST_KEYS = {
    LIST: 'mooc-comment-course-comment-list',
    DELETE: 'mooc-comment-course-comment-delete',
    VOTE: 'mooc-comment-course-comment-vote',
    CAN_POST: 'mooc-comment-course-comment-can-post-comment',
    GET_AVERAGE_RATING_AND_COUNT: 'mooc-comment-course-comment-get-average-rating-and-count',
    POST_COMMENT: 'mooc-comment-course-comment-post-comment',
  };
  e.CONFIG_KEYS = { DEFAULT_AVATAR_IMAGE_URL: 'default-avatar-image-url' };
  e.SETTING_KEY = 'cache-comment-course-comment';
});
