// @flow
import * as React from "react";
import { Item, Input, Icon, Toast, Form } from "native-base";
import { Field, reduxForm } from "redux-form";
import { NavigationActions, NavigationScreenProps,StackActions } from "react-navigation";
import Login from "../../screens/Login";

const required = value => (value ? undefined : "Required");
const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined;
const maxLength15 = maxLength(15);
const minLength = min => value =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined;
const minLength8 = minLength(8);
const email = value =>
  value && !/^[A-Z0-9]*/i.test(value)
    ? "Invalid email address"
    : undefined;
const alphaNumeric = value =>
  value && /[^a-zA-Z0-9 ]/i.test(value)
    ? "Only alphanumeric characters"
    : undefined;

export interface Props extends NavigationScreenProps {
}
export interface State { }

@reduxForm({ form: "login" })
class LoginContainer extends React.Component<Props, State> {
  textInput: any;

  renderInput({ input, label, type, meta: { touched, error, warning } }) {
    return (
      <Item error={error && touched}>
        <Icon active name={input.name === "email" ? "person" : "unlock"} />
        <Input
          style={{ lineHeight: 0 }}
          ref={c => (this.textInput = c)}
          placeholder={input.name === "email" ? "Email" : "Password"}
          secureTextEntry={input.name === "password" ? true : false}
          {...input}
        />
      </Item>
    );
  }

  login() {
    if (this.props.valid) {
      this.props.navigation.dispatch(StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: "Drawer" })],
      }));
    } else {
      Toast.show({
        text: "Enter Valid Username & password!",
        duration: 2000,
        position: "top",
        textStyle: { textAlign: "center" }
      });
    }
  }

  render() {
    const form = (
      <Form>
        <Field
          name="email"
          component={this.renderInput}
          validate={[email, required]}
        />
        <Field
          name="password"
          component={this.renderInput}
          validate={[alphaNumeric, minLength8, maxLength15, required]}
        />
      </Form>
    );
    return (
      <Login
        navigation={this.props.navigation}
        loginForm={form}
        onLogin={() => this.login()}
      />
    );
  }
}

export default LoginContainer;
