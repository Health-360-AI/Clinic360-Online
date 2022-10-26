import React from "react";

function NutritionComponent({
  epigastric_radius,
  umbilical_radius,
  hypogastric_radius,
  pelvic_radius,
  thigh_radius,
  metabolism,
  fats_percentage,
  muscles_percentage,
  calories,
  body_age,
  organic_fats,
}) {
  return (
    <div className="col-8">
      <div className="row m-0 pt-5 pb-5 justify-content-center">
        <h2 className="text-center">Nutritional Info.</h2>
        <div className="col-4">
          <div className="form-group row mt-2">
            <label
              htmlFor="epigastric_radius"
              className="col-6 col-form-label text-start mb-2"
            >
              Epigastric Radius
            </label>
            <div className="col-6 mt-2">
              <p>{epigastric_radius}</p>
            </div>
          </div>
          <div className="form-group row mt-2">
            <label
              htmlFor="umbilical_radius"
              className="col-6 col-form-label text-start mb-2"
            >
              Umbilical Radius
            </label>
            <div className="col-6 mt-2">
              <p>{umbilical_radius}</p>
            </div>
          </div>
          <div className="form-group row mt-2">
            <label
              htmlFor="hypogastric_radius"
              className="col-6 col-form-label text-start mb-2"
            >
              Hypogastric Radius
            </label>
            <div className="col-6 mt-2">
              <p>{hypogastric_radius}</p>
            </div>
          </div>
          <div className="form-group row mt-2">
            <label
              htmlFor="pelvic_radius"
              className="col-6 col-form-label text-start mb-2"
            >
              Pelvic Radius
            </label>
            <div className="col-6 mt-2">
              <p>{pelvic_radius}</p>
            </div>
          </div>
        </div>
        <div className="col-4">
          <div className="form-group row mt-2">
            <label
              htmlFor="thigh_radius"
              className="col-6 col-form-label text-start mb-2"
            >
              Thigh Radius
            </label>
            <div className="col-6 mt-2">
              <p>{thigh_radius}</p>
            </div>
          </div>
          <div className="form-group row mt-2">
            <label
              htmlFor="metabolism"
              className="col-6 col-form-label text-start mb-2"
            >
              Metabolism
            </label>
            <div className="col-6 mt-2">
              <p>{metabolism}</p>
            </div>
          </div>
          <div className="form-group row mt-2">
            <label
              htmlFor="fats_percentage"
              className="col-6 col-form-label text-start mb-2"
            >
              Fats Percentage
            </label>
            <div className="col-6 mt-2">
              <p>{fats_percentage}</p>
            </div>
          </div>
          <div className="form-group row mt-2">
            <label
              htmlFor="muscles_percentage"
              className="col-6 col-form-label text-start mb-2"
            >
              Muscles Percentage
            </label>
            <div className="col-6 mt-2">
              <p>{muscles_percentage}</p>
            </div>
          </div>
        </div>
        <div className="col-4">
          <div className="form-group row mt-2">
            <label
              htmlFor="calories"
              className="col-6 col-form-label text-start mb-2"
            >
              Calories
            </label>
            <div className="col-6 mt-2">
              <p>{calories}</p>
            </div>
          </div>
          <div className="form-group row mt-2">
            <label
              htmlFor="body_age"
              className="col-6 col-form-label text-start mb-2"
            >
              Body Age
            </label>
            <div className="col-6 mt-2">
              <p>{body_age}</p>
            </div>
          </div>
          <div className="form-group row mt-2">
            <label
              htmlFor="organic_fats"
              className="col-6 col-form-label text-start mb-2"
            >
              Organic Fats
            </label>
            <div className="col-6 mt-2">
              <p>{organic_fats}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NutritionComponent;
