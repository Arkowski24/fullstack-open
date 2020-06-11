import React from "react";
import {Grid, Button} from "semantic-ui-react";
import {Field, Formik, Form} from "formik";

import {TextField, NumberField} from "../AddPatientModal/FormField";
import {HealthCheckEntry, HealthCheckRating} from "../types";
import {DiagnosisSelection} from "../AddPatientModal/FormField";
import {useStateValue} from "../state";

export type HealthCheckEntryFormValues = Omit<HealthCheckEntry, "id">;

interface AddHealthCheckEntryFormProps {
    onSubmit: (values: HealthCheckEntryFormValues) => void;
    onCancel: () => void;
}

const AddHealthCheckEntryForm: React.FC<AddHealthCheckEntryFormProps> = ({onSubmit, onCancel}) => {
  const [{diagnoses}] = useStateValue();
  const isDate = (date: string) => Boolean(Date.parse(date));

  return (
    <Formik
      initialValues={{
        type: 'HealthCheck',
        description: '',
        date: '',
        specialist: '',
        diagnosisCodes: undefined,
        healthCheckRating: HealthCheckRating.Healthy
      }}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
        const dateError = "Date is invalid";
        const errors: { [field: string]: string } = {};
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
              label="Health Check Rating"
              name="healthCheckRating"
              component={NumberField}
              min={0}
              max={3}
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

export default AddHealthCheckEntryForm;
