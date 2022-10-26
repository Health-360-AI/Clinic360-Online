import React, { useState } from "react";
import Labs from "./Labs";

const apiUrl = process.env.API_URL;
function LabsController({
  investigations,
  imaging,
  setDataToSend,
  dataToSend,
  photos,
  setPhotos,
  startScanning,
  getInvestigations,
  handleLabsSend,
  patient,
  dataToChange,
  setShowDelete,
  showDelete,
}) {
  const [invx, setInvx] = useState({
    id: 0,
    name: "",
    fileModalShow: false,
    index: null,
    type: null,
  });

  const handleCreateInvestigations = async (name, type) => {
    try {
      const response = await fetch(`${apiUrl}/investigations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          name,
          type,
        }),
      });
      const responseData = await response.json();
      return responseData.id;
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleInvestigations = async (item, action, type) => {
    if (action.action == "select-option") {
      setDataToSend({
        ...dataToSend,
        investigations: [
          ...dataToSend.investigations,
          {
            invx_id: item.id,
            name: item.name,
            invx_path: "",
            uploaded: 0,
            received: false,
            note: "",
            note_added: false,
            photos: [],
            type: item.type,
          },
        ],
      });
    } else if (action.action == "create-option") {
      let invx_id;
      if (type == "labs") {
        invx_id = await handleCreateInvestigations(item.value, 0);
      } else {
        invx_id = await handleCreateInvestigations(item.value, 1);
      }
      getInvestigations();
      if (type == "labs") {
        setDataToSend({
          ...dataToSend,
          investigations: [
            ...dataToSend.investigations,
            {
              invx_id,
              name: item.value,
              invx_path: "",
              uploaded: 0,
              received: false,
              note: "",
              note_added: false,
              photos: [],
              type: 0,
            },
          ],
        });
      } else {
        setDataToSend({
          ...dataToSend,
          investigations: [
            ...dataToSend.investigations,
            {
              invx_id,
              name: item.value,
              invx_path: "",
              uploaded: 0,
              received: false,
              note: "",
              note_added: false,
              photos: [],
              type: 1,
            },
          ],
        });
      }
    }
  };
  const handleEditLabs = async (index, type) => {
    let nee;
    if (type == "labs") {
      nee = dataToSend.investigations.filter(
        (item) => item.type == 0 || item.type == null
      );
    } else {
      nee = dataToSend.investigations.filter((item) => item.type == 1);
    }

    nee[index] = { ...nee[index], uploaded: 0 };
    if (type == "labs") {
      nee.push(...dataToSend.investigations.filter((item) => item.type == 1));
    } else {
      nee.push(
        ...dataToSend.investigations.filter(
          (item) => item.type == 0 || item.type == null
        )
      );
    }
    setDataToSend({
      ...dataToSend,
      investigations: nee,
    });
  };
  const handleInvxNoteChange = async (index, e, type) => {
    let nee;
    if (type == "labs") {
      nee = dataToSend.investigations.filter(
        (item) => item.type == 0 || item.type == null
      );
    } else {
      nee = dataToSend.investigations.filter((item) => item.type == 1);
    }
    nee[index] = { ...nee[index], note: e.target.value, note_added: true };
    console.log(nee[index]);
    if (type == "labs") {
      nee.push(...dataToSend.investigations.filter((item) => item.type == 1));
    } else {
      nee.push(
        ...dataToSend.investigations.filter(
          (item) => item.type == 0 || item.type == null
        )
      );
    }
    console.log(nee, 11);
    setDataToSend({
      ...dataToSend,
      investigations: nee,
    });
  };
  const handleLabsRemoval = async (id) => {
    try {
      const response = await fetch(
        `${apiUrl}/patients/${patient.id}/visits/${
          Object.keys(dataToChange).length != 0
            ? dataToChange.id
            : dataToSend.visit_id
        }/labs/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const responseData = await response.json();
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleInvestigationsRemoval = (index, id, type) => {
    let nee;
    if (type == "labs") {
      nee = dataToSend.investigations.filter(
        (item) => item.type == 0 || item.type == null
      );
    } else {
      nee = dataToSend.investigations.filter((item) => item.type == 1);
    }
    nee.splice(index, 1);
    if (type == "labs") {
      nee.push(...dataToSend.investigations.filter((item) => item.type == 1));
    } else {
      nee.push(
        ...dataToSend.investigations.filter(
          (item) => item.type == 0 || item.type == null
        )
      );
    }
    setDataToSend({
      ...dataToSend,
      investigations: nee,
    });
    handleLabsRemoval(id);
  };
  console.log(dataToSend);

  const handleMultipleFilesReading = async (file) => {
    return new Promise((resolve, reject) => {
      let fr = new FileReader();

      fr.onload = async function (event) {
        resolve({
          image: await (await fetch(event.target.result)).blob(),
          received: true,
        });
      };
      fr.readAsDataURL(file);
    });
  };
  const handleFileChange = (e, index, type) => {
    // let value = URL.createObjectURL(e.target.files[0]);
    // console.log(e.target.files[0].path);
    // const invx = [...dataToSend.investigations];
    // invx[index].invx_path = e.target.files[0].path;
    // document.getElementById(
    //   `labs-${dataToSend.investigations[index].invx_id}`
    // ).elements[0].value = e.target.files[0];
    // setDataToSend({
    //   ...dataToSend,
    //   investigations: invx,
    // });
    let nee;
    if (type == "labs") {
      nee = dataToSend.investigations.filter(
        (item) => item.type == 0 || item.type == null
      );
    } else {
      nee = dataToSend.investigations.filter((item) => item.type == 1);
    }
    let files = e.target.files; //FileList object
    Promise.all(Array.from(files).map(handleMultipleFilesReading))
      .then((urls) => {
        setShowDelete(false);
        nee[index] = {
          ...nee[index],
          uploaded: 1,
          photos: nee[index].photos.concat(...urls),
          received: true,
        };
        setPhotos(nee[index].photos);
        if (type == "labs") {
          nee.push(
            ...dataToSend.investigations.filter((item) => item.type == 1)
          );
        } else {
          nee.push(
            ...dataToSend.investigations.filter(
              (item) => item.type == 0 || item.type == null
            )
          );
        }
        setDataToSend({
          ...dataToSend,
          investigations: nee,
        });
      })
      .catch((error) => {
        console.error(error);
      });

    // const filesArray = Array.from(e.target.files).map((file) =>
    //   URL.createObjectURL(file)
    // );

    // console.log("filesArray: ", filesArray);

    // setPhotos((prevImages) => prevImages.concat(...e.target.files));
    // Array.from(e.target.files).map(
    //   (file) => URL.revokeObjectURL(file) // avoid memory leak
    // );
  };
  const getInvxNum = async (invx_id) => {
    try {
      const response = await fetch(`${apiUrl}/labs/${invx_id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          CacheControl: "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
          Expires: 0,
        },
        cache: "reload",
      });

      const responseData = await response.json();
      let result = [];
      for (let i = 0; i < responseData.num_files + 1; i++) {
        result = result.concat({ image: await getFile(invx_id, i), num: i });
      }
      setPhotos(result);
    } catch (error) {
      console.log(error.message);
    }
  };
  console.log(photos);
  const getFile = async (invx_id, num) => {
    try {
      const response = await fetch(`${apiUrl}/labs/${invx_id}?num=${num}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          CacheControl: "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
          Expires: 0,
        },
        cache: "reload",
      });
      const responsePhoto = await response.blob();
      if (response.code == 500) {
        throw new Error(response);
      }
      return responsePhoto;
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleFileRemoval = async (i, ff) => {
    let formData;
    formData = new FormData();

    formData.append("files_loc", ff);
    formData.append("visit_invx_id", dataToSend.investigations[i].id);

    for (let pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }

    try {
      const response = await fetch(
        `${apiUrl}/patients/${patient.id}/visits/${
          Object.keys(dataToChange).length != 0
            ? dataToChange.id
            : dataToSend.visit_id
        }/labs`,
        {
          method:
            dataToSend.investigations[i].id != undefined ? "PATCH" : "POST",
          // headers: { "Content-Type": "multipart/form-data" },
          body: formData,
        }
      );
      const responseData = await response.json();
      console.log(responseData);
      getInvxNum(dataToSend.investigations[i].id);
    } catch (error) {
      console.log(error.message);
    }
  };
  const removeFile = (file_to_remove, index, invx_index, type) => {
    let nee;
    if (type == "labs") {
      nee = dataToSend.investigations.filter(
        (item) => item.type == 0 || item.type == null
      );
    } else {
      nee = dataToSend.investigations.filter((item) => item.type == 1);
    }

    let neef;
    let pnee = photos;
    console.log(invx_index);
    console.log(dataToSend.investigations[invx_index].files_loc);
    if (dataToSend.investigations[invx_index].files_loc) {
      neef = dataToSend.investigations[invx_index].files_loc;
    } else {
      neef = [];
    }
    if (file_to_remove != undefined) {
      // nee[invx_index] = {
      //   ...nee[invx_index],
      //   files_loc: [...new Set([...neef, file_to_remove])],
      // };
      handleFileRemoval(invx_index, file_to_remove);
    }
  };
  return (
    <Labs
      invx={invx}
      setInvx={setInvx}
      handleCreateInvestigations={handleCreateInvestigations}
      handleInvestigations={handleInvestigations}
      handleEditLabs={handleEditLabs}
      handleInvxNoteChange={handleInvxNoteChange}
      handleLabsRemoval={handleLabsRemoval}
      handleInvestigationsRemoval={handleInvestigationsRemoval}
      handleMultipleFilesReading={handleMultipleFilesReading}
      handleFileChange={handleFileChange}
      getInvxNum={getInvxNum}
      getFile={getFile}
      handleFileRemoval={handleFileRemoval}
      removeFile={removeFile}
      investigations={investigations}
      imaging={imaging}
      dataToSend={dataToSend}
      photos={photos}
      setPhotos={setPhotos}
      startScanning={startScanning}
      setDataToSend={setDataToSend}
      getInvestigations={getInvestigations}
      handleLabsSend={handleLabsSend}
      patient={patient}
      dataToChange={dataToChange}
      setShowDelete={setShowDelete}
      showDelete={showDelete}
    />
  );
}

export default LabsController;
