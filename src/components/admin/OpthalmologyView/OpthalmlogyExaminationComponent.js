import React from "react";

export default function OpthalmlogyExaminationComponent({
  eye,
  handle_external,
  external,
  handle_ant_segment,
  ant_segment,
  handle_post_segment,
  post_segment,
  handle_orbits,
  orbits,
  handle_eyelids,
  eyelids,
  handle_ocular_alignment_and_motility,
  ocular_alignment_and_motility,
  handle_pupils,
  pupils,
  handle_lacrimal_apparatus,
  lacrimal_apparatus,
  handle_eyelashes_and_lid_margin,
  eyelashes_and_lid_margin,
  handle_conjunctiva,
  conjunctiva,
  handle_sclera,
  sclera,
  handle_tear_film,
  tear_film,
  handle_cornea,
  cornea,
  handle_ant_chamber,
  ant_chamber,
  handle_ant_chamber_angle,
  ant_chamber_angle,
  handle_iris_and_pupil,
  iris_and_pupil,
  handle_lens,
  lens,
  handle_ant_vitreous,
  ant_vitreous,
  handle_vitreous,
  vitreous,
  handle_optic_disc,
  optic_disc,
  handle_macula_and_fovea,
  macula_and_fovea,
  handle_retinal_vasculature,
  retinal_vasculature,
  handle_peripheral_retina,
  peripheral_retina,
}) {
  return (
    <div className="row justify-content-center p-0 m-0 text-center">
      <div className="col-12 text-primary">
        <h4>{eye}</h4>
      </div>

      <div className="col-9 pt-2">
        <input
          type="text"
          className="form-control form-background"
          onChange={handle_external}
          value={external}
          disabled
        />
      </div>
      <div className="col-9 pt-4">
        <input
          type="text"
          className="form-control form-background"
          onChange={handle_ant_segment}
          value={ant_segment}
          disabled
        />
      </div>
      <div className="col-9 pt-4">
        <input
          type="text"
          className="form-control form-background"
          onChange={handle_post_segment}
          value={post_segment}
          disabled
        />
      </div>
      <div className="col-9 pt-4">
        <input
          type="text"
          className="form-control form-background"
          onChange={handle_orbits}
          value={orbits}
          disabled
        />
      </div>
      <div className="col-9 pt-4">
        <input
          type="text"
          className="form-control form-background"
          onChange={handle_eyelids}
          value={eyelids}
          disabled
        />
      </div>
      <div className="col-9 pt-4">
        <input
          type="text"
          className="form-control form-background"
          onChange={handle_ocular_alignment_and_motility}
          value={ocular_alignment_and_motility}
          disabled
        />
      </div>
      <div className="col-9 pt-4">
        <input
          type="text"
          className="form-control form-background"
          onChange={handle_pupils}
          value={pupils}
          disabled
        />
      </div>
      <div className="col-9 pt-4">
        <input
          type="text"
          className="form-control form-background"
          onChange={handle_lacrimal_apparatus}
          value={lacrimal_apparatus}
          disabled
        />
      </div>
      <div className="col-9 pt-4">
        <input
          type="text"
          className="form-control form-background"
          onChange={handle_eyelashes_and_lid_margin}
          value={eyelashes_and_lid_margin}
          disabled
        />
      </div>
      <div className="col-9 pt-4">
        <input
          type="text"
          className="form-control form-background"
          onChange={handle_conjunctiva}
          value={conjunctiva}
          disabled
        />
      </div>
      <div className="col-9 pt-4">
        <input
          type="text"
          className="form-control form-background"
          onChange={handle_sclera}
          value={sclera}
          disabled
        />
      </div>
      <div className="col-9 pt-4">
        <input
          type="text"
          className="form-control form-background"
          onChange={handle_tear_film}
          value={tear_film}
          disabled
        />
      </div>
      <div className="col-9 pt-4">
        <input
          type="text"
          className="form-control form-background"
          onChange={handle_cornea}
          value={cornea}
          disabled
        />
      </div>
      <div className="col-9 pt-4">
        <input
          type="text"
          className="form-control form-background"
          onChange={handle_ant_chamber}
          value={ant_chamber}
          disabled
        />
      </div>
      <div className="col-9 pt-4">
        <input
          type="text"
          className="form-control form-background"
          onChange={handle_ant_chamber_angle}
          value={ant_chamber_angle}
          disabled
        />
      </div>
      <div className="col-9 pt-4">
        <input
          type="text"
          className="form-control form-background"
          onChange={handle_iris_and_pupil}
          value={iris_and_pupil}
          disabled
        />
      </div>
      <div className="col-9 pt-4">
        <input
          type="text"
          className="form-control form-background"
          onChange={handle_lens}
          value={lens}
          disabled
        />
      </div>
      <div className="col-9 pt-4">
        <input
          type="text"
          className="form-control form-background"
          onChange={handle_ant_vitreous}
          value={ant_vitreous}
          disabled
        />
      </div>
      <div className="col-9 pt-4">
        <input
          type="text"
          className="form-control form-background"
          onChange={handle_vitreous}
          value={vitreous}
          disabled
        />
      </div>
      <div className="col-9 pt-4">
        <input
          type="text"
          className="form-control form-background"
          onChange={handle_optic_disc}
          value={optic_disc}
          disabled
        />
      </div>
      <div className="col-9 pt-4">
        <input
          type="text"
          className="form-control form-background"
          onChange={handle_macula_and_fovea}
          value={macula_and_fovea}
          disabled
        />
      </div>
      <div className="col-9 pt-4">
        <input
          type="text"
          className="form-control form-background"
          onChange={handle_retinal_vasculature}
          value={retinal_vasculature}
          disabled
        />
      </div>
      <div className="col-9 pt-4">
        <input
          type="text"
          className="form-control form-background"
          onChange={handle_peripheral_retina}
          value={peripheral_retina}
          disabled
        />
      </div>
    </div>
  );
}
