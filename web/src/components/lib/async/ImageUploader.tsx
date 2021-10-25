/* eslint-disable no-underscore-dangle */

import React, { useState } from 'react';
import {
  Button,
  Box,
  Flex,
  Spacer,
  Stack,
  Wrap,
  Image,
} from '@chakra-ui/react';
import { useScript } from '../../../hooks';
import { ImageUploaderProps } from '../props';
import EmptyPlaceholder from '../EmptyPlaceholder';

declare const cloudinary: any;

const styles = {
  palette: {
    window: '#FFFFFF',
    windowBorder: '#90A0B3',
    tabIcon: '#0078FF',
    menuIcons: '#5A616A',
    textDark: '#000000',
    textLight: '#FFFFFF',
    link: '#0078FF',
    action: '#FF620C',
    inactiveTabIcon: '#0E2F5A',
    error: '#F44235',
    inProgress: '#0078FF',
    complete: '#20B832',
    sourceBg: '#E4EBF1',
  },
  fonts: {
    default: null,
    "'Fira Sans', sans-serif": {
      url: 'https://fonts.googleapis.com/css?family=Fira+Sans',
      active: true,
    },
  },
};

const cloudName = (window as any)._env_.REACT_APP_CLOUDNARY_CLOUD_NAME;
const uploadPreset = (window as any)._env_.REACT_APP_CLOUDNARY_UPLOAD_PRESET;

const defaultWidgetParams: Record<string, any> = {
  cloudName,
  uploadPreset,
  sources: ['local', 'camera'],
  showAdvancedOptions: false,
  cropping: false,
  defaultSource: 'local',
  maxImageFileSize: 1000000,
  clientAllowedFormats: ['jpg', 'png', 'jpeg'],
  multiple: true,
  maxFiles: 1,
  thumbnailTransformation: [{ width: 200, height: 200, crop: 'fit' }],
  styles,
};

const ImageUploader: React.FC<ImageUploaderProps> = ({
  maxFiles,
  onUpload,
}) => {
  const widgetParams = maxFiles
    ? { ...defaultWidgetParams, maxFiles }
    : { ...defaultWidgetParams };
  const [images, setImages] = useState<string[]>([]);
  const openWidget = () => {
    cloudinary.openUploadWidget(widgetParams, (err: any, result: any) => {
      if (!err && result.event === 'success') {
        const newImage: string = result.info.url;
        setImages((i) => {
          const imageList = [...i, newImage];
          if (onUpload) {
            onUpload(imageList);
          }
          return imageList;
        });
      }
    });
  };
  useScript('https://upload-widget.cloudinary.com/global/all.js');
  return (
    <Box p={4} borderWidth="1px" borderRadius="lg">
      <Stack>
        <Flex>
          <Spacer />
          <Button
            colorScheme="blue"
            onClick={openWidget}
            isDisabled={widgetParams.maxFiles === images.length}
          >
            Upload Image
          </Button>
        </Flex>
        {!images.length && (
          <EmptyPlaceholder icon="file" title="No Image Uploaded" />
        )}
        <Wrap>
          {images.map((url) => {
            return (
              <Image
                key={url}
                boxSize={{ base: '150px', md: '200px' }}
                objectFit="cover"
                src={url}
                alt={url}
                fallbackSrc="https://via.placeholder.com/150"
              />
            );
          })}
        </Wrap>
      </Stack>
    </Box>
  );
};

export default ImageUploader;
