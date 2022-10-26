import React from "react";
import CreatableSelect from "react-select/creatable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

function Investigations({
  dataToSend,
  investigations,
  imaging,
  handleInvestigations,
  handleEditLabs,
  handleInvxNoteChange,
  handleInvestigationsRemoval,
  handleFileChange,
  setInvx,showDelete,
  getInvxNum,
  setPhotos,
  startScanning,
}) {
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Scan
    </Tooltip>
  );
  return (
    <>
      <div className="col-12 text-center mb-2">
        <h2 className="visit-header">Investigations</h2>
      </div>
      <div className="col-12 mb-4">
        <div className="form-group row justify-content-center mb-3">
          <div className="col-2">
            <CreatableSelect
              className="react-select-container"
              classNamePrefix="react-select"
              isClearable={true}
              onChange={(item, action) =>
                handleInvestigations(item, action, "labs")
              }
              getOptionLabel={(option) =>
                option.__isNew__ ? option.label : option.name
              }
              getOptionValue={(option) =>
                option.__isNew__ ? option.value : option.id
              }
              value={null}
              options={investigations}
            />
          </div>
        </div>
        {dataToSend.investigations
          .filter((item) => item.type == 0 || item.type == null)
          .map((item, index) => {
            return (
              <>
                <div
                  className={`row justify-content-center ${
                    !Boolean(item.uploaded) && "d-none"
                  }`}
                  // style={{ display: item.uploaded && "flex" }}
                >
                  <label
                    className="col-1 col-form-label text-center mb-2 visit-note"
                    onClick={() => {
                      setInvx({
                        id: item.id,
                        name: item.name,
                        fileModalShow: true,
                        index: index,
                        type: "labs",
                      });
                      setPhotos(item.photos ? item.photos : []);
                      if (showDelete) {
                        getInvxNum(item.id);
                      }
                    }}
                  >
                    {item.name}
                  </label>
                  <div className="col-2">
                    <input
                      type="text"
                      name="note"
                      placeholder="Note"
                      className="form-control form-background"
                      onChange={(e) => handleInvxNoteChange(index, e, "labs")}
                      value={item.note}
                    ></input>
                  </div>
                  <button
                    className="col-1 ms-4 add-button-in-visit"
                    onClick={() => handleEditLabs(index, "labs")}
                  >
                    Edit
                  </button>
                  <button
                    className="col-1 ms-4 add-button-in-visit"
                    onClick={() => {
                      setInvx({
                        id: item.id,
                        name: item.name,
                        fileModalShow: true,
                        index: index,
                        type: "labs",
                      });
                      setPhotos(item.photos ? item.photos : []);
                      if (showDelete) {
                        getInvxNum(item.id);
                      }
                    }}
                  >
                    View
                  </button>
                  <div className="col-1">
                    <OverlayTrigger
                      placement="bottom"
                      delay={{ show: 300, hide: 350 }}
                      overlay={renderTooltip}
                    >
                      <svg
                        className="scanner-btn"
                        viewBox="0, 0, 400,400"
                        onClick={() => startScanning(index, "labs")}
                      >
                        <path
                          className="scanner-btn-path"
                          d="M139.063 33.925 C 134.040 35.712,126.563 44.395,126.639 48.353 C 126.726 52.957,345.732 237.907,352.057 238.719 C 356.771 239.325,364.687 229.198,364.687 222.563 C 364.687 201.559,226.128 77.462,166.406 44.977 C 146.379 34.083,142.744 32.614,139.063 33.925 M39.343 252.628 C 27.094 258.664,21.205 281.626,25.726 305.722 C 27.079 312.935,37.155 322.938,44.444 324.305 L 50.000 325.348 50.000 333.839 C 50.000 340.770,50.704 343.034,53.835 346.165 L 57.670 350.000 200.000 350.000 L 342.330 350.000 346.165 346.165 C 349.296 343.034,350.000 340.770,350.000 333.839 L 350.000 325.348 355.556 324.305 C 362.845 322.938,372.921 312.935,374.274 305.722 C 378.838 281.394,372.856 258.475,360.399 252.564 C 352.147 248.648,47.296 248.709,39.343 252.628 M83.665 266.335 C 91.415 274.086,85.923 287.500,75.000 287.500 C 68.576 287.500,62.500 281.424,62.500 275.000 C 62.500 268.576,68.576 262.500,75.000 262.500 C 78.044 262.500,81.247 263.918,83.665 266.335 M121.165 266.335 C 123.582 268.753,125.000 271.956,125.000 275.000 C 125.000 278.044,123.582 281.247,121.165 283.665 C 118.747 286.082,115.544 287.500,112.500 287.500 C 109.456 287.500,106.253 286.082,103.835 283.665 C 101.418 281.247,100.000 278.044,100.000 275.000 C 100.000 271.956,101.418 268.753,103.835 266.335 C 106.253 263.918,109.456 262.500,112.500 262.500 C 115.544 262.500,118.747 263.918,121.165 266.335 M158.665 266.335 C 161.082 268.753,162.500 271.956,162.500 275.000 C 162.500 278.044,161.082 281.247,158.665 283.665 C 156.247 286.082,153.044 287.500,150.000 287.500 C 146.956 287.500,143.753 286.082,141.335 283.665 C 138.918 281.247,137.500 278.044,137.500 275.000 C 137.500 271.956,138.918 268.753,141.335 266.335 C 143.753 263.918,146.956 262.500,150.000 262.500 C 153.044 262.500,156.247 263.918,158.665 266.335 "
                        ></path>
                      </svg>
                    </OverlayTrigger>
                  </div>
                </div>
                <form
                  className={`row m-0 mt-4 ${
                    Boolean(item.uploaded) && "d-none"
                  }`}
                  name={`labs-${item.invx_id}`}
                  id={`labs-${item.invx_id}`}
                  key={item.invx_id}
                  // style={{ display: !item.uploaded && "none" }}
                >
                  <div className="row justify-content-center">
                    <label
                      className="col-1 col-form-label text-center mb-2 visit-note"
                      onClick={() => {
                        setInvx({
                          id: item.invx_id,
                          name: item.name,
                          fileModalShow: true,
                          index: index,
                          type: "labs",
                        });
                        setPhotos(item.photos ? item.photos : []);
                        if (showDelete) {
                          getInvxNum(item.id);
                        }
                      }}
                    >
                      {item.name}
                    </label>
                    <div className="col-2">
                      <input
                        type="file"
                        name="file"
                        placeholder="already Added"
                        className="form-control form-background"
                        required
                        dir="rtl"
                        draggable
                        onChange={(e) => handleFileChange(e, index, "labs")}
                        multiple
                      ></input>
                    </div>
                    <div className="col-2">
                      <input
                        type="text"
                        name="note"
                        placeholder="Note"
                        className="form-control form-background"
                        onChange={(e) => handleInvxNoteChange(index, e, "labs")}
                        value={item.note}
                      ></input>
                    </div>
                    <div className="col-1">
                      <div className="row">
                        <div className="col-6">
                          <OverlayTrigger
                            placement="bottom"
                            delay={{ show: 300, hide: 350 }}
                            overlay={renderTooltip}
                          >
                            <svg
                              className="scanner-btn"
                              viewBox="0, 0, 400,400"
                              onClick={() => startScanning(index, "labs")}
                            >
                              <path
                                className="scanner-btn-path"
                                d="M139.063 33.925 C 134.040 35.712,126.563 44.395,126.639 48.353 C 126.726 52.957,345.732 237.907,352.057 238.719 C 356.771 239.325,364.687 229.198,364.687 222.563 C 364.687 201.559,226.128 77.462,166.406 44.977 C 146.379 34.083,142.744 32.614,139.063 33.925 M39.343 252.628 C 27.094 258.664,21.205 281.626,25.726 305.722 C 27.079 312.935,37.155 322.938,44.444 324.305 L 50.000 325.348 50.000 333.839 C 50.000 340.770,50.704 343.034,53.835 346.165 L 57.670 350.000 200.000 350.000 L 342.330 350.000 346.165 346.165 C 349.296 343.034,350.000 340.770,350.000 333.839 L 350.000 325.348 355.556 324.305 C 362.845 322.938,372.921 312.935,374.274 305.722 C 378.838 281.394,372.856 258.475,360.399 252.564 C 352.147 248.648,47.296 248.709,39.343 252.628 M83.665 266.335 C 91.415 274.086,85.923 287.500,75.000 287.500 C 68.576 287.500,62.500 281.424,62.500 275.000 C 62.500 268.576,68.576 262.500,75.000 262.500 C 78.044 262.500,81.247 263.918,83.665 266.335 M121.165 266.335 C 123.582 268.753,125.000 271.956,125.000 275.000 C 125.000 278.044,123.582 281.247,121.165 283.665 C 118.747 286.082,115.544 287.500,112.500 287.500 C 109.456 287.500,106.253 286.082,103.835 283.665 C 101.418 281.247,100.000 278.044,100.000 275.000 C 100.000 271.956,101.418 268.753,103.835 266.335 C 106.253 263.918,109.456 262.500,112.500 262.500 C 115.544 262.500,118.747 263.918,121.165 266.335 M158.665 266.335 C 161.082 268.753,162.500 271.956,162.500 275.000 C 162.500 278.044,161.082 281.247,158.665 283.665 C 156.247 286.082,153.044 287.500,150.000 287.500 C 146.956 287.500,143.753 286.082,141.335 283.665 C 138.918 281.247,137.500 278.044,137.500 275.000 C 137.500 271.956,138.918 268.753,141.335 266.335 C 143.753 263.918,146.956 262.500,150.000 262.500 C 153.044 262.500,156.247 263.918,158.665 266.335 "
                              ></path>
                            </svg>
                          </OverlayTrigger>
                        </div>
                        <div className="col-6">
                          <FontAwesomeIcon
                            icon="times-circle"
                            size="2x"
                            className="delete-button-morehx"
                            onClick={() =>
                              handleInvestigationsRemoval(
                                index,
                                item.id,
                                "labs"
                              )
                            }
                          ></FontAwesomeIcon>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </>
            );
          })}
      </div>
      <div className="col-12 text-center mb-2">
        <h2 className="visit-header">Imaging</h2>
      </div>
      <div className="col-12 mb-4">
        <div className="form-group row justify-content-center mb-3">
          <div className="col-2">
            <CreatableSelect
              className="react-select-container"
              classNamePrefix="react-select"
              isClearable={true}
              onChange={(item, action) =>
                handleInvestigations(item, action, "imaging")
              }
              getOptionLabel={(option) =>
                option.__isNew__ ? option.label : option.name
              }
              getOptionValue={(option) =>
                option.__isNew__ ? option.value : option.id
              }
              value={null}
              options={imaging}
            />
          </div>
        </div>
        {dataToSend.investigations
          .filter((item) => item.type == 1)
          .map((item, index) => {
            return (
              <>
                <div
                  className={`row justify-content-center ${
                    !Boolean(item.uploaded) && "d-none"
                  }`}
                  // style={{ display: item.uploaded && "flex" }}
                >
                  <label
                    className="col-1 col-form-label text-center mb-2 visit-note"
                    onClick={() => {
                      setInvx({
                        id: item.id,
                        name: item.name,
                        fileModalShow: true,
                        index: index,
                        type: "imaging",
                      });
                      setPhotos(item.photos ? item.photos : []);
                      if (showDelete) {
                        getInvxNum(item.id);
                      }
                    }}
                  >
                    {item.name}
                  </label>
                  <div className="col-2">
                    <input
                      type="text"
                      name="note"
                      placeholder="Note"
                      className="form-control form-background"
                      onChange={(e) =>
                        handleInvxNoteChange(index, e, "imaging")
                      }
                      value={item.note}
                    ></input>
                  </div>
                  <button
                    className="col-1 ms-4 add-button-in-visit"
                    onClick={() => handleEditLabs(index, "imaging")}
                  >
                    Edit
                  </button>
                  <button
                    className="col-1 ms-4 add-button-in-visit"
                    onClick={() => {
                      setInvx({
                        id: item.id,
                        name: item.name,
                        fileModalShow: true,
                        index: index,
                        type: "imaging",
                      });
                      setPhotos(item.photos ? item.photos : []);
                      if (showDelete) {
                        getInvxNum(item.id);
                      }
                    }}
                  >
                    View
                  </button>
                  <div className="col-1">
                    <OverlayTrigger
                      placement="bottom"
                      delay={{ show: 300, hide: 350 }}
                      overlay={renderTooltip}
                    >
                      <svg
                        className="scanner-btn"
                        viewBox="0, 0, 400,400"
                        onClick={() => startScanning(index, "imaging")}
                      >
                        <path
                          className="scanner-btn-path"
                          d="M139.063 33.925 C 134.040 35.712,126.563 44.395,126.639 48.353 C 126.726 52.957,345.732 237.907,352.057 238.719 C 356.771 239.325,364.687 229.198,364.687 222.563 C 364.687 201.559,226.128 77.462,166.406 44.977 C 146.379 34.083,142.744 32.614,139.063 33.925 M39.343 252.628 C 27.094 258.664,21.205 281.626,25.726 305.722 C 27.079 312.935,37.155 322.938,44.444 324.305 L 50.000 325.348 50.000 333.839 C 50.000 340.770,50.704 343.034,53.835 346.165 L 57.670 350.000 200.000 350.000 L 342.330 350.000 346.165 346.165 C 349.296 343.034,350.000 340.770,350.000 333.839 L 350.000 325.348 355.556 324.305 C 362.845 322.938,372.921 312.935,374.274 305.722 C 378.838 281.394,372.856 258.475,360.399 252.564 C 352.147 248.648,47.296 248.709,39.343 252.628 M83.665 266.335 C 91.415 274.086,85.923 287.500,75.000 287.500 C 68.576 287.500,62.500 281.424,62.500 275.000 C 62.500 268.576,68.576 262.500,75.000 262.500 C 78.044 262.500,81.247 263.918,83.665 266.335 M121.165 266.335 C 123.582 268.753,125.000 271.956,125.000 275.000 C 125.000 278.044,123.582 281.247,121.165 283.665 C 118.747 286.082,115.544 287.500,112.500 287.500 C 109.456 287.500,106.253 286.082,103.835 283.665 C 101.418 281.247,100.000 278.044,100.000 275.000 C 100.000 271.956,101.418 268.753,103.835 266.335 C 106.253 263.918,109.456 262.500,112.500 262.500 C 115.544 262.500,118.747 263.918,121.165 266.335 M158.665 266.335 C 161.082 268.753,162.500 271.956,162.500 275.000 C 162.500 278.044,161.082 281.247,158.665 283.665 C 156.247 286.082,153.044 287.500,150.000 287.500 C 146.956 287.500,143.753 286.082,141.335 283.665 C 138.918 281.247,137.500 278.044,137.500 275.000 C 137.500 271.956,138.918 268.753,141.335 266.335 C 143.753 263.918,146.956 262.500,150.000 262.500 C 153.044 262.500,156.247 263.918,158.665 266.335 "
                        ></path>
                      </svg>
                    </OverlayTrigger>
                  </div>
                </div>
                <form
                  className={`row m-0 mt-4 ${
                    Boolean(item.uploaded) && "d-none"
                  }`}
                  name={`labs-${item.invx_id}`}
                  id={`labs-${item.invx_id}`}
                  key={item.invx_id}
                  // style={{ display: !item.uploaded && "none" }}
                >
                  <div className="row justify-content-center">
                    <label
                      className="col-1 col-form-label text-center mb-2 visit-note"
                      onClick={() => {
                        setInvx({
                          id: item.invx_id,
                          name: item.name,
                          fileModalShow: true,
                          index: index,
                          type: "imaging",
                        });
                        setPhotos(item.photos ? item.photos : []);
                        if (showDelete) {
                          getInvxNum(item.id);
                        }
                      }}
                    >
                      {item.name}
                    </label>
                    <div className="col-2">
                      <input
                        type="file"
                        name="file"
                        placeholder="already Added"
                        className="form-control form-background"
                        required
                        dir="rtl"
                        draggable
                        onChange={(e) => handleFileChange(e, index, "imaging")}
                        multiple
                      ></input>
                    </div>
                    <div className="col-2">
                      <input
                        type="text"
                        name="note"
                        placeholder="Note"
                        className="form-control form-background"
                        onChange={(e) =>
                          handleInvxNoteChange(index, e, "imaging")
                        }
                        value={item.note}
                      ></input>
                    </div>
                    <div className="col-1">
                      <div className="row">
                        <div className="col-6">
                          <OverlayTrigger
                            placement="bottom"
                            delay={{ show: 300, hide: 350 }}
                            overlay={renderTooltip}
                          >
                            <svg
                              className="scanner-btn"
                              viewBox="0, 0, 400,400"
                              onClick={() => startScanning(index, "imaging")}
                            >
                              <path
                                className="scanner-btn-path"
                                d="M139.063 33.925 C 134.040 35.712,126.563 44.395,126.639 48.353 C 126.726 52.957,345.732 237.907,352.057 238.719 C 356.771 239.325,364.687 229.198,364.687 222.563 C 364.687 201.559,226.128 77.462,166.406 44.977 C 146.379 34.083,142.744 32.614,139.063 33.925 M39.343 252.628 C 27.094 258.664,21.205 281.626,25.726 305.722 C 27.079 312.935,37.155 322.938,44.444 324.305 L 50.000 325.348 50.000 333.839 C 50.000 340.770,50.704 343.034,53.835 346.165 L 57.670 350.000 200.000 350.000 L 342.330 350.000 346.165 346.165 C 349.296 343.034,350.000 340.770,350.000 333.839 L 350.000 325.348 355.556 324.305 C 362.845 322.938,372.921 312.935,374.274 305.722 C 378.838 281.394,372.856 258.475,360.399 252.564 C 352.147 248.648,47.296 248.709,39.343 252.628 M83.665 266.335 C 91.415 274.086,85.923 287.500,75.000 287.500 C 68.576 287.500,62.500 281.424,62.500 275.000 C 62.500 268.576,68.576 262.500,75.000 262.500 C 78.044 262.500,81.247 263.918,83.665 266.335 M121.165 266.335 C 123.582 268.753,125.000 271.956,125.000 275.000 C 125.000 278.044,123.582 281.247,121.165 283.665 C 118.747 286.082,115.544 287.500,112.500 287.500 C 109.456 287.500,106.253 286.082,103.835 283.665 C 101.418 281.247,100.000 278.044,100.000 275.000 C 100.000 271.956,101.418 268.753,103.835 266.335 C 106.253 263.918,109.456 262.500,112.500 262.500 C 115.544 262.500,118.747 263.918,121.165 266.335 M158.665 266.335 C 161.082 268.753,162.500 271.956,162.500 275.000 C 162.500 278.044,161.082 281.247,158.665 283.665 C 156.247 286.082,153.044 287.500,150.000 287.500 C 146.956 287.500,143.753 286.082,141.335 283.665 C 138.918 281.247,137.500 278.044,137.500 275.000 C 137.500 271.956,138.918 268.753,141.335 266.335 C 143.753 263.918,146.956 262.500,150.000 262.500 C 153.044 262.500,156.247 263.918,158.665 266.335 "
                              ></path>
                            </svg>
                          </OverlayTrigger>
                        </div>
                        <div className="col-6">
                          <FontAwesomeIcon
                            icon="times-circle"
                            size="2x"
                            className="delete-button-morehx"
                            onClick={() =>
                              handleInvestigationsRemoval(
                                index,
                                item.id,
                                "imaging"
                              )
                            }
                          ></FontAwesomeIcon>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </>
            );
          })}
      </div>
    </>
  );
}

export default Investigations;
