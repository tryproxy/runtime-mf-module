import { HomePage } from '@/pages/home';

type AppProps = {
  basename?: string;
  isEmbedded?: boolean;
};

function App({ basename = '', isEmbedded = false }: AppProps) {
  const activePath = isEmbedded ? basename || '/remote' : '#/';

  return (
    <HomePage
      isEmbedded={isEmbedded}
      activePath={activePath}
      basename={basename}
    />
  );
}

export default App;
