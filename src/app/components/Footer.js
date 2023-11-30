import React from "react";

const Footer = () => {
  return (
    <div className="flex justify-center items-center flex-col text-black text-xs italic my-4">
      <p>
        Created By{" "}
        <a href="https://twitter.com/Bolexzyy__" target="_blank">
          <span className="text-sky-900">Boluwatife Emmanuel</span>
        </a>
      </p>
      <p className="text-sm text-slate-900">© 2023</p>
    </div>
  );
};

export default Footer;
