import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";

export default function RTE({ name, control, label, defaultValue = "" }) {
  return (
    <div className="w-full">
      {" "}
      {label && <label className="inline-block mb-1 pl-1">{label}</label>}{" "}
      <Controller
        name={name || "content"}
        control={control}
        defaultValue={defaultValue}
        render={({ field: { onChange } }) => (
          <Editor
            apiKey="your-api-key"
            onEditorChange={onChange}
            initialValue={defaultValue}
            init={{
              initialValue:defaultValue,
              height: 500,
              menubar: true,
              plugins: [
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
                "print",
                "paste",
              ],
              toolbar:
                "undo redo | blocks | formatselect | backcolor |" +
                "bold italic forecolor | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | " +
                "removeformat | help",
              content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:16px }'
            }}
          />
        )}
      />{" "}
    </div>
  );
}
