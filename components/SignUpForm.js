import React from "react";
import { View, Text, Button, TextInput } from "react-native";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { ScrollView } from "react-native-gesture-handler";

const SignUpForm = () => {
  const SignupSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    lastName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
  });
  return (
    <ScrollView>
      <Formik
        initialValues={{ email: "" }}
        validateOnChange={SignupSchema}
        onSubmit={(values) => console.log(values)}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View>
            <TextInput
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
            />
            <Button onPress={handleSubmit} title="Submit" />
          </View>
        )}
      </Formik>
    </ScrollView>
  );
};

export default SignUpForm;
