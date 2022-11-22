import React from "react";
import OpthalmologyVA from "./OpthalmologyVA";

export default function OpthalmologyVAController({
  dataToSend,
  setDataToSend,
}) {
  const handle_oculus_sinister_sphere_auto_refraction = (e) => {
    setDataToSend({
      ...dataToSend,
      oculus_sinister_sphere_auto_refraction: e.target.value,
    });
  };
  const handle_oculus_sinister_cylinder_auto_refraction = (e) => {
    setDataToSend({
      ...dataToSend,
      oculus_sinister_cylinder_auto_refraction: e.target.value,
    });
  };
  const handle_oculus_sinister_axis_auto_refraction = (e) => {
    setDataToSend({
      ...dataToSend,
      oculus_sinister_axis_auto_refraction: e.target.value,
    });
  };
  const handle_oculus_dextrus_sphere_auto_refraction = (e) => {
    setDataToSend({
      ...dataToSend,
      oculus_dextrus_sphere_auto_refraction: e.target.value,
    });
  };
  const handle_oculus_dextrus_cylinder_auto_refraction = (e) => {
    setDataToSend({
      ...dataToSend,
      oculus_dextrus_cylinder_auto_refraction: e.target.value,
    });
  };
  const handle_oculus_dextrus_axis_auto_refraction = (e) => {
    setDataToSend({
      ...dataToSend,
      oculus_dextrus_axis_auto_refraction: e.target.value,
    });
  };
  const handle_oculus_sinister_k1 = (e) => {
    setDataToSend({
      ...dataToSend,
      oculus_sinister_k1: e.target.value,
    });
  };
  const handle_oculus_sinister_k1_axis = (e) => {
    setDataToSend({
      ...dataToSend,
      oculus_sinister_k1_axis: e.target.value,
    });
  };
  const handle_oculus_sinister_k2 = (e) => {
    setDataToSend({
      ...dataToSend,
      oculus_sinister_k2: e.target.value,
    });
  };
  const handle_oculus_sinister_k2_axis = (e) => {
    setDataToSend({
      ...dataToSend,
      oculus_sinister_k2_axis: e.target.value,
    });
  };
  const handle_oculus_dextrus_k1 = (e) => {
    setDataToSend({
      ...dataToSend,
      oculus_dextrus_k1: e.target.value,
    });
  };
  const handle_oculus_dextrus_k1_axis = (e) => {
    setDataToSend({
      ...dataToSend,
      oculus_dextrus_k1_axis: e.target.value,
    });
  };
  const handle_oculus_dextrus_k2 = (e) => {
    setDataToSend({
      ...dataToSend,
      oculus_dextrus_k2: e.target.value,
    });
  };
  const handle_oculus_dextrus_k2_axis = (e) => {
    setDataToSend({
      ...dataToSend,
      oculus_dextrus_k2_axis: e.target.value,
    });
  };
  const handle_oculus_sinister_corneal_astigmatism = (e) => {
    setDataToSend({
      ...dataToSend,
      oculus_sinister_corneal_astigmatism: e.target.value,
    });
  };
  const handle_oculus_dextrus_corneal_astigmatism = (e) => {
    setDataToSend({
      ...dataToSend,
      oculus_dextrus_corneal_astigmatism: e.target.value,
    });
  };
  const handle_oculus_sinister_ucva = (e) => {
    setDataToSend({
      ...dataToSend,
      oculus_sinister_ucva: e.target.value,
    });
  };
  const handle_oculus_dextrus_ucva = (e) => {
    setDataToSend({
      ...dataToSend,
      oculus_dextrus_ucva: e.target.value,
    });
  };
  const handle_oculus_sinister_pinhole = (e) => {
    setDataToSend({
      ...dataToSend,
      oculus_sinister_pinhole: e.target.value,
    });
  };
  const handle_oculus_dextrus_pinhole = (e) => {
    setDataToSend({
      ...dataToSend,
      oculus_dextrus_pinhole: e.target.value,
    });
  };
  const handle_oculus_sinister_visual_acuity_old = (e) => {
    setDataToSend({
      ...dataToSend,
      oculus_sinister_visual_acuity_old: e.target.value,
    });
  };
  const handle_oculus_sinister_sphere_old = (e) => {
    setDataToSend({
      ...dataToSend,
      oculus_sinister_sphere_old: e.target.value,
    });
  };
  const handle_oculus_sinister_axis_old = (e) => {
    setDataToSend({
      ...dataToSend,
      oculus_sinister_axis_old: e.target.value,
    });
  };
  const handle_oculus_sinister_cylinder_old = (e) => {
    setDataToSend({
      ...dataToSend,
      oculus_sinister_cylinder_old: e.target.value,
    });
  };
  const handle_oculus_dextrus_visual_acuity_old = (e) => {
    setDataToSend({
      ...dataToSend,
      oculus_dextrus_visual_acuity_old: e.target.value,
    });
  };
  const handle_oculus_dextrus_axis_old = (e) => {
    setDataToSend({
      ...dataToSend,
      oculus_dextrus_axis_old: e.target.value,
    });
  };
  const handle_oculus_dextrus_sphere_old = (e) => {
    setDataToSend({
      ...dataToSend,
      oculus_dextrus_sphere_old: e.target.value,
    });
  };
  const handle_oculus_dextrus_cylinder_old = (e) => {
    setDataToSend({
      ...dataToSend,
      oculus_dextrus_cylinder_old: e.target.value,
    });
  };
  const handle_oculus_sinister_sphere_manifest_refraction = (e) => {
    setDataToSend({
      ...dataToSend,
      oculus_sinister_sphere_manifest_refraction: e.target.value,
    });
  };
  const handle_oculus_sinister_visual_acuity_manifest_refraction = (e) => {
    setDataToSend({
      ...dataToSend,
      oculus_sinister_visual_acuity_manifest_refraction: e.target.value,
    });
  };
  const handle_oculus_sinister_cylinder_manifest_refraction = (e) => {
    setDataToSend({
      ...dataToSend,
      oculus_sinister_cylinder_manifest_refraction: e.target.value,
    });
  };
  const handle_oculus_sinister_axis_manifest_refraction = (e) => {
    setDataToSend({
      ...dataToSend,
      oculus_sinister_axis_manifest_refraction: e.target.value,
    });
  };
  const handle_oculus_dextrus_visual_acuity_manifest_refraction = (e) => {
    setDataToSend({
      ...dataToSend,
      oculus_dextrus_visual_acuity_manifest_refraction: e.target.value,
    });
  };
  const handle_oculus_dextrus_sphere_manifest_refraction = (e) => {
    setDataToSend({
      ...dataToSend,
      oculus_dextrus_sphere_manifest_refraction: e.target.value,
    });
  };
  const handle_oculus_dextrus_cylinder_manifest_refraction = (e) => {
    setDataToSend({
      ...dataToSend,
      oculus_dextrus_cylinder_manifest_refraction: e.target.value,
    });
  };
  const handle_oculus_dextrus_axis_manifest_refraction = (e) => {
    setDataToSend({
      ...dataToSend,
      oculus_dextrus_axis_manifest_refraction: e.target.value,
    });
  };
  const handle_oculus_sinister_visual_acuity_cyclorefraction = (e) => {
    setDataToSend({
      ...dataToSend,
      oculus_sinister_visual_acuity_cyclorefraction: e.target.value,
    });
  };
  const handle_oculus_sinister_sphere_cyclorefraction = (e) => {
    setDataToSend({
      ...dataToSend,
      oculus_sinister_sphere_cyclorefraction: e.target.value,
    });
  };
  const handle_oculus_sinister_cylinder_cyclorefraction = (e) => {
    setDataToSend({
      ...dataToSend,
      oculus_sinister_cylinder_cyclorefraction: e.target.value,
    });
  };
  const handle_oculus_sinister_axis_cyclorefraction = (e) => {
    setDataToSend({
      ...dataToSend,
      oculus_sinister_axis_cyclorefraction: e.target.value,
    });
  };
  const handle_oculus_dextrus_visual_acuity_cyclorefraction = (e) => {
    setDataToSend({
      ...dataToSend,
      oculus_dextrus_visual_acuity_cyclorefraction: e.target.value,
    });
  };
  const handle_oculus_dextrus_sphere_cyclorefraction = (e) => {
    setDataToSend({
      ...dataToSend,
      oculus_dextrus_sphere_cyclorefraction: e.target.value,
    });
  };
  const handle_oculus_dextrus_cylinder_cyclorefraction = (e) => {
    setDataToSend({
      ...dataToSend,
      oculus_dextrus_cylinder_cyclorefraction: e.target.value,
    });
  };
  const handle_oculus_dextrus_axis_cyclorefraction = (e) => {
    setDataToSend({
      ...dataToSend,
      oculus_dextrus_axis_cyclorefraction: e.target.value,
    });
  };
  const handle_oculus_sinister_near = (e) => {
    setDataToSend({
      ...dataToSend,
      oculus_sinister_near: e.target.value,
    });
  };
  const handle_oculus_dextrus_near = (e) => {
    setDataToSend({
      ...dataToSend,
      oculus_dextrus_near: e.target.value,
    });
  };

  const handle_oculus_ipd = (e) => {
    setDataToSend({
      ...dataToSend,
      oculus_ipd: e.target.value,
    });
  };
  const handle_oculus_sinister_iop_airpuff = (e) => {
    setDataToSend({
      ...dataToSend,
      oculus_sinister_iop_airpuff: e.target.value,
    });
  };
  const handle_oculus_sinister_iop_applantation = (e) => {
    setDataToSend({
      ...dataToSend,
      oculus_sinister_iop_applantation: e.target.value,
    });
  };
  const handle_oculus_sinister_iop_other = (e) => {
    setDataToSend({
      ...dataToSend,
      oculus_sinister_iop_other: e.target.value,
    });
  };
  const handle_oculus_dextrus_iop_airpuff = (e) => {
    setDataToSend({
      ...dataToSend,
      oculus_dextrus_iop_airpuff: e.target.value,
    });
  };
  const handle_oculus_dextrus_iop_applantation = (e) => {
    setDataToSend({
      ...dataToSend,
      oculus_dextrus_iop_applantation: e.target.value,
    });
  };
  const handle_oculus_dextrus_iop_other = (e) => {
    setDataToSend({
      ...dataToSend,
      oculus_dextrus_iop_other: e.target.value,
    });
  };
  return (
    <OpthalmologyVA
      handle_oculus_sinister_sphere_auto_refraction={
        handle_oculus_sinister_sphere_auto_refraction
      }
      oculus_sinister_sphere_auto_refraction={
        dataToSend.oculus_sinister_sphere_auto_refraction
      }
      handle_oculus_sinister_cylinder_auto_refraction={
        handle_oculus_sinister_cylinder_auto_refraction
      }
      oculus_sinister_cylinder_auto_refraction={
        dataToSend.oculus_sinister_cylinder_auto_refraction
      }
      handle_oculus_sinister_axis_auto_refraction={
        handle_oculus_sinister_axis_auto_refraction
      }
      oculus_sinister_axis_auto_refraction={
        dataToSend.oculus_sinister_axis_auto_refraction
      }
      handle_oculus_dextrus_sphere_auto_refraction={
        handle_oculus_dextrus_sphere_auto_refraction
      }
      oculus_dextrus_sphere_auto_refraction={
        dataToSend.oculus_dextrus_sphere_auto_refraction
      }
      handle_oculus_dextrus_cylinder_auto_refraction={
        handle_oculus_dextrus_cylinder_auto_refraction
      }
      oculus_dextrus_cylinder_auto_refraction={
        dataToSend.oculus_dextrus_cylinder_auto_refraction
      }
      handle_oculus_dextrus_axis_auto_refraction={
        handle_oculus_dextrus_axis_auto_refraction
      }
      oculus_dextrus_axis_auto_refraction={
        dataToSend.oculus_dextrus_axis_auto_refraction
      }
      handle_oculus_sinister_k1={handle_oculus_sinister_k1}
      oculus_sinister_k1={dataToSend.oculus_sinister_k1}
      handle_oculus_sinister_k1_axis={handle_oculus_sinister_k1_axis}
      oculus_sinister_k1_axis={dataToSend.oculus_sinister_k1_axis}
      handle_oculus_sinister_k2={handle_oculus_sinister_k2}
      oculus_sinister_k2={dataToSend.oculus_sinister_k2}
      handle_oculus_sinister_k2_axis={handle_oculus_sinister_k2_axis}
      oculus_sinister_k2_axis={dataToSend.oculus_sinister_k2_axis}
      handle_oculus_dextrus_k1={handle_oculus_dextrus_k1}
      oculus_dextrus_k1={dataToSend.oculus_dextrus_k1}
      handle_oculus_dextrus_k1_axis={handle_oculus_dextrus_k1_axis}
      oculus_dextrus_k1_axis={dataToSend.oculus_dextrus_k1_axis}
      handle_oculus_dextrus_k2={handle_oculus_dextrus_k2}
      oculus_dextrus_k2={dataToSend.oculus_dextrus_k2}
      handle_oculus_dextrus_k2_axis={handle_oculus_dextrus_k2_axis}
      oculus_dextrus_k2_axis={dataToSend.oculus_dextrus_k2_axis}
      handle_oculus_sinister_corneal_astigmatism={
        handle_oculus_sinister_corneal_astigmatism
      }
      oculus_sinister_corneal_astigmatism={
        dataToSend.oculus_sinister_corneal_astigmatism
      }
      handle_oculus_dextrus_corneal_astigmatism={
        handle_oculus_dextrus_corneal_astigmatism
      }
      oculus_dextrus_corneal_astigmatism={
        dataToSend.oculus_dextrus_corneal_astigmatism
      }
      handle_oculus_sinister_ucva={handle_oculus_sinister_ucva}
      oculus_sinister_ucva={dataToSend.oculus_sinister_ucva}
      handle_oculus_dextrus_ucva={handle_oculus_dextrus_ucva}
      oculus_dextrus_ucva={dataToSend.oculus_dextrus_ucva}
      handle_oculus_sinister_pinhole={handle_oculus_sinister_pinhole}
      oculus_sinister_pinhole={dataToSend.oculus_sinister_pinhole}
      handle_oculus_dextrus_pinhole={handle_oculus_dextrus_pinhole}
      oculus_dextrus_pinhole={dataToSend.oculus_dextrus_pinhole}
      handle_oculus_sinister_visual_acuity_old={
        handle_oculus_sinister_visual_acuity_old
      }
      oculus_sinister_visual_acuity_old={
        dataToSend.oculus_sinister_visual_acuity_old
      }
      handle_oculus_sinister_sphere_old={handle_oculus_sinister_sphere_old}
      oculus_sinister_sphere_old={dataToSend.oculus_sinister_sphere_old}
      handle_oculus_sinister_axis_old={handle_oculus_sinister_axis_old}
      oculus_sinister_axis_old={dataToSend.oculus_sinister_axis_old}
      handle_oculus_sinister_cylinder_old={handle_oculus_sinister_cylinder_old}
      oculus_sinister_cylinder_old={dataToSend.oculus_sinister_cylinder_old}
      handle_oculus_dextrus_visual_acuity_old={
        handle_oculus_dextrus_visual_acuity_old
      }
      oculus_dextrus_visual_acuity_old={
        dataToSend.oculus_dextrus_visual_acuity_old
      }
      handle_oculus_dextrus_axis_old={handle_oculus_dextrus_axis_old}
      oculus_dextrus_axis_old={dataToSend.oculus_dextrus_axis_old}
      handle_oculus_dextrus_sphere_old={handle_oculus_dextrus_sphere_old}
      oculus_dextrus_sphere_old={dataToSend.oculus_dextrus_sphere_old}
      handle_oculus_dextrus_cylinder_old={handle_oculus_dextrus_cylinder_old}
      oculus_dextrus_cylinder_old={dataToSend.oculus_dextrus_cylinder_old}
      handle_oculus_sinister_visual_acuity_manifest_refraction={
        handle_oculus_sinister_visual_acuity_manifest_refraction
      }
      oculus_sinister_visual_acuity_manifest_refraction={
        dataToSend.oculus_sinister_visual_acuity_manifest_refraction
      }
      handle_oculus_sinister_sphere_manifest_refraction={
        handle_oculus_sinister_sphere_manifest_refraction
      }
      oculus_sinister_sphere_manifest_refraction={
        dataToSend.oculus_sinister_sphere_manifest_refraction
      }
      handle_oculus_sinister_cylinder_manifest_refraction={
        handle_oculus_sinister_cylinder_manifest_refraction
      }
      oculus_sinister_cylinder_manifest_refraction={
        dataToSend.oculus_sinister_cylinder_manifest_refraction
      }
      handle_oculus_sinister_axis_manifest_refraction={
        handle_oculus_sinister_axis_manifest_refraction
      }
      oculus_sinister_axis_manifest_refraction={
        dataToSend.oculus_sinister_axis_manifest_refraction
      }
      handle_oculus_dextrus_visual_acuity_manifest_refraction={
        handle_oculus_dextrus_visual_acuity_manifest_refraction
      }
      oculus_dextrus_visual_acuity_manifest_refraction={
        dataToSend.oculus_dextrus_visual_acuity_manifest_refraction
      }
      handle_oculus_dextrus_sphere_manifest_refraction={
        handle_oculus_dextrus_sphere_manifest_refraction
      }
      oculus_dextrus_sphere_manifest_refraction={
        dataToSend.oculus_dextrus_sphere_manifest_refraction
      }
      handle_oculus_dextrus_cylinder_manifest_refraction={
        handle_oculus_dextrus_cylinder_manifest_refraction
      }
      oculus_dextrus_cylinder_manifest_refraction={
        dataToSend.oculus_dextrus_cylinder_manifest_refraction
      }
      handle_oculus_dextrus_axis_manifest_refraction={
        handle_oculus_dextrus_axis_manifest_refraction
      }
      oculus_dextrus_axis_manifest_refraction={
        dataToSend.oculus_dextrus_axis_manifest_refraction
      }
      handle_oculus_sinister_visual_acuity_cyclorefraction={
        handle_oculus_sinister_visual_acuity_cyclorefraction
      }
      oculus_sinister_visual_acuity_cyclorefraction={
        dataToSend.oculus_sinister_visual_acuity_cyclorefraction
      }
      handle_oculus_sinister_sphere_cyclorefraction={
        handle_oculus_sinister_sphere_cyclorefraction
      }
      oculus_sinister_sphere_cyclorefraction={
        dataToSend.oculus_sinister_sphere_cyclorefraction
      }
      handle_oculus_sinister_cylinder_cyclorefraction={
        handle_oculus_sinister_cylinder_cyclorefraction
      }
      oculus_sinister_cylinder_cyclorefraction={
        dataToSend.oculus_sinister_cylinder_cyclorefraction
      }
      handle_oculus_sinister_axis_cyclorefraction={
        handle_oculus_sinister_axis_cyclorefraction
      }
      oculus_sinister_axis_cyclorefraction={
        dataToSend.oculus_sinister_axis_cyclorefraction
      }
      handle_oculus_dextrus_visual_acuity_cyclorefraction={
        handle_oculus_dextrus_visual_acuity_cyclorefraction
      }
      oculus_dextrus_visual_acuity_cyclorefraction={
        dataToSend.oculus_dextrus_visual_acuity_cyclorefraction
      }
      handle_oculus_dextrus_sphere_cyclorefraction={
        handle_oculus_dextrus_sphere_cyclorefraction
      }
      oculus_dextrus_sphere_cyclorefraction={
        dataToSend.oculus_dextrus_sphere_cyclorefraction
      }
      handle_oculus_dextrus_cylinder_cyclorefraction={
        handle_oculus_dextrus_cylinder_cyclorefraction
      }
      oculus_dextrus_cylinder_cyclorefraction={
        dataToSend.oculus_dextrus_cylinder_cyclorefraction
      }
      handle_oculus_dextrus_axis_cyclorefraction={
        handle_oculus_dextrus_axis_cyclorefraction
      }
      oculus_dextrus_axis_cyclorefraction={
        dataToSend.oculus_dextrus_axis_cyclorefraction
      }
      handle_oculus_sinister_near={handle_oculus_sinister_near}
      oculus_sinister_near={dataToSend.oculus_sinister_near}
      handle_oculus_dextrus_near={handle_oculus_dextrus_near}
      oculus_dextrus_near={dataToSend.oculus_dextrus_near}
      handle_oculus_ipd={handle_oculus_ipd}
      oculus_ipd={dataToSend.oculus_ipd}
      handle_oculus_sinister_iop_airpuff={handle_oculus_sinister_iop_airpuff}
      oculus_sinister_iop_airpuff={dataToSend.oculus_sinister_iop_airpuff}
      handle_oculus_sinister_iop_applantation={
        handle_oculus_sinister_iop_applantation
      }
      oculus_sinister_iop_applantation={
        dataToSend.oculus_sinister_iop_applantation
      }
      handle_oculus_sinister_iop_other={handle_oculus_sinister_iop_other}
      oculus_sinister_iop_other={dataToSend.oculus_sinister_iop_other}
      handle_oculus_dextrus_iop_airpuff={handle_oculus_dextrus_iop_airpuff}
      oculus_dextrus_iop_airpuff={dataToSend.oculus_dextrus_iop_airpuff}
      handle_oculus_dextrus_iop_applantation={
        handle_oculus_dextrus_iop_applantation
      }
      oculus_dextrus_iop_applantation={
        dataToSend.oculus_dextrus_iop_applantation
      }
      handle_oculus_dextrus_iop_other={handle_oculus_dextrus_iop_other}
      oculus_dextrus_iop_other={dataToSend.oculus_dextrus_iop_other}
    />
  );
}
