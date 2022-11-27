import { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import Image from 'next/image';

import Layout from '../components/layout';

interface Login {
  login: string;
}

export default function Page() {
  const [lnurl, setLnurl] = useState('');
  const [qrCode, setQrCode] = useState('');

  const handleLogin = async () => {
    const response = await fetch('/api/login');
    const { login }: Login = await response.json();
    const url = `lightning:${login}`;
    const output = await QRCode.toDataURL(url, { margin: 2, width: 500 });
    setQrCode(output);
    setLnurl(url);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (lnurl) {
      timer = setTimeout(() => window.location.reload(), 10000);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [lnurl]);

  return (
    <Layout>
      <h1>Login with lightning</h1>
      {!lnurl && (
        <p>
          <button onClick={handleLogin}>Sign in with lightning</button>
        </p>
      )}
      {lnurl && (
        <div>
          <Image src={qrCode} alt="Login with lightning - QRCode" width={300} height={300} />
          <p>
            <a href={lnurl}>Do Login</a>
          </p>
        </div>
      )}
    </Layout>
  );
}
