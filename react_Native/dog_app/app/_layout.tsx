// 一句话总结这个文件的作用：
// 告诉 Expo Router "整个 App 用栈式导航，首页不显示顶部标题栏"。
import { Stack } from "expo-router";
//       ↑ 从 expo-router 这个包里，取出 Stack 这个组件

export default function RootLayoout() {
  //             ↑ 定义并导出一个名叫 RootLayoout 的组件（函数）
  //               Expo Router 会自动找到并使用它
  return (
    <Stack>
      {/* ↑ 使用栈式导航，所有子页面都在这个"栈"里切换 */}
      <Stack.Screen name="index" options={{ headerShown: false }} />
      {/*            ↑ 给 index 页面单独配置：
          headerShown: false = 不显示顶部导航栏（Header）*/}
    </Stack>
  );
}
