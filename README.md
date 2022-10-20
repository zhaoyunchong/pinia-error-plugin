pinia全局处理错误插件
===
```javascript
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import piniaErrorPlugin from "./pinia-error-plugin"

const pinia = createPinia();
// 使用插件
pinia.use(piniaErrorPlugin);

createApp(App).use(pinia).use(router).mount("#app");

```

使用，你的actions中有报错的话就可以被捕获到，然后打印在控制台上
在store.js中

```javascript
import { defineStore } from "pinia";

export const useStore = defineStore(
  "counter",
  {
    state: () => ({ count: 0 }),
    getters: {
      double: (state) => state.count * 2,
    },
    actions: {
      async print(params) {
        console.log('参数:', params)
        const res = await test();
        console.log(res, '==')
      },
    },
    // 这里书写需要捕获的错误的action
    errorHandle: {
      print: true,
    }
  },
);


```


能捕获一下两种错误
```javascript
doSomething () {
    api.doSomething.then(data => {
      this.data = data
    })
  }
// 或
async doSomething  () {
    const data = await api.doSomething()
    this.data = data
} 



```