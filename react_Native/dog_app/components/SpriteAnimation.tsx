// ： 创建小狗动画组件，这是整个 App 的核心。   一个会动的小狗零件
//   为什么： 把动画逻辑单独封装成一个组件，主页面只需要调用它，传入图片和帧数就能播放动画。这是 React 的核心思想——组件化。

import { useEffect, useRef, useState } from "react";
import { Image, View } from "react-native";

// fps  每秒帧数，可以不传
// scale 放大倍数，可以不传
//  ? 是什么意思： 带 ? 的参数可以不传，不传时用默认值。没有  ? 的参数必须传，不传就报错
// 图片路径，类型随意
type Props = {
  imagePath: any;
  frameCount: number;
  frameWidth: number;
  frameHeight: number;
  fps?: number;
  scale?: number;
};

// 用解构的写法
export default function SpriteAnimation({
  imagePath,
  frameCount,
  frameWidth,
  frameHeight,
  fps = 8,
  scale = 3,
}: Props) {
  //  useState — 记住"现在是第几帧" ，setFrame修改帧编号的方法
  const [frame, setFrame] = useState(0);

  // 尖括号 <any> — 这是 TypeScript 专属语法，告诉 TypeScript "这个 ref里存的值是什么类型"
  const intervalRel = useRef<any>(null);

  //  useEffect — 组件出现时启动 timer
  //  intervalRef.current ？？
  //   .current 是 useRef 创建出来的东西，是一个盒子。这个盒子有一个格子叫 .current，你想存的值就放在这个格子里。
  //   const intervalRef = useRef<any>(null);
  //  此时 intervalRef.current = null（空的）
  //   为什么要这样设计？因为 useRef 返回的是一个对象，对象里有一个叫 current的属性。
  // 这是 React 的固定设计，记住就行：想存值就存在 .current里，想取值也从 .current 里取。
  useEffect(() => {
    // 组件出现时，执行这里
    // 此时 intervalRef.current = 计时器编号（比如 42）
    intervalRel.current = setInterval(() => {
      //  % 取余运算 — 让帧数循环
      setFrame((prev) => (prev + 1) % frameCount);
    }, 1000 / fps);
    // 组件消失时，执行这里（做清理）
    return () => {
      clearInterval(intervalRel.current);
    };
  }, [frameCount, fps]);

  return (
    //  View 是什么：相当于网页里的 <div>，是一个容器。
    // 这里它充当窗口，大小只有一帧，超出窗口的内容被 overflow: 'hidden' 遮住
    <View
      style={{
        width: frameWidth * scale,
        height: frameHeight * scale,
        overflow: "hidden",
      }}
    >
      {/* Image 相当于网页里的 <img>，显示图片。这里放的是整张精灵图 */}
      <Image
        source={imagePath}
        style={{
          width: frameWidth * frameCount * scale,
          height: frameHeight * scale,
          marginLeft: -frame * frameWidth * scale,
        }}
        resizeMode="stretch"
      />
    </View>
  );
}
