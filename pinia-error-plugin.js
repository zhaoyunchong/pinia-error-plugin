export default ({ options, store }) => {
  if (options.errorHandle) {
    // 用新的action覆盖旧的action
    return Object.keys(options.errorHandle).reduce((actions, action) => {
      actions[action] = (function (fn) {
        return function (...arg) {
          try {
            fn.apply(null, arg);
          } catch (error) {
            console.log(error, "error");
            // 这里根据项目你可以自定义处理些事情
          }
        };
      })(store[action]);

      return actions;
    }, {});
  }
};
