import React, { useRef, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@chakra-ui/react';
import { FcReading, FcConferenceCall, FcCollaboration } from 'react-icons/fc';
import { useHistory } from 'react-router-dom';
import Hero from '../../components/Home/Hero';
import Features from '../../components/Home/Features';
import { useQuery as useURLQuery } from '../../hooks';
import Footer from '../../components/Home/Footer';
import { Auth0Extended } from '../../interfaces';

export default function CallToActionWithIllustration() {
  const { logout } = useAuth0<Auth0Extended>();
  const queryRef = useRef(useURLQuery());
  const history = useHistory();
  useEffect(() => {
    const error = queryRef.current.get('error');
    if (error)
      window.alert(
        'Sorry, we are facing some technical issues. Please try again later.',
      );
  }, []);
  return (
    <>
      <Button
        hidden
        id="logout"
        onClick={() => {
          logout({ returnTo: window.location.origin });
        }}
      >
        Logout
      </Button>

      <Hero
        title="Peer Notes"
        subtitle="share notes with peers"
        description="Peer Notes is a web application for High School Students to share school notes and get access to thousands of notes created by students"
        image="https://unsplash.com/photos/DUmFLtMeAbQ/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8NHx8bGVjdHVyZSUyMG5vdGVzfHwwfHx8fDE2MzQzMzAzNDk&force=true&w=640"
        onGetStarted={() => {
          history.push('/app/feed');
        }}
      />
      <Features
        features={[
          {
            icon: <FcReading />,
            title: 'Share Your Textbook notes',
            description:
              'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore...',
          },
          {
            icon: <FcConferenceCall />,
            title: 'Get Personalized Feed',
            description:
              'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore...',
          },
          {
            icon: <FcCollaboration />,
            title: 'Fast Search',
            description:
              'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore...',
          },
          {
            icon: <FcCollaboration />,
            title: 'Bookmark Notes',
            description:
              'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore...',
          },
        ]}
      />
      <Footer />
    </>
  );
}
