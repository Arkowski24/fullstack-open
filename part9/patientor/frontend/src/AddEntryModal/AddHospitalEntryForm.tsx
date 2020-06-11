import React from "react";
import {Grid, Button} from "semantic-ui-react";
import {Field, Formik, Form} from "formik";

import {TextField} from "../AddPatientModal/FormField";
import {HospitalEntry} from "../types";
import {DiagnosisSelection} from "../AddPatientModal/FormField";
import {useStateValue} from "../state";

export type HospitalEntryFormValues = Omit<HospitalEntry, "id">;

interface AddHospitalEntryFormProps {
    onSubmit: (values: HospitalEntryFormValues) => void;
    onCancel: () => void;
}

const AddHospitalEntryForm: React.FC<AddHospitalEntryFormProps> = ({onSubmit, onCancel}) => {
  const [{diagnoses}] = useStateValue();
  const isDate = (date: string) => Boolean(Date.parse(date));

  return (
    <Formik
      initialValues={{
        type: 'Hospital',
        description: '',
        date: '',
        specialist: '',
        diagnosisCodes: undefined,
        discharge: {
          date: '',
          criteria: ''
        }
      }}
      onSubmit={onSubmit}
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
        if (!values.discharge.date) {
          errors.discharge = {date: requiredError};
        }
        if (!isDate(values.discharge.date)) {
          errors.discharge = {date: dateError};
        }
        if (!values.discharge.criteria) {
          errors.discharge = {criteria: requiredError};
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
              label="Discharge Date"
              placeholder="YYYY-MM-DD"
              name="discharge.date"
              component={TextField}
            />
            <Field
              label="Discharge Criteria"
              placeholder="Discharge Criteria"
              name="discharge.criteria"
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

export default AddHospitalEntryForm;
