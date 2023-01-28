let _href: string | null = null;

const linkState = {
  set: function (href: string) {
    _href = href;
  },
  clear: function () {
    _href = null;
  },
  get: function () {
    return _href;
  },
};

export { linkState };
