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
        />
      </div>
      <div className="col-9 pt-4">
        <input
          type="text"
          className="form-control form-background"
          onChange={handle_ant_segment}
          value={ant_segment}
        />
      </div>
      <div className="col-9 pt-4">
        <input
          type="text"
          className="form-control form-background"
          onChange={handle_post_segment}
          value={post_segment}
        />
      </div>
      <div className="col-9 pt-4">
        <input
          type="text"
          className="form-control form-background"
          onChange={handle_orbits}
          value={orbits}
        />
      </div>
      <div className="col-9 pt-4">
        <input
          type="text"
          className="form-control form-background"
          onChange={handle_eyelids}
          value={eyelids}
        />
      </div>
      <div className="col-9 pt-4">
        <input
          type="text"
          className="form-control form-background"
          onChange={handle_ocular_alignment_and_motility}
          value={ocular_alignment_and_motility}
        />
      </div>
      <div className="col-9 pt-4">
        <input
          type="text"
          className="form-control form-background"
          onChange={handle_pupils}
          value={pupils}
        />
      </div>
      <div className="col-9 pt-4">
        <input
          type="text"
          className="form-control form-background"
          onChange={handle_lacrimal_apparatus}
          value={lacrimal_apparatus}
        />
      </div>
      <div className="col-9 pt-4">
        <input
          type="text"
          className="form-control form-background"
          onChange={handle_eyelashes_and_lid_margin}
          value={eyelashes_and_lid_margin}
        />
      </div>
      <div className="col-9 pt-4">
        <input
          type="text"
          className="form-control form-background"
          onChange={handle_conjunctiva}
          value={conjunctiva}
        />
      </div>
      <div className="col-9 pt-4">
        <input
          type="text"
          className="form-control form-background"
          onChange={handle_sclera}
          value={sclera}
        />
      </div>
      <div className="col-9 pt-4">
        <input
          type="text"
          className="form-control form-background"
          onChange={handle_tear_film}
          value={tear_film}
        />
      </div>
      <div className="col-9 pt-4">
        <input
          type="text"
          className="form-control form-background"
          onChange={handle_cornea}
          value={cornea}
        />
      </div>
      <div className="col-9 pt-4">
        <input
          type="text"
          className="form-control form-background"
          onChange={handle_ant_chamber}
          value={ant_chamber}
        />
      </div>
      <div className="col-9 pt-4">
        <input
          type="text"
          className="form-control form-background"
          onChange={handle_ant_chamber_angle}
          value={ant_chamber_angle}
        />
      </div>
      <div className="col-9 pt-4">
        <input
          type="text"
          className="form-control form-background"
          onChange={handle_iris_and_pupil}
          value={iris_and_pupil}
        />
      </div>
      <div className="col-9 pt-4">
        <input
          type="text"
          className="form-control form-background"
          onChange={handle_lens}
          value={lens}
        />
      </div>
      <div className="col-9 pt-4">
        <input
          type="text"
          className="form-control form-background"
          onChange={handle_ant_vitreous}
          value={ant_vitreous}
        />
      </div>
      <div className="col-9 pt-4">
        <input
          type="text"
          className="form-control form-background"
          onChange={handle_vitreous}
          value={vitreous}
        />
      </div>
      <div className="col-9 pt-4">
        <input
          type="text"
          className="form-control form-background"
          onChange={handle_optic_disc}
          value={optic_disc}
        />
      </div>
      <div className="col-9 pt-4">
        <input
          type="text"
          className="form-control form-background"
          onChange={handle_macula_and_fovea}
          value={macula_and_fovea}
        />
      </div>
      <div className="col-9 pt-4">
        <input
          type="text"
          className="form-control form-background"
          onChange={handle_retinal_vasculature}
          value={retinal_vasculature}
        />
      </div>
      <div className="col-9 pt-4">
        <input
          type="text"
          className="form-control form-background"
          onChange={handle_peripheral_retina}
          value={peripheral_retina}
        />
      </div>
    </div>
  );
}
