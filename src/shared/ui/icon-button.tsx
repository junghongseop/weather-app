import { ComponentType, SVGProps } from 'react';

interface IconButtonProps {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  onClick?: () => void;
}

const IconButton = ({ icon: Icon, onClick }: IconButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center justify-center w-10 h-10 rounded-full cursor-pointer hover:bg-[#d1d5db]"
    >
      <Icon width={24} height={24} />
    </button>
  );
};

export default IconButton;
