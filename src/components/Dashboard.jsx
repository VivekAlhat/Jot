import React from "react";
import { Container, List } from "semantic-ui-react";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../firebase/firebase";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Spinner from "react-spinkit";
import UserBar from "./UserBar";

const Dashboard = ({ user }) => {
  const [notes, loading] = useCollection(
    db
      .collection("users")
      .doc(user?.uid)
      .collection("notes")
      .orderBy("createdAt", "desc")
  );

  return (
    <Container>
      <UserBar />
      <ToastContainer />
      <div className="notes-container">
        {loading ? (
          <div className="notes-error">
            <Spinner name="pacman" fadeIn="none" />
          </div>
        ) : notes?.docs.length === 0 ? (
          <div className="notes-error">
            <h4>Nothing to display!</h4>
            <p>Create a new note.</p>
          </div>
        ) : (
          <div className="notes">
            <List divided relaxed>
              {notes?.docs.map((t) => {
                const { noteId, noteTitle, createdAt } = t.data();

                return (
                  <List.Item key={noteId}>
                    <List.Content className="note-content">
                      <h3>
                        <Link style={{ color: "#000" }} to={`/${noteId}`}>
                          {noteTitle}
                        </Link>
                      </h3>
                      <p style={{ fontSize: "13px" }}>
                        Created on
                        <span style={{ paddingLeft: "5px" }}>{createdAt}</span>
                      </p>
                    </List.Content>
                  </List.Item>
                );
              })}
            </List>
          </div>
        )}
      </div>
    </Container>
  );
};

export default Dashboard;
