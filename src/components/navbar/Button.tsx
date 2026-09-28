import { useNavigate } from 'react-router-dom';

const Button = ({
  title,
  path,
  isActive,
  onSelect,
}: {
  title: string;
  path: string;
  isActive: boolean;
  onSelect: () => void;
}) => {
  const navigate = useNavigate();
  return (
    <button
      className={`flex shrink-0 cursor-pointer items-center justify-center rounded-full bg-black px-4 py-2 whitespace-nowrap transition duration-300 hover:bg-white hover:text-black ${isActive ? 'bg-white text-black' : 'text-stone-300'}`}
      onClick={() => {
        onSelect();
        navigate(path);
      }}
    >
      <p className='text-sm'>{title}</p>
    </button>
  );
};

export default Button;
