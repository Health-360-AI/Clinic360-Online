import React from "react";

export default function OpthalmologyVAComponent({
  eye,
  handle_sphere_auto_refraction,
  sphere_auto_refraction,
  handle_cylinder_auto_refraction,
  cylinder_auto_refraction,
  handle_axis_auto_refraction,
  axis_auto_refraction,
  handle_k1,
  k1,
  handle_k1_axis,
  k1_axis,
  handle_k2,
  k2,
  handle_k2_axis,
  k2_axis,
  handle_corneal_astigmatism,
  corneal_astigmatism,
  handle_ucva,
  ucva,
  handle_pinhole,
  pinhole,
  handle_visual_acuity_old,
  visual_acuity_old,
  handle_sphere_old,
  sphere_old,
  handle_cylinder_old,
  cylinder_old,
  handle_axis_old,
  axis_old,
  handle_visual_acuity_manifest_refraction,
  visual_acuity_manifest_refraction,
  handle_sphere_manifest_refraction,
  sphere_manifest_refraction,
  handle_cylinder_manifest_refraction,
  cylinder_manifest_refraction,
  handle_axis_manifest_refraction,
  axis_manifest_refraction,
  handle_visual_acuity_cyclorefraction,
  visual_acuity_cyclorefraction,
  handle_sphere_cyclorefraction,
  sphere_cyclorefraction,
  handle_cylinder_cyclorefraction,
  cylinder_cyclorefraction,
  handle_axis_cyclorefraction,
  axis_cyclorefraction,
  handle_near,
  near,
}) {
  return (
    <div className="row justify-content-center p-0 m-0 text-center">
      <div className="col-12 text-primary">
        <h4>{eye}</h4>
      </div>
      <div className="col-12 pt-2 pb-2">
        <h4>Autorefraction</h4>
      </div>
      <div className="col-8">
        <div className="row">
          <div className="col-4">
            <h5>SPH</h5>
          </div>
          <div className="col-4">
            <h5>CYL</h5>
          </div>
          <div className="col-4">
            <h5>AXIS</h5>
          </div>
        </div>
        <div className="row">
          <div className="col-4">
            <input
              type="text"
              className="form-control form-background"
              onChange={handle_sphere_auto_refraction}
              value={sphere_auto_refraction}
              disabled
            />
          </div>
          <div className="col-4">
            <input
              type="text"
              className="form-control form-background"
              onChange={handle_cylinder_auto_refraction}
              value={cylinder_auto_refraction}
              disabled
            />
          </div>
          <div className="col-4">
            <input
              type="text"
              className="form-control form-background"
              onChange={handle_axis_auto_refraction}
              value={axis_auto_refraction}
              disabled
            />
          </div>
        </div>
      </div>

      <div className="col-12 pt-5 pb-2">
        <h4>K reading</h4>
      </div>
      <div className="col-8">
        <div className="row">
          <label
            htmlFor="oculus_sinister_k1"
            className="col-2 col-form-label mb-2"
          >
            K1
          </label>
          <div className="col-3">
            <input
              type="text"
              className="form-control form-background"
              onChange={handle_k1}
              value={k1}
              disabled
            />
          </div>
          <label
            htmlFor="oculus_sinister_k1_axis"
            className="col-2 col-form-label mb-2"
          >
            Axis
          </label>
          <div className="col-3">
            <input
              type="text"
              className="form-control form-background"
              onChange={handle_k1_axis}
              value={k1_axis}
              disabled
            />
          </div>
        </div>
        <div className="row">
          <label
            htmlFor="oculus_sinister_k2"
            className="col-2 col-form-label mb-2"
          >
            K2
          </label>
          <div className="col-3">
            <input
              type="text"
              className="form-control form-background"
              onChange={handle_k2}
              value={k2}
              disabled
            />
          </div>
          <label
            htmlFor="oculus_sinister_k2_axis"
            className="col-2 col-form-label mb-2"
          >
            Axis
          </label>
          <div className="col-3">
            <input
              type="text"
              className="form-control form-background"
              onChange={handle_k2_axis}
              value={k2_axis}
              disabled
            />
          </div>
        </div>
      </div>
      <div className="col-7 pt-5 pb-2">
        <div className="row">
          <label
            htmlFor="corneal_astigmatism"
            className="col-6 col-form-label mb-2"
          >
            Conreal Astigmatism
          </label>
          <div className="col-4">
            <input
              type="text"
              className="form-control form-background"
              onChange={handle_corneal_astigmatism}
              value={corneal_astigmatism}
              disabled
            />
          </div>
        </div>
        <div className="row">
          <label htmlFor="ucva" className="col-6 col-form-label mb-2">
            UCVA
          </label>
          <div className="col-4">
            <input
              type="text"
              className="form-control form-background"
              onChange={handle_ucva}
              value={ucva}
              disabled
            />
          </div>
        </div>
        <div className="row">
          <label htmlFor="pinhole" className="col-6 col-form-label mb-2">
            PinHole
          </label>
          <div className="col-4">
            <input
              type="text"
              className="form-control form-background"
              onChange={handle_pinhole}
              value={pinhole}
              disabled
            />
          </div>
        </div>
      </div>
      <div className="col-12 pt-2 pb-2">
        <h4>Old Glasses</h4>
      </div>

      <div className="col-8 pb-4">
        <div className="row">
          <div className="col-3">
            <h5>VA</h5>
          </div>
          <div className="col-3">
            <h5>SPH</h5>
          </div>
          <div className="col-3">
            <h5>CYL</h5>
          </div>
          <div className="col-3">
            <h5>AXIS</h5>
          </div>
        </div>
        <div className="row">
          <div className="col-3">
            <input
              type="text"
              className="form-control form-background"
              onChange={handle_visual_acuity_old}
              value={visual_acuity_old}
              disabled
            />
          </div>
          <div className="col-3">
            <input
              type="text"
              className="form-control form-background"
              onChange={handle_sphere_old}
              value={sphere_old}
              disabled
            />
          </div>
          <div className="col-3">
            <input
              type="text"
              className="form-control form-background"
              onChange={handle_cylinder_old}
              value={cylinder_old}
              disabled
            />
          </div>
          <div className="col-3">
            <input
              type="text"
              className="form-control form-background"
              onChange={handle_axis_old}
              value={axis_old}
              disabled
            />
          </div>
        </div>
      </div>
      <div className="col-12 pt-2 pb-2">
        <h4>Manifest refraction</h4>
      </div>
      <div className="col-8 pb-4">
        <div className="row">
          <div className="col-3">
            <h5>VA</h5>
          </div>
          <div className="col-3">
            <h5>SPH</h5>
          </div>
          <div className="col-3">
            <h5>CYL</h5>
          </div>
          <div className="col-3">
            <h5>AXIS</h5>
          </div>
        </div>
        <div className="row">
          <div className="col-3">
            <input
              type="text"
              className="form-control form-background"
              onChange={handle_visual_acuity_manifest_refraction}
              value={visual_acuity_manifest_refraction}
              disabled
            />
          </div>
          <div className="col-3">
            <input
              type="text"
              className="form-control form-background"
              onChange={handle_sphere_manifest_refraction}
              value={sphere_manifest_refraction}
              disabled
            />
          </div>
          <div className="col-3">
            <input
              type="text"
              className="form-control form-background"
              onChange={handle_cylinder_manifest_refraction}
              value={cylinder_manifest_refraction}
              disabled
            />
          </div>
          <div className="col-3">
            <input
              type="text"
              className="form-control form-background"
              onChange={handle_axis_manifest_refraction}
              value={axis_manifest_refraction}
              disabled
            />
          </div>
        </div>
      </div>
      <div className="col-12 pt-2 pb-2">
        <h4>Cycloplegic refraction</h4>
      </div>
      <div className="col-8 pb-2">
        <div className="row">
          <div className="col-3">
            <h5>VA</h5>
          </div>
          <div className="col-3">
            <h5>SPH</h5>
          </div>
          <div className="col-3">
            <h5>CYL</h5>
          </div>
          <div className="col-3">
            <h5>AXIS</h5>
          </div>
        </div>
        <div className="row">
          <div className="col-3">
            <input
              type="text"
              className="form-control form-background"
              onChange={handle_visual_acuity_cyclorefraction}
              value={visual_acuity_cyclorefraction}
              disabled
            />
          </div>
          <div className="col-3">
            <input
              type="text"
              className="form-control form-background"
              onChange={handle_sphere_cyclorefraction}
              value={sphere_cyclorefraction}
              disabled
            />
          </div>
          <div className="col-3">
            <input
              type="text"
              className="form-control form-background"
              onChange={handle_cylinder_cyclorefraction}
              value={cylinder_cyclorefraction}
              disabled
            />
          </div>
          <div className="col-3">
            <input
              type="text"
              className="form-control form-background"
              onChange={handle_axis_cyclorefraction}
              value={axis_cyclorefraction}
              disabled
            />
          </div>
        </div>
      </div>

      <div className="col-7 pt-2">
        <div className="row">
          <label
            htmlFor="near"
            className="col-6 col-form-label mb-2 opthalmology-font-size"
          >
            Near
          </label>
          <div className="col-4 pt-2">
            <input
              type="text"
              className="form-control form-background"
              onChange={handle_near}
              value={near}
              disabled
            />
          </div>
        </div>
      </div>
    </div>
  );
}
