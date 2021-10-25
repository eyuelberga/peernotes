import React from 'react';
import {
  Grid,
  GridItem,
  Input,
  Select,
  Stack,
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  Flex,
  Spacer,
  CheckboxGroup,
  Checkbox,
  useDisclosure,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GetStartedFormProps, GetStarted } from './props';
import SchoolSelector from './SchoolSelector';
import { GRADE_LEVELS, SUBJECTS } from '../../config/constants';

const SessionEditor: React.FC<GetStartedFormProps> = ({
  school: initialSchool,

  gradeLevel: initialGradeLevel,

  fullname: initialFullname,
  subjects: initialSubjects,
  onSave,
  isLoading,
}) => {
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    validationSchema: Yup.object().shape({
      fullname: Yup.string().required(),
      school: Yup.string().required(),

      gradeLevel: Yup.number().required(),
      subjects: Yup.array().required(),
    }),
    initialValues: {
      school: initialSchool,

      gradeLevel: initialGradeLevel,

      fullname: initialFullname,
      subjects: initialSubjects,
    },
    onSubmit: ({
      school,

      gradeLevel,

      fullname,
      subjects,
    }) => {
      if (school && gradeLevel && fullname && subjects) {
        const payload: GetStarted = {
          school,
          gradeLevel,
          fullname,
          subjects,
        };
        if (onSave) {
          onSave(payload);
        }
      }
    },
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Stack>
      <Grid
        templateColumns={{ md: 'repeat(6, 1fr)', base: 'repeat(1, 1fr)' }}
        gap={{ md: 4, base: 0 }}
      >
        <GridItem colSpan={6}>
          <FormControl
            isRequired
            isInvalid={!!(errors.fullname && touched.fullname)}
          >
            <Input
              isDisabled={isLoading}
              id="fullname"
              placeholder="Full Name"
              fontWeight="semibold"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.fullname}
            />
            <FormErrorMessage>{errors.fullname}</FormErrorMessage>
          </FormControl>
        </GridItem>
        <GridItem colSpan={4}>
          <SchoolSelector
            onClose={onClose}
            isOpen={isOpen}
            onOpen={onOpen}
            onSelect={(name) => {
              setFieldValue('school', name);
            }}
          />
          <FormControl
            isRequired
            isInvalid={!!(errors.school && touched.school)}
          >
            <Input
              isReadonly
              isDisabled={isLoading}
              id="school"
              placeholder="School"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.school}
              onClick={() => {
                onOpen();
              }}
            />
            <FormErrorMessage>{errors.school}</FormErrorMessage>
            {!errors.school && (
              <FormHelperText>
                School you are currently enrolled in
              </FormHelperText>
            )}
          </FormControl>
        </GridItem>
        <GridItem colSpan={2}>
          <FormControl
            isRequired
            isInvalid={!!(errors.gradeLevel && touched.gradeLevel)}
          >
            <Select
              isDisabled={isLoading}
              id="gradeLevel"
              placeholder="Grade Level"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.gradeLevel}
            >
              {GRADE_LEVELS.map((grade) => (
                <option
                  key={grade}
                  value={grade}
                  style={{ fontWeight: 'bold' }}
                >
                  {`Grade ${grade}`}
                </option>
              ))}
            </Select>
            <FormErrorMessage>{errors.gradeLevel}</FormErrorMessage>
          </FormControl>
        </GridItem>

        <GridItem colSpan={6}>
          <FormControl isInvalid={!!(errors.subjects && touched.subjects)}>
            <CheckboxGroup
              colorScheme="green"
              defaultValue={values.subjects}
              isDisabled={isLoading}
              onChange={(sub) => {
                setFieldValue('subjects', sub);
              }}
            >
              <Stack direction="column">
                {SUBJECTS.map((subject) => {
                  return <Checkbox value={subject}>{subject}</Checkbox>;
                })}
              </Stack>
            </CheckboxGroup>
            <FormErrorMessage>{errors.subjects}</FormErrorMessage>
            {!errors.subjects && (
              <FormHelperText>
                Select subjects you are currently taking
              </FormHelperText>
            )}
          </FormControl>
        </GridItem>
      </Grid>

      <Flex>
        <Spacer />
        <Button
          colorScheme="blue"
          leftIcon={<FontAwesomeIcon icon="save" />}
          onClick={() => {
            handleSubmit();
          }}
          isLoading={isLoading}
          isDisabled={isLoading}
        >
          Save
        </Button>
      </Flex>
    </Stack>
  );
};
export default SessionEditor;
