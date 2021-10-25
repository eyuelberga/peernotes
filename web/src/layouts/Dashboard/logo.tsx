import React from 'react';
import { Image } from '@chakra-ui/react';
import LogoImage from '../../assets/logo.png';

const Logo = () => {
  return <Image src={LogoImage} alt="logo" w={12} h={10} />;
};

export default Logo;
