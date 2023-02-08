const ImageUpload = async (file) => {
  let filename = file.split("/").pop();

  let match = /\.(\w+)$/.exec(filename);
  let type = match ? `image/${match[1]}` : `image`;

  let formData = new FormData();
  formData.append("name", { uri: file, name: filename, type });

  let data = await fetch("http://react.demofamib.com/index.php", {
    method: "POST",
    body: formData,
    header: {
      "content-type": "multipart/form-data",
    },
  }).then((res) => res.json());

  if (data[0].code == 200) {
    return "success";
  } else {
    return "failed";
  }
};

export default ImageUpload;
