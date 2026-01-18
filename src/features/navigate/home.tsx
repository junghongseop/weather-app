import { IconButton, IconHome } from '@/shared/ui';
import { useRouter } from 'next/navigation';

const HomeNavigateButton = () => {
  const router = useRouter();

  const handleMoveHome = () => {
    router.push('/');
  };

  return <IconButton icon={IconHome} onClick={handleMoveHome} />;
};

export default HomeNavigateButton;
