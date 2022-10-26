import React from "react";

function Labs({ selectedVisit, setInvx, getInvxNum }) {
  return (
    <div className="row justify-content-center p-0 m-0">
      <div className="col-12 text-center mb-2">
        <h2 className="visit-header">Investigations</h2>
      </div>
      <div className="col-12 mb-4">
        {selectedVisit.investigations.map((item, index) => {
          return (
            <form
              className="row m-0 mt-4"
              name={`labs-${item.invx_id}`}
              id={`labs-${item.invx_id}`}
              key={item.invx_id}
            >
              <div className="row justify-content-center">
                <label
                  className="col-1 col-form-label text-center mb-2 visit-note"
                  onClick={() => {
                    setInvx({
                      id: item.invx_id,
                      name: item.name,
                      fileModalShow: true,
                    });
                    getInvxNum(item.id, index);
                  }}
                >
                  {item.name}
                </label>
              </div>
            </form>
          );
        })}
      </div>
    </div>
  );
}

export default Labs;
