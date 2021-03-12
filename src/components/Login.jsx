import React from "react";
import { Container, Grid, Image, Button, Icon } from "semantic-ui-react";
import { auth, provider } from "../firebase/firebase";
import FadeIn from "react-fade-in";
import InfoBar from "./InfoBar";

const Login = () => {
  const signIn = (e) => {
    e.preventDefault();
    auth.signInWithPopup(provider).catch((err) => alert(err.message));
  };

  return (
    <React.Fragment>
      <InfoBar />
      <FadeIn delay="500">
        <Container className="LoginContainer">
          <Grid stackable columns={2}>
            <Grid.Column className="LoginInfo">
              <h1>Jot</h1>
              <h4>Note taking made easy!</h4>
              <p>
                Jot is a simple note taking service built using React and
                Firebase. Jot makes it easy for you to manage notes at a single
                place. Sign in directly with your Google account by clicking the
                button below.
              </p>
              <Button animated color="teal" onClick={signIn}>
                <Button.Content visible>Sign in with Google</Button.Content>
                <Button.Content hidden>
                  <Icon name="arrow right" />
                </Button.Content>
              </Button>
            </Grid.Column>

            <Grid.Column className="LoginInfo">
              <Image src="/assets/todo.svg" />
            </Grid.Column>
          </Grid>
        </Container>
      </FadeIn>
    </React.Fragment>
  );
};

export default Login;
