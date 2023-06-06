interface Props {
  index: number;
  value: string;
}

const DropdownItem = ({ index, value }: Props) => {
  return (
    <option value={index}>
      Learning moment {index + 1} at timestamp {value}
    </option>
  );
};

export { DropdownItem };
