import { Editor } from "@tinymce/tinymce-react";
import React from "react";

const TextEditor = ({ value, onChange, height = 200 }) => {
    return (
        <Editor
            value={value}
            onEditorChange={onChange}
            apiKey="ik1nx1iajwhhkh8b95507x2yypxi2mk1puzytm2ge7ctvyb8"
            init={{
                height: height,
                menubar: false,
                selector: "textarea",
                plugins: [
                    "lists advlist autolink link image charmap print preview anchor",
                    "searchreplace visualblocks code fullscreen ",
                    "insertdatetime table paste code help wordcount",
                ],
                toolbar:
                    "numlist bullist | " +
                    "undo redo | formatselect | " +
                    "bold italic backcolor | alignleft aligncenter " +
                    "alignright alignjustify | bullist numlist outdent indent | " +
                    "removeformat | help ",
                content_style:
                    "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
        />
    );
};

export default TextEditor;
