import React, { useState } from "react";
import { Button, Container, Form, Input } from "semantic-ui-react";
import { db } from "../firebase/firebase";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";
import "react-toastify/dist/ReactToastify.css";
import "react-quill/dist/quill.snow.css";
import uuid from "react-uuid";
import UserBar from "./UserBar";

const Compose = ({ user }) => {
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const errors = { message: "Note created" };
  const notify = () => toast.dark(errors.message);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title.length === 0 || note.length === 0) {
      errors.message = "Cannot create new note!";
      return false;
    }

    db.collection("users")
      .doc(user?.uid)
      .collection("notes")
      .add({
        noteId: uuid(),
        noteTitle: title,
        noteContent: note,
        createdAt: new Date().toLocaleDateString("en-US", {
          weekday: "short",
          year: "numeric",
          month: "short",
          day: "numeric",
        }),
      });

    setNote("");
    setTitle("");
    notify();
    history.push("/");
  };

  return (
    <Container>
      <UserBar />
      <div className="editor">
        <div className="note-editor">
          <div className="noteTitle">
            <Form.Field>
              <Input
                value={title}
                required
                fluid
                placeholder="Note title here .. "
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </Form.Field>
          </div>
          <div>
            <ReactQuill
              theme="snow"
              value={note}
              onChange={(value) => {
                setNote(value);
              }}
            />
          </div>
          <div className="submit-btn">
            <Button secondary onClick={handleSubmit}>
              Compose
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Compose;
