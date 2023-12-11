import { InputProps, NormalText, TextInput, TextProps } from "./themed";

export function LightText(props: TextProps) {
  return (
    <NormalText
      {...props}
      style={[props.style, { fontFamily: "NeueMontreal-Light" }]}
    />
  );
}

export function RgText(props: TextProps) {
  return (
    <NormalText
      {...props}
      style={[props.style, { fontFamily: "NeueMontreal-Regular" }]}
    />
  );
}

export function Text(props: TextProps) {
  return (
    <NormalText
      {...props}
      style={[props.style, { fontFamily: "NeueMontreal-Medium" }]}
    />
  );
}

export function BdText(props: TextProps) {
  return (
    <NormalText
      {...props}
      style={[props.style, { fontFamily: "NeueMontreal-Bold" }]}
    />
  );
}

export function InputRg(props: InputProps) {
  return (
    <TextInput
      {...props}
      style={[props.style, { fontFamily: "NeueMontreal-Regular" }]}
    />
  );
}

export function Input(props: InputProps) {
  return (
    <TextInput
      {...props}
      style={[props.style, { fontFamily: "NeueMontreal-Medium" }]}
    />
  );
}

export function InputBd(props: InputProps) {
  return (
    <TextInput
      {...props}
      style={[props.style, { fontFamily: "NeueMontreal-Bold" }]}
    />
  );
}
