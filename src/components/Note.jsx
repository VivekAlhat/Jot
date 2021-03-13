import React, { useState, useEffect } from "react";
import { Container } from "semantic-ui-react";
import { useParams } from "react-router-dom";
import { db } from "../firebase/firebase";
import renderHTML from "react-render-html";
import Spinner from "react-spinkit";
import UserBar from "./UserBar";

const Note = ({ user }) => {
  const { id } = useParams();
  const [userNote, setUserNote] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const found = db
      .collection("users")
      .doc(user?.uid)
      .collection("notes")
      .where("noteId", "==", id)
      .get();

    found.then((e) => {
      e?.docs.forEach((t) => setUserNote(t.data()));
    });

    setLoading(false);
  }, [id, user?.uid]);

  return (
    <Container>
      <UserBar />
      {loading ? (
        <div className="notes-error">
          <Spinner name="pacman" fadeIn="none" />
        </div>
      ) : (
        <div className="note_data_container">
          {!userNote ? (
            <div className="notes-error">
              <Spinner name="pacman" fadeIn="none" />
            </div>
          ) : (
            <div className="note-details">
              <h1>{userNote.noteTitle}</h1>
              <p>Created on {userNote.createdAt}</p>
              <div className="note-content">
                {renderHTML(userNote.noteContent)}
              </div>
            </div>
          )}
        </div>
      )}
    </Container>
  );
};

export default Note;
