interface Props {
  message: any;
}

const InputErrorMessage = ({ message }: Props) => (
  <p className="text-xs text-red-400">{message}</p>
);

export default InputErrorMessage;
