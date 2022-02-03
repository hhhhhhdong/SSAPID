import React from "react";
import Navbar from "components/layout/MainTemplate";
import CreatePostForm from "components/Post/CreatePostForm";

function CreatePost() {
  return (
    <div>
      <Navbar>
        <CreatePostForm />
      </Navbar>
    </div>
  );
}

export default CreatePost;
