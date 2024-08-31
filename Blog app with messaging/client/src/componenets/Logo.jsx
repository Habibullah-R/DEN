import React from "react";
import { Link } from "react-router-dom"

function Logo({ className = ""  }) {
  return (
    <Link className={`${className}`} to="/">
    <span
      className={`bg-gray-700 cursor-pointer inline-block rounded-md px-2 py-2 text-lg font-semibold ${className}`}
    >
      me.DEV
      <sub className="text-xs font-light">BLOG</sub>
    </span></Link>
  );
}

export default Logo;
