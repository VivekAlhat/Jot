import React, { useState, useEffect } from "react";
import { Button, Container } from "semantic-ui-react";
import { useParams, useHistory } from "react-router-dom";
import { db } from "../firebase/firebase";
import { toast } from "react-toastify";
import renderHTML from "react-render-html";
import Spinner from "react-spinkit";
import UserBar from "./UserBar";

const Note = ({ user }) => {
  const notify = () => toast.dark("Note removed");
  const history = useHistory();
  const { id } = useParams();
  const [userNote, setUserNote] = useState();
  const [docId, setDocId] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const found = db
      .collection("users")
      .doc(user?.uid)
      .collection("notes")
      .where("noteId", "==", id)
      .get();

    found.then((e) => {
      e?.docs.forEach((t) => {
        setDocId(t.id);
        setUserNote(t.data());
      });
    });

    setLoading(false);
  }, [id, user?.uid]);

  const deleteItem = () => {
    db.collection("users")
      .doc(user?.uid)
      .collection("notes")
      .doc(docId)
      .delete();
    notify();
    history.push("/");
  };

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
              <h1 style={{ color: "#222831" }}>{userNote.noteTitle}</h1>
              <p style={{ color: "#314e52" }}>
                Created on {userNote.createdAt}
              </p>
              <div className="note-content">
                {renderHTML(userNote.noteContent)}
              </div>
              <div className="note-delete">
                <Button onClick={deleteItem}>Delete</Button>
              </div>
            </div>
          )}
        </div>
      )}
    </Container>
  );
};

export default Note;
