import React from "react";
import OpthalmlogyExaminationComponent from "./OpthalmlogyExaminationComponent";

export default function OpthalmologyExamination({
  handle_oculus_sinister_external,
  oculus_sinister_external,
  handle_oculus_sinister_ant_segment,
  oculus_sinister_ant_segment,
  handle_oculus_sinister_post_segment,
  oculus_sinister_post_segment,
  handle_oculus_sinister_orbits,
  oculus_sinister_orbits,
  handle_oculus_sinister_eyelids,
  oculus_sinister_eyelids,
  handle_oculus_sinister_ocular_alignment_and_motility,
  oculus_sinister_ocular_alignment_and_motility,
  handle_oculus_sinister_pupils,
  oculus_sinister_pupils,
  handle_oculus_sinister_lacrimal_apparatus,
  oculus_sinister_lacrimal_apparatus,
  handle_oculus_sinister_eyelashes_and_lid_margin,
  oculus_sinister_eyelashes_and_lid_margin,
  handle_oculus_sinister_conjunctiva,
  oculus_sinister_conjunctiva,
  handle_oculus_sinister_sclera,
  oculus_sinister_sclera,
  handle_oculus_sinister_tear_film,
  oculus_sinister_tear_film,
  handle_oculus_sinister_cornea,
  oculus_sinister_cornea,
  handle_oculus_sinister_ant_chamber,
  oculus_sinister_ant_chamber,
  handle_oculus_sinister_ant_chamber_angle,
  oculus_sinister_ant_chamber_angle,
  handle_oculus_sinister_iris_and_pupil,
  oculus_sinister_iris_and_pupil,
  handle_oculus_sinister_lens,
  oculus_sinister_lens,
  handle_oculus_sinister_ant_vitreous,
  oculus_sinister_ant_vitreous,
  handle_oculus_sinister_vitreous,
  oculus_sinister_vitreous,
  handle_oculus_sinister_optic_disc,
  oculus_sinister_optic_disc,
  handle_oculus_sinister_macula_and_fovea,
  oculus_sinister_macula_and_fovea,
  handle_oculus_sinister_retinal_vasculature,
  oculus_sinister_retinal_vasculature,
  handle_oculus_sinister_peripheral_retina,
  oculus_sinister_peripheral_retina,
  handle_oculus_dextrus_external,
  oculus_dextrus_external,
  handle_oculus_dextrus_ant_segment,
  oculus_dextrus_ant_segment,
  handle_oculus_dextrus_post_segment,
  oculus_dextrus_post_segment,
  handle_oculus_dextrus_orbits,
  oculus_dextrus_orbits,
  handle_oculus_dextrus_eyelids,
  oculus_dextrus_eyelids,
  handle_oculus_dextrus_ocular_alignment_and_motility,
  oculus_dextrus_ocular_alignment_and_motility,
  handle_oculus_dextrus_pupils,
  oculus_dextrus_pupils,
  handle_oculus_dextrus_lacrimal_apparatus,
  oculus_dextrus_lacrimal_apparatus,
  handle_oculus_dextrus_eyelashes_and_lid_margin,
  oculus_dextrus_eyelashes_and_lid_margin,
  handle_oculus_dextrus_conjunctiva,
  oculus_dextrus_conjunctiva,
  handle_oculus_dextrus_sclera,
  oculus_dextrus_sclera,
  handle_oculus_dextrus_tear_film,
  oculus_dextrus_tear_film,
  handle_oculus_dextrus_cornea,
  oculus_dextrus_cornea,
  handle_oculus_dextrus_ant_chamber,
  oculus_dextrus_ant_chamber,
  handle_oculus_dextrus_ant_chamber_angle,
  oculus_dextrus_ant_chamber_angle,
  handle_oculus_dextrus_iris_and_pupil,
  oculus_dextrus_iris_and_pupil,
  handle_oculus_dextrus_lens,
  oculus_dextrus_lens,
  handle_oculus_dextrus_ant_vitreous,
  oculus_dextrus_ant_vitreous,
  handle_oculus_dextrus_vitreous,
  oculus_dextrus_vitreous,
  handle_oculus_dextrus_optic_disc,
  oculus_dextrus_optic_disc,
  handle_oculus_dextrus_macula_and_fovea,
  oculus_dextrus_macula_and_fovea,
  handle_oculus_dextrus_retinal_vasculature,
  oculus_dextrus_retinal_vasculature,
  handle_oculus_dextrus_peripheral_retina,
  oculus_dextrus_peripheral_retina,
}) {
  return (
    <div className="row justify-content-center p-0 m-0 pt-5 mt-4 pb-5 mb-5">
      <div className="col-12 pb-5 mb-5">
        <div className="row justify-content-center">
          <div className="col-3">
            <div
              className="row text-start"
              style={{
                paddingTop: "50px",

                marginBottom: "30px",
              }}
            >
              <h5>External</h5>
            </div>
            <div className="row text-start" style={{ marginBottom: "30px" }}>
              <h5>Anterior segment</h5>
            </div>
            <div className="row text-start" style={{ marginBottom: "30px" }}>
              <h5>Posterior segment</h5>
            </div>
            <div className="row text-start" style={{ marginBottom: "30px" }}>
              <h5>Orbits</h5>
            </div>
            <div className="row text-start" style={{ marginBottom: "30px" }}>
              <h5>Eyelids</h5>
            </div>
            <div className="row text-start" style={{ marginBottom: "30px" }}>
              <h5>Ocular alig. & motility</h5>
            </div>
            <div className="row text-start" style={{ marginBottom: "30px" }}>
              <h5>Pupils</h5>
            </div>
            <div className="row text-start" style={{ marginBottom: "30px" }}>
              <h5>Lacrimal apparatus</h5>
            </div>
            <div className="row text-start" style={{ marginBottom: "30px" }}>
              <h5>Eyelashes & lid margin</h5>
            </div>
            <div className="row text-start" style={{ marginBottom: "30px" }}>
              <h5>Conjunctiva</h5>
            </div>
            <div className="row text-start" style={{ marginBottom: "30px" }}>
              <h5>Sclera</h5>
            </div>
            <div className="row text-start" style={{ marginBottom: "30px" }}>
              <h5>Tear film</h5>
            </div>
            <div className="row text-start" style={{ marginBottom: "30px" }}>
              <h5>Cornea</h5>
            </div>
            <div className="row text-start" style={{ marginBottom: "30px" }}>
              <h5>Anterior chamber</h5>
            </div>
            <div className="row text-start" style={{ marginBottom: "30px" }}>
              <h5>Anterior chamber Angle</h5>
            </div>
            <div className="row text-start" style={{ marginBottom: "30px" }}>
              <h5>Iris and pupil lens</h5>
            </div>
            <div className="row text-start" style={{ marginBottom: "30px" }}>
              <h5>Lens</h5>
            </div>
            <div className="row text-start" style={{ marginBottom: "30px" }}>
              <h5>Anterior vitreous </h5>
            </div>
            <div className="row text-start" style={{ marginBottom: "30px" }}>
              <h5>Vitreous</h5>
            </div>
            <div className="row text-start" style={{ marginBottom: "30px" }}>
              <h5>Optic disc</h5>
            </div>
            <div className="row text-start" style={{ marginBottom: "30px" }}>
              <h5>Macula and fovea</h5>
            </div>
            <div className="row text-start" style={{ marginBottom: "30px" }}>
              <h5>Retinal vasculature</h5>
            </div>
            <div className="row text-start" style={{ marginBottom: "30px" }}>
              <h5>Peripheral retina</h5>
            </div>
          </div>

          <div className="col-4">
            <OpthalmlogyExaminationComponent
              eye={"OD"}
              handle_external={handle_oculus_sinister_external}
              external={oculus_sinister_external}
              handle_ant_segment={handle_oculus_sinister_ant_segment}
              ant_segment={oculus_sinister_ant_segment}
              handle_post_segment={handle_oculus_sinister_post_segment}
              post_segment={oculus_sinister_post_segment}
              handle_orbits={handle_oculus_sinister_orbits}
              orbits={oculus_sinister_orbits}
              handle_eyelids={handle_oculus_sinister_eyelids}
              eyelids={oculus_sinister_eyelids}
              handle_ocular_alignment_and_motility={
                handle_oculus_sinister_ocular_alignment_and_motility
              }
              ocular_alignment_and_motility={
                oculus_sinister_ocular_alignment_and_motility
              }
              handle_pupils={handle_oculus_sinister_pupils}
              pupils={oculus_sinister_pupils}
              handle_lacrimal_apparatus={
                handle_oculus_sinister_lacrimal_apparatus
              }
              lacrimal_apparatus={oculus_sinister_lacrimal_apparatus}
              handle_eyelashes_and_lid_margin={
                handle_oculus_sinister_eyelashes_and_lid_margin
              }
              eyelashes_and_lid_margin={
                oculus_sinister_eyelashes_and_lid_margin
              }
              handle_conjunctiva={handle_oculus_sinister_conjunctiva}
              conjunctiva={oculus_sinister_conjunctiva}
              handle_sclera={handle_oculus_sinister_sclera}
              sclera={oculus_sinister_sclera}
              handle_tear_film={handle_oculus_sinister_tear_film}
              tear_film={oculus_sinister_tear_film}
              handle_cornea={handle_oculus_sinister_cornea}
              cornea={oculus_sinister_cornea}
              handle_ant_chamber={handle_oculus_sinister_ant_chamber}
              ant_chamber={oculus_sinister_ant_chamber}
              handle_ant_chamber_angle={
                handle_oculus_sinister_ant_chamber_angle
              }
              ant_chamber_angle={oculus_sinister_ant_chamber_angle}
              handle_iris_and_pupil={handle_oculus_sinister_iris_and_pupil}
              iris_and_pupil={oculus_sinister_iris_and_pupil}
              handle_lens={handle_oculus_sinister_lens}
              lens={oculus_sinister_lens}
              handle_ant_vitreous={handle_oculus_sinister_ant_vitreous}
              ant_vitreous={oculus_sinister_ant_vitreous}
              handle_vitreous={handle_oculus_sinister_vitreous}
              vitreous={oculus_sinister_vitreous}
              handle_optic_disc={handle_oculus_sinister_optic_disc}
              optic_disc={oculus_sinister_optic_disc}
              handle_macula_and_fovea={handle_oculus_sinister_macula_and_fovea}
              macula_and_fovea={oculus_sinister_macula_and_fovea}
              handle_retinal_vasculature={
                handle_oculus_sinister_retinal_vasculature
              }
              retinal_vasculature={oculus_sinister_retinal_vasculature}
              handle_peripheral_retina={
                handle_oculus_sinister_peripheral_retina
              }
              peripheral_retina={oculus_sinister_peripheral_retina}
            />
          </div>
          <div className="col-4">
            <OpthalmlogyExaminationComponent
              eye={"OS"}
              handle_external={handle_oculus_dextrus_external}
              external={oculus_dextrus_external}
              handle_ant_segment={handle_oculus_dextrus_ant_segment}
              ant_segment={oculus_dextrus_ant_segment}
              handle_post_segment={handle_oculus_dextrus_post_segment}
              post_segment={oculus_dextrus_post_segment}
              handle_orbits={handle_oculus_dextrus_orbits}
              orbits={oculus_dextrus_orbits}
              handle_eyelids={handle_oculus_dextrus_eyelids}
              eyelids={oculus_dextrus_eyelids}
              handle_ocular_alignment_and_motility={
                handle_oculus_dextrus_ocular_alignment_and_motility
              }
              ocular_alignment_and_motility={
                oculus_dextrus_ocular_alignment_and_motility
              }
              handle_pupils={handle_oculus_dextrus_pupils}
              pupils={oculus_dextrus_pupils}
              handle_lacrimal_apparatus={
                handle_oculus_dextrus_lacrimal_apparatus
              }
              lacrimal_apparatus={oculus_dextrus_lacrimal_apparatus}
              handle_eyelashes_and_lid_margin={
                handle_oculus_dextrus_eyelashes_and_lid_margin
              }
              eyelashes_and_lid_margin={oculus_dextrus_eyelashes_and_lid_margin}
              handle_conjunctiva={handle_oculus_dextrus_conjunctiva}
              conjunctiva={oculus_dextrus_conjunctiva}
              handle_sclera={handle_oculus_dextrus_sclera}
              sclera={oculus_dextrus_sclera}
              handle_tear_film={handle_oculus_dextrus_tear_film}
              tear_film={oculus_dextrus_tear_film}
              handle_cornea={handle_oculus_dextrus_cornea}
              cornea={oculus_dextrus_cornea}
              handle_ant_chamber={handle_oculus_dextrus_ant_chamber}
              ant_chamber={oculus_dextrus_ant_chamber}
              handle_ant_chamber_angle={handle_oculus_dextrus_ant_chamber_angle}
              ant_chamber_angle={oculus_dextrus_ant_chamber_angle}
              handle_iris_and_pupil={handle_oculus_dextrus_iris_and_pupil}
              iris_and_pupil={oculus_dextrus_iris_and_pupil}
              handle_lens={handle_oculus_dextrus_lens}
              lens={oculus_dextrus_lens}
              handle_ant_vitreous={handle_oculus_dextrus_ant_vitreous}
              ant_vitreous={oculus_dextrus_ant_vitreous}
              handle_vitreous={handle_oculus_dextrus_vitreous}
              vitreous={oculus_dextrus_vitreous}
              handle_optic_disc={handle_oculus_dextrus_optic_disc}
              optic_disc={oculus_dextrus_optic_disc}
              handle_macula_and_fovea={handle_oculus_dextrus_macula_and_fovea}
              macula_and_fovea={oculus_dextrus_macula_and_fovea}
              handle_retinal_vasculature={
                handle_oculus_dextrus_retinal_vasculature
              }
              retinal_vasculature={oculus_dextrus_retinal_vasculature}
              handle_peripheral_retina={handle_oculus_dextrus_peripheral_retina}
              peripheral_retina={oculus_dextrus_peripheral_retina}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
