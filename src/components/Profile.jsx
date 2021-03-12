import React from "react";
import FadeIn from "react-fade-in";
import { Container, Button, Image } from "semantic-ui-react";
import { auth } from "../firebase/firebase";
import { useHistory } from "react-router-dom";
import UserBar from "./UserBar";

const Profile = ({ user }) => {
  const history = useHistory();

  return (
    <Container>
      <UserBar />
      <FadeIn>
        <div className="profile">
          <div className="avatar">
            <Image src={user?.photoURL} circular />
            <h1>{user?.displayName}</h1>
            <p>{user?.email}</p>
          </div>

          <div className="signout-btn">
            <Button
              secondary
              onClick={() => {
                auth.signOut();
                history.push("/");
              }}
            >
              Sign Out
            </Button>
          </div>
        </div>
      </FadeIn>
    </Container>
  );
};

export default Profile;
