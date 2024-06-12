interface HiddenInput {
  name: string;
  value: string | number;
}

export default function HiddenInput({ name, value }: HiddenInput) {
  return <input type="hidden" id={name} name={name} value={value} />;
}
