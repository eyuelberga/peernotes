import React from 'react';
import { FcReading, FcConferenceCall, FcCollaboration } from 'react-icons/fc';
import Features from '../../components/Home/Features';
import Footer from '../../components/Home/Footer';

export default function CallToActionWithIllustration() {
  return (
    <>
      <Features
        features={[
          {
            icon: <FcReading />,
            title: 'Share Textbook notes',
            description:
              'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore...',
          },
          {
            icon: <FcConferenceCall />,
            title: 'Cooperative Learning',
            description:
              'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore...',
          },
          {
            icon: <FcCollaboration />,
            title: 'Peer Tutoring',
            description:
              'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore...',
          },
        ]}
      />
      <Footer />
    </>
  );
}
