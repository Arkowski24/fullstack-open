import React from "react";
import {Grid, Button} from "semantic-ui-react";
import {Field, Formik, Form} from "formik";

import {TextField} from "../AddPatientModal/FormField";
import {OccupationalHealthcareEntry} from "../types";
import {DiagnosisSelection} from "../AddPatientModal/FormField";
import {useStateValue} from "../state";

export type OccupationalHealthcareEntryFormValues = Omit<OccupationalHealthcareEntry, "id">;

interface AddOccupationalHealthcareEntryFormProps {
    onSubmit: (values: OccupationalHealthcareEntryFormValues) => void;
    onCancel: () => void;
}

const AddOccupationalHealthcareEntryForm: React.FC<AddOccupationalHealthcareEntryFormProps> = ({onSubmit, onCancel}) => {
  const [{diagnoses}] = useStateValue();
  const isDate = (date: string) => Boolean(Date.parse(date));

  return (
    <Formik
      initialValues={{
        type: 'OccupationalHealthcare',
        description: '',
        date: '',
        specialist: '',
        diagnosisCodes: undefined,
        employerName: '',
        sickLeave: {
          startDate: '',
          endDate: ''
        }
      }}
      onSubmit={(values: OccupationalHealthcareEntryFormValues) => {
        if (!values.sickLeave?.startDate && !values.sickLeave?.endDate) {
          values.sickLeave = undefined;
        }
        onSubmit(values);
      }}
      validate={values => {
        const requiredError = "Field is required";
        const dateError = "Date is invalid";
        const errors: { [field: string]: string | Record<string, string> } = {};

        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!isDate(values.date)) {
          errors.date = dateError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (values.sickLeave && (values.sickLeave.endDate || values.sickLeave.startDate)) {
          let sickLeaveErrors = {};
          if (!values.sickLeave.startDate) {
            sickLeaveErrors = {...sickLeaveErrors, startDate: requiredError};
          } else if (!isDate(values.sickLeave.startDate)) {
            sickLeaveErrors = {...sickLeaveErrors, startDate: dateError};
          }
          if (!values.sickLeave.endDate) {
            sickLeaveErrors = {...sickLeaveErrors, endDate: requiredError};
          } else if (!isDate(values.sickLeave.endDate)) {
            sickLeaveErrors = {...sickLeaveErrors, endDate: dateError};
          }
          if (sickLeaveErrors) {
            errors.sickLeave = sickLeaveErrors;
          }
        }
        return errors;
      }}
    >
      {({isValid, dirty, setFieldValue, setFieldTouched}) => {

        return (
          <Form className="form ui">
            <Field
              label="Description"
              placeholder="description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            <Field
              label="Employer Name"
              placeholder="Employer Name"
              name="employerName"
              component={TextField}
            />
            <Field
              label="Sick Leave Start Date"
              placeholder="YYYY-MM-DD"
              name="sickLeave.startDate"
              component={TextField}
            />
            <Field
              label="Sick Leave End Date"
              placeholder="YYYY-MM-DD"
              name="sickLeave.endDate"
              component={TextField}
            />
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddOccupationalHealthcareEntryForm;
