import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
// Register plugins
registerPlugin(FilePondPluginImagePreview);

const FileUploader = ({
  file,
  setFile,
  // initialImage,
}) => {
  const joeMAmA = (e) => {
    console.log(e);

    setFile(e);
  };

  return (
    <div className="flex flex-col gap-2">
      {/* {initialImage && <div className="mb-2"></div>} */}
      <FilePond
        files={file ? [file] : []}
        allowMultiple={false}
        onupdatefiles={(fileItems) => {
          joeMAmA(fileItems[0]?.file || null);
        }}
      />
    </div>
  );
};

export default FileUploader;
