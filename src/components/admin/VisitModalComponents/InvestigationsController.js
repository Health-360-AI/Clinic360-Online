import React from "react";
import Investigations from "./Investigations";
const apiUrl = process.env.API_URL;

function InvestigationsController({
  dataToSend,
  setDataToSend,
  getInvestigations,
  investigations,
  setInvx,
  showDelete,
  setShowDelete,
  patient,
  dataToChange,
  imaging,
  photos,
  setPhotos,
  startScanning,
  getInvxNum,
}) {
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
        nee[index] = {
          ...nee[index],
          uploaded: 1,
          photos: nee[index].photos.concat(...urls),
          received: true,
        };
        setShowDelete(false);
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
  };

  console.log(photos);
  return (
    <Investigations
      dataToSend={dataToSend}
      investigations={investigations}
      imaging={imaging}
      handleInvestigations={handleInvestigations}
      handleEditLabs={handleEditLabs}
      handleInvxNoteChange={handleInvxNoteChange}
      handleInvestigationsRemoval={handleInvestigationsRemoval}
      setInvx={setInvx}
      showDelete={showDelete}
      handleFileChange={handleFileChange}
      getInvxNum={getInvxNum}
      setPhotos={setPhotos}
      startScanning={startScanning}
    />
  );
}

export default InvestigationsController;
