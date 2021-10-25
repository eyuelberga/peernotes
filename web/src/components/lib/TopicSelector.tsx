import React, { useState, useEffect } from 'react';
import { Box, Button, Tag, Wrap, Text } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TopicSelectorProps } from './props';
import { TopicValue } from '../interfaces';
import TopicFetch from './async/TopicFetch';

const TopicSelector: React.FC<TopicSelectorProps> = ({
  value: initialValue,
  onChange,
  isInvalid,
  smallFont,
  disabled,
  gradeSubjects,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState<TopicValue | undefined>(initialValue);
  const size = !smallFont ? 'md' : 'sm';
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);
  return (
    <>
      <Box
        borderWidth="1px"
        p={4}
        borderRadius="lg"
        borderColor={isInvalid ? 'red' : undefined}
      >
        <Wrap align={!value ? 'baseline' : undefined}>
          <Button
            id="TopicSelector_Open"
            rounded="lg"
            variant="outline"
            colorScheme="blue"
            size={size}
            disabled={disabled}
            leftIcon={<FontAwesomeIcon icon={value ? 'edit' : 'plus'} />}
            onClick={() => {
              setIsOpen(true);
            }}
          >
            {value ? 'Update' : 'Select Topic'}
          </Button>
          {value && (
            <>
              <Tag
                size={size}
                variant="subtle"
                colorScheme={!disabled ? 'green' : undefined}
              >
                {`Grade ${value.gradeLevel}`}
              </Tag>
              <Tag
                size={size}
                variant="subtle"
                colorScheme={!disabled ? 'orange' : undefined}
                style={{ textTransform: 'capitalize' }}
              >
                {value.subject.toLowerCase()}
              </Tag>
              <Tag
                size={size}
                variant="subtle"
                colorScheme={!disabled ? 'blue' : undefined}
              >
                {value.topic}
              </Tag>
            </>
          )}
          {!value && <Text color="gray.500">Topic not selected</Text>}
        </Wrap>
      </Box>
      <TopicFetch
        value={value}
        isOpen={isOpen}
        gradeSubjects={gradeSubjects}
        onSelect={(val) => {
          setValue(val);
          setIsOpen(false);
          if (onChange) {
            onChange(val);
          }
        }}
        onClose={() => {
          setIsOpen(false);
        }}
      />
    </>
  );
};
export default TopicSelector;
