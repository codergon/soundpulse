import Svg, { Path, Rect } from "react-native-svg";

export default function AppLogo({ size = 78 }) {
  return (
    <Svg
      fill="none"
      viewBox="0 0 215 213"
      width={215}
      height={213}
      style={{
        transform: [{ scale: size / 215 }],
      }}
    >
      <Rect
        width={53.217}
        height={53.217}
        x={53.576}
        y={106.465}
        fill="#7B4CFA"
        rx={12.76}
      />
      <Rect
        width={53.217}
        height={53.217}
        x={0.361}
        y={159.681}
        fill="#7B4CFA"
        rx={12.76}
      />
      <Rect
        width={53.217}
        height={53.217}
        x={161.334}
        y={159.681}
        fill="#7B4CFA"
        rx={26.608}
      />
      <Path
        fill="#7B4CFA"
        d="M53.576 147.058c2.839 10.072 4.206 10.072 12.621 12.621-10.057.243-11.795 3.306-12.62 12.621-2.631-10.613-4.454-11.069-12.622-12.621 9.267-.439 12.751-2.457 12.621-12.621Z"
      />
      <Rect
        width={106.103}
        height={53.217}
        x={53.576}
        y={0.361}
        fill="#7B4CFA"
        rx={12.76}
      />
      <Rect
        width={53.217}
        height={53.217}
        x={0.361}
        y={53.579}
        fill="#7B4CFA"
        rx={12.76}
      />
      <Path
        fill="#7B4CFA"
        d="M53.576 41.015c2.383 9.931 4.206 9.475 12.621 12.621-9.782 1.412-10.694 3.69-12.62 12.622-1.72-10.299-5.365-11.21-12.622-12.622 9.267-.439 12.456-2.374 12.621-12.62Z"
      />
      <Rect
        width={53.217}
        height={53.217}
        x={79.691}
        y={106.465}
        fill="#fff"
        rx={12.76}
      />
      <Rect
        width={53.217}
        height={53.217}
        x={26.474}
        y={159.681}
        fill="#fff"
        rx={12.76}
      />
      <Path
        fill="#fff"
        d="M79.691 147.058c2.245 8.704 4.068 10.527 12.622 12.621-10.058.243-11.795 3.306-12.622 12.621-2.768-9.702-5.502-10.613-12.62-12.621 9.266-.439 12.75-2.457 12.62-12.621Z"
      />
      <Rect
        width={106.103}
        height={53.217}
        x={79.69}
        y={0.361}
        fill="#fff"
        rx={12.76}
      />
      <Rect
        width={53.217}
        height={53.217}
        x={26.474}
        y={53.579}
        fill="#fff"
        rx={12.76}
      />
      <Path
        fill="#fff"
        d="M79.69 41.015c2.701 9.02 4.068 10.843 12.622 12.621-10.143.435-11.795 3.306-12.622 12.622-2.767-9.843-4.59-10.755-12.62-12.622 9.266-.439 12.455-2.374 12.62-12.62Z"
      />
    </Svg>
  );
}