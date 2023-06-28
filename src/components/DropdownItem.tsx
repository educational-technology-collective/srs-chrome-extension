interface Props {
  value: string;
}

const DropdownItem = ({ value }: Props) => {
  return <option value={value}>Visibility: {value}</option>;
};

export { DropdownItem };
