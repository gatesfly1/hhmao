import React from 'react';
import Link from '@docusaurus/Link';
import Translate from '@docusaurus/Translate';

export default function NavbarBackHome(): React.ReactElement {
  return (
    <Link
      className="navbar__back-home"
      to="https://hhmao.cn"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Translate
        id="navbar.backHome.text"
        description="The label of the 'Back to hhmao' navbar link"
      >
        回到哼哼猫 ↗
      </Translate>
    </Link>
  );
}