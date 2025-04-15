import { Formik } from 'formik';
import * as Yup from 'yup';
import { View, StyleSheet } from 'react-native';
import { Button, TextInput, Text } from 'react-native-paper';

interface LoginFormProps {
  onSubmit: (values: { email: string; password: string }) => void;
  onNavigateToRegister: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, onNavigateToRegister }) => {
  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required('Required'),
  });

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting }) => (
        <View style={styles.form}>
          <TextInput
            label="Email"
            mode="outlined"
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            value={values.email}
            error={touched.email && !!errors.email}
          />
          {touched.email && errors.email && (
            <Text style={styles.error}>{errors.email}</Text>
          )}

          <TextInput
            label="Password"
            mode="outlined"
            secureTextEntry
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            value={values.password}
            error={touched.password && !!errors.password}
            style={styles.input}
          />
          {touched.password && errors.password && (
            <Text style={styles.error}>{errors.password}</Text>
          )}

          <Button 
            mode="contained" 
            onPress={() => handleSubmit()}
            loading={isSubmitting}
            disabled={isSubmitting}
            style={styles.button}
          >
            Login
          </Button>

          <Button 
            mode="text" 
            onPress={onNavigateToRegister}
            style={styles.linkButton}
          >
            Don't have an account? Register
          </Button>
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  form: {
    marginBottom: 20,
  },
  input: {
    marginTop: 10,
  },
  button: {
    marginTop: 20,
  },
  linkButton: {
    marginTop: 10,
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
});

export default LoginForm;   