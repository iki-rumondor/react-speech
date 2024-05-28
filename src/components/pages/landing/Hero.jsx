import React from "react";
import heroImg from "/src/assets/landing/img/hero-img.png";
import { Link } from "react-router-dom";

export const Hero = () => {
  const token = sessionStorage.getItem("token");
  return (
    <section className="pt-7">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-6 text-md-start text-center py-6">
            <h1 className="mb-4 fs-9 fw-bold">
              SPeMDi UNG
            </h1>
            <h2 className="fw-bold">
              Sistem Pembelajaran Mahasiswa Disabilitas
            </h2>
            <p className="mb-6 lead text-secondary">
              Sebuah Website Pembelajaran Bagi Mahasiswa Disabilitas
            </p>
            <div className="text-center text-md-start">
              {token ? (
                <Link to={"/signin"} className="btn btn-warning me-3">
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link to={"/signin"} className="btn btn-warning me-3">
                    Masuk
                  </Link>
                  <Link to={"/signup"} className="btn btn-dark me-3">
                    Daftar
                  </Link>
                </>
              )}
            </div>
          </div>
          <div className="col-md-6 text-end">
            <img className="pt-7 pt-md-0 img-fluid" src={heroImg} alt="" />
          </div>
        </div>
      </div>
    </section>
  );
};
