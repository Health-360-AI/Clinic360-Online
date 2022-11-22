import React from "react";
import OpthalmologyExamination from "./OpthalmologyExamination";

export default function OpthalmologyExaminationController({
  dataToSend,
  setDataToSend,
}) {
  const handle_oculus_sinister_external = (e) => {
    setDataToSend({
      ...dataToSend,
      oculus_sinister_external: e.target.value,
    });
  };
  const handle_oculus_sinister_ant_segment = (e) => {
    setDataToSend({
      ...dataToSend,
      oculus_sinister_ant_segment: e.target.value,
    });
  };
  const handle_oculus_sinister_post_segment = (e) => {
    setDataToSend({
      ...dataToSend,
      oculus_sinister_post_segment: e.target.value,
    });
  };
  const handle_oculus_dextrus_external = (e) => {
    setDataToSend({
      ...dataToSend,
      oculus_dextrus_external: e.target.value,
    });
  };
  const handle_oculus_dextrus_ant_segment = (e) => {
    setDataToSend({
      ...dataToSend,
      oculus_dextrus_ant_segment: e.target.value,
    });
  };
  const handle_oculus_dextrus_post_segment = (e) => {
    setDataToSend({
      ...dataToSend,
      oculus_dextrus_post_segment: e.target.value,
    });
  };
  const handle_oculus_sinister_orbits = (e) => {
    setDataToSend({
      ...dataToSend,
      oculus_sinister_orbits: e.target.value,
    });
  };
  const handle_oculus_dextrus_orbits = (e) => {
    setDataToSend({
      ...dataToSend,
      oculus_dextrus_orbits: e.target.value,
    });
  };
  const handle_oculus_sinister_eyelids = (e) => {
    setDataToSend({
      ...dataToSend,
      oculus_sinister_eyelids: e.target.value,
    });
  };
  const handle_oculus_dextrus_eyelids = (e) => {
    setDataToSend({
      ...dataToSend,
      oculus_dextrus_eyelids: e.target.value,
    });
  };
  const handle_oculus_sinister_ocular_alignment_and_motility = (e) => {
    setDataToSend({
      ...dataToSend,
      oculus_sinister_ocular_alignment_and_motility: e.target.value,
    });
  };
  const handle_oculus_dextrus_ocular_alignment_and_motility = (e) => {
    setDataToSend({
      ...dataToSend,
      oculus_dextrus_ocular_alignment_and_motility: e.target.value,
    });
  };
  const handle_oculus_sinister_pupils = (e) => {
    setDataToSend({
      ...dataToSend,
      oculus_sinister_pupils: e.target.value,
    });
  };
  const handle_oculus_dextrus_pupils = (e) => {
    setDataToSend({
      ...dataToSend,
      oculus_dextrus_pupils: e.target.value,
    });
  };
  const handle_oculus_sinister_lacrimal_apparatus = (e) => {
    setDataToSend({
      ...dataToSend,
      oculus_sinister_lacrimal_apparatus: e.target.value,
    });
  };
  const handle_oculus_dextrus_lacrimal_apparatus = (e) => {
    setDataToSend({
      ...dataToSend,
      oculus_dextrus_lacrimal_apparatus: e.target.value,
    });
  };
  const handle_oculus_sinister_eyelashes_and_lid_margin = (e) => {
    setDataToSend({
      ...dataToSend,
      oculus_sinister_eyelashes_and_lid_margin: e.target.value,
    });
  };
  const handle_oculus_dextrus_eyelashes_and_lid_margin = (e) => {
    setDataToSend({
      ...dataToSend,
      oculus_dextrus_eyelashes_and_lid_margin: e.target.value,
    });
  };
  const handle_oculus_sinister_conjunctiva = (e) => {
    setDataToSend({
      ...dataToSend,
      oculus_sinister_conjunctiva: e.target.value,
    });
  };
  const handle_oculus_dextrus_conjunctiva = (e) => {
    setDataToSend({
      ...dataToSend,
      oculus_dextrus_conjunctiva: e.target.value,
    });
  };
  const handle_oculus_sinister_sclera = (e) => {
    setDataToSend({
      ...dataToSend,
      oculus_sinister_sclera: e.target.value,
    });
  };
  const handle_oculus_dextrus_sclera = (e) => {
    setDataToSend({
      ...dataToSend,
      oculus_dextrus_sclera: e.target.value,
    });
  };
  const handle_oculus_sinister_tear_film = (e) => {
    setDataToSend({
      ...dataToSend,
      oculus_sinister_tear_film: e.target.value,
    });
  };
  const handle_oculus_dextrus_tear_film = (e) => {
    setDataToSend({
      ...dataToSend,
      handle_oculus_dextrus_tear_film: e.target.value,
    });
  };
  const handle_oculus_sinister_cornea = (e) => {
    setDataToSend({
      ...dataToSend,
      oculus_sinister_cornea: e.target.value,
    });
  };
  const handle_oculus_dextrus_cornea = (e) => {
    setDataToSend({
      ...dataToSend,
      oculus_dextrus_cornea: e.target.value,
    });
  };
  const handle_oculus_sinister_ant_chamber = (e) => {
    setDataToSend({
      ...dataToSend,
      oculus_sinister_ant_chamber: e.target.value,
    });
  };
  const handle_oculus_dextrus_ant_chamber = (e) => {
    setDataToSend({
      ...dataToSend,
      oculus_dextrus_ant_chamber: e.target.value,
    });
  };
  const handle_oculus_sinister_ant_chamber_angle = (e) => {
    setDataToSend({
      ...dataToSend,
      oculus_sinister_ant_chamber_angle: e.target.value,
    });
  };
  const handle_oculus_dextrus_ant_chamber_angle = (e) => {
    setDataToSend({
      ...dataToSend,
      oculus_dextrus_ant_chamber_angle: e.target.value,
    });
  };
  const handle_oculus_sinister_iris_and_pupil = (e) => {
    setDataToSend({
      ...dataToSend,
      oculus_sinister_iris_and_pupil: e.target.value,
    });
  };
  const handle_oculus_dextrus_iris_and_pupil = (e) => {
    setDataToSend({
      ...dataToSend,
      oculus_dextrus_iris_and_pupil: e.target.value,
    });
  };
  const handle_oculus_sinister_lens = (e) => {
    setDataToSend({
      ...dataToSend,
      oculus_sinister_lens: e.target.value,
    });
  };
  const handle_oculus_dextrus_lens = (e) => {
    setDataToSend({
      ...dataToSend,
      oculus_dextrus_lens: e.target.value,
    });
  };
  const handle_oculus_sinister_ant_vitreous = (e) => {
    setDataToSend({
      ...dataToSend,
      oculus_sinister_ant_vitreous: e.target.value,
    });
  };
  const handle_oculus_dextrus_ant_vitreous = (e) => {
    setDataToSend({
      ...dataToSend,
      oculus_dextrus_ant_vitreous: e.target.value,
    });
  };
  const handle_oculus_sinister_vitreous = (e) => {
    setDataToSend({
      ...dataToSend,
      oculus_sinister_vitreous: e.target.value,
    });
  };
  const handle_oculus_dextrus_vitreous = (e) => {
    setDataToSend({
      ...dataToSend,
      oculus_dextrus_vitreous: e.target.value,
    });
  };
  const handle_oculus_sinister_optic_disc = (e) => {
    setDataToSend({
      ...dataToSend,
      oculus_sinister_optic_disc: e.target.value,
    });
  };
  const handle_oculus_dextrus_optic_disc = (e) => {
    setDataToSend({
      ...dataToSend,
      oculus_dextrus_optic_disc: e.target.value,
    });
  };
  const handle_oculus_sinister_macula_and_fovea = (e) => {
    setDataToSend({
      ...dataToSend,
      oculus_sinister_macula_and_fovea: e.target.value,
    });
  };
  const handle_oculus_dextrus_macula_and_fovea = (e) => {
    setDataToSend({
      ...dataToSend,
      oculus_dextrus_macula_and_fovea: e.target.value,
    });
  };
  const handle_oculus_sinister_retinal_vasculature = (e) => {
    setDataToSend({
      ...dataToSend,
      oculus_sinister_retinal_vasculature: e.target.value,
    });
  };
  const handle_oculus_dextrus_retinal_vasculature = (e) => {
    setDataToSend({
      ...dataToSend,
      oculus_dextrus_retinal_vasculature: e.target.value,
    });
  };
  const handle_oculus_sinister_peripheral_retina = (e) => {
    setDataToSend({
      ...dataToSend,
      oculus_sinister_peripheral_retina: e.target.value,
    });
  };
  const handle_oculus_dextrus_peripheral_retina = (e) => {
    setDataToSend({
      ...dataToSend,
      oculus_dextrus_peripheral_retina: e.target.value,
    });
  };
  return (
    <OpthalmologyExamination
      handle_oculus_sinister_external={handle_oculus_sinister_external}
      oculus_sinister_external={dataToSend.oculus_sinister_external}
      handle_oculus_sinister_ant_segment={handle_oculus_sinister_ant_segment}
      oculus_sinister_ant_segment={dataToSend.oculus_sinister_ant_segment}
      handle_oculus_sinister_post_segment={handle_oculus_sinister_post_segment}
      oculus_sinister_post_segment={dataToSend.oculus_sinister_post_segment}
      handle_oculus_sinister_orbits={handle_oculus_sinister_orbits}
      oculus_sinister_orbits={dataToSend.oculus_sinister_orbits}
      handle_oculus_sinister_eyelids={handle_oculus_sinister_eyelids}
      oculus_sinister_eyelids={dataToSend.oculus_sinister_eyelids}
      handle_oculus_sinister_ocular_alignment_and_motility={
        handle_oculus_sinister_ocular_alignment_and_motility
      }
      oculus_sinister_ocular_alignment_and_motility={
        dataToSend.oculus_sinister_ocular_alignment_and_motility
      }
      handle_oculus_sinister_pupils={handle_oculus_sinister_pupils}
      oculus_sinister_pupils={dataToSend.oculus_sinister_pupils}
      handle_oculus_sinister_lacrimal_apparatus={
        handle_oculus_sinister_lacrimal_apparatus
      }
      oculus_sinister_lacrimal_apparatus={
        dataToSend.oculus_sinister_lacrimal_apparatus
      }
      handle_oculus_sinister_eyelashes_and_lid_margin={
        handle_oculus_sinister_eyelashes_and_lid_margin
      }
      oculus_sinister_eyelashes_and_lid_margin={
        dataToSend.oculus_sinister_eyelashes_and_lid_margin
      }
      handle_oculus_sinister_conjunctiva={handle_oculus_sinister_conjunctiva}
      oculus_sinister_conjunctiva={dataToSend.oculus_sinister_conjunctiva}
      handle_oculus_sinister_sclera={handle_oculus_sinister_sclera}
      oculus_sinister_sclera={dataToSend.oculus_sinister_sclera}
      handle_oculus_sinister_tear_film={handle_oculus_sinister_tear_film}
      oculus_sinister_tear_film={dataToSend.oculus_sinister_tear_film}
      handle_oculus_sinister_cornea={handle_oculus_sinister_cornea}
      oculus_sinister_cornea={dataToSend.oculus_sinister_cornea}
      handle_oculus_sinister_ant_chamber={handle_oculus_sinister_ant_chamber}
      oculus_sinister_ant_chamber={dataToSend.oculus_sinister_ant_chamber}
      handle_oculus_sinister_ant_chamber_angle={
        handle_oculus_sinister_ant_chamber_angle
      }
      oculus_sinister_ant_chamber_angle={
        dataToSend.oculus_sinister_ant_chamber_angle
      }
      handle_oculus_sinister_iris_and_pupil={
        handle_oculus_sinister_iris_and_pupil
      }
      oculus_sinister_iris_and_pupil={dataToSend.oculus_sinister_iris_and_pupil}
      handle_oculus_sinister_lens={handle_oculus_sinister_lens}
      oculus_sinister_lens={dataToSend.oculus_sinister_lens}
      handle_oculus_sinister_ant_vitreous={handle_oculus_sinister_ant_vitreous}
      oculus_sinister_ant_vitreous={dataToSend.oculus_sinister_ant_vitreous}
      handle_oculus_sinister_vitreous={handle_oculus_sinister_vitreous}
      oculus_sinister_vitreous={dataToSend.oculus_sinister_vitreous}
      handle_oculus_sinister_optic_disc={handle_oculus_sinister_optic_disc}
      oculus_sinister_optic_disc={dataToSend.oculus_sinister_optic_disc}
      handle_oculus_sinister_macula_and_fovea={
        handle_oculus_sinister_macula_and_fovea
      }
      oculus_sinister_macula_and_fovea={
        dataToSend.oculus_sinister_macula_and_fovea
      }
      handle_oculus_sinister_retinal_vasculature={
        handle_oculus_sinister_retinal_vasculature
      }
      oculus_sinister_retinal_vasculature={
        dataToSend.oculus_sinister_retinal_vasculature
      }
      handle_oculus_sinister_peripheral_retina={
        handle_oculus_sinister_peripheral_retina
      }
      oculus_sinister_peripheral_retina={
        dataToSend.oculus_sinister_peripheral_retina
      }
      handle_oculus_dextrus_external={handle_oculus_dextrus_external}
      oculus_dextrus_external={dataToSend.oculus_dextrus_external}
      handle_oculus_dextrus_ant_segment={handle_oculus_dextrus_ant_segment}
      oculus_dextrus_ant_segment={dataToSend.oculus_dextrus_ant_segment}
      handle_oculus_dextrus_post_segment={handle_oculus_dextrus_post_segment}
      oculus_dextrus_post_segment={dataToSend.oculus_dextrus_post_segment}
      handle_oculus_dextrus_orbits={handle_oculus_dextrus_orbits}
      oculus_dextrus_orbits={dataToSend.oculus_dextrus_orbits}
      handle_oculus_dextrus_eyelids={handle_oculus_dextrus_eyelids}
      oculus_dextrus_eyelids={dataToSend.oculus_dextrus_eyelids}
      handle_oculus_dextrus_ocular_alignment_and_motility={
        handle_oculus_dextrus_ocular_alignment_and_motility
      }
      oculus_dextrus_ocular_alignment_and_motility={
        dataToSend.oculus_dextrus_ocular_alignment_and_motility
      }
      handle_oculus_dextrus_pupils={handle_oculus_dextrus_pupils}
      oculus_dextrus_pupils={dataToSend.oculus_dextrus_pupils}
      handle_oculus_dextrus_lacrimal_apparatus={
        handle_oculus_dextrus_lacrimal_apparatus
      }
      oculus_dextrus_lacrimal_apparatus={
        dataToSend.oculus_dextrus_lacrimal_apparatus
      }
      handle_oculus_dextrus_eyelashes_and_lid_margin={
        handle_oculus_dextrus_eyelashes_and_lid_margin
      }
      oculus_dextrus_eyelashes_and_lid_margin={
        dataToSend.oculus_dextrus_eyelashes_and_lid_margin
      }
      handle_oculus_dextrus_conjunctiva={handle_oculus_dextrus_conjunctiva}
      oculus_dextrus_conjunctiva={dataToSend.oculus_dextrus_conjunctiva}
      handle_oculus_dextrus_tear_film={handle_oculus_dextrus_tear_film}
      handle_oculus_dextrus_sclera={handle_oculus_dextrus_sclera}
      oculus_dextrus_sclera={dataToSend.oculus_dextrus_sclera}
      handle_oculus_dextrus_cornea={handle_oculus_dextrus_cornea}
      oculus_dextrus_cornea={dataToSend.oculus_dextrus_cornea}
      handle_oculus_dextrus_ant_chamber={handle_oculus_dextrus_ant_chamber}
      oculus_dextrus_ant_chamber={dataToSend.oculus_dextrus_ant_chamber}
      handle_oculus_dextrus_ant_chamber_angle={
        handle_oculus_dextrus_ant_chamber_angle
      }
      oculus_dextrus_ant_chamber_angle={
        dataToSend.oculus_dextrus_ant_chamber_angle
      }
      handle_oculus_dextrus_iris_and_pupil={
        handle_oculus_dextrus_iris_and_pupil
      }
      oculus_dextrus_iris_and_pupil={dataToSend.oculus_dextrus_iris_and_pupil}
      handle_oculus_dextrus_lens={handle_oculus_dextrus_lens}
      oculus_dextrus_lens={dataToSend.oculus_dextrus_lens}
      handle_oculus_dextrus_ant_vitreous={handle_oculus_dextrus_ant_vitreous}
      oculus_dextrus_ant_vitreous={dataToSend.oculus_dextrus_ant_vitreous}
      handle_oculus_dextrus_vitreous={handle_oculus_dextrus_vitreous}
      oculus_dextrus_vitreous={dataToSend.oculus_dextrus_vitreous}
      handle_oculus_dextrus_optic_disc={handle_oculus_dextrus_optic_disc}
      oculus_dextrus_optic_disc={dataToSend.oculus_dextrus_optic_disc}
      handle_oculus_dextrus_macula_and_fovea={
        handle_oculus_dextrus_macula_and_fovea
      }
      oculus_dextrus_macula_and_fovea={
        dataToSend.oculus_dextrus_macula_and_fovea
      }
      handle_oculus_dextrus_retinal_vasculature={
        handle_oculus_dextrus_retinal_vasculature
      }
      oculus_dextrus_retinal_vasculature={
        dataToSend.oculus_dextrus_retinal_vasculature
      }
      handle_oculus_dextrus_peripheral_retina={
        handle_oculus_dextrus_peripheral_retina
      }
      oculus_dextrus_peripheral_retina={
        dataToSend.oculus_dextrus_peripheral_retina
      }
    />
  );
}
