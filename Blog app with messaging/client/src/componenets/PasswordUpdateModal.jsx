import React, { useState } from "react";
import Input from "./Input";
import Button from "./Button"
import { getToken } from "../utills/localStorage";
import { FaXmark } from "react-icons/fa6";
import { toast } from "react-toastify";

function PasswordUpdateModal({ show, hide, className = "", ...props }) {
  const token = getToken();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePassowrdUpdate = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch("/api/v1/user/updatePassword", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          oldPassword,
          newPassword,
        }),
      });
      const data = await response.json();
      if (data.success === false) {
        setError(data);
        setLoading(false);
        return;
      }
      toast(data.message)
      setLoading(false);
      hide();
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };
  return (
    <>
      <div
        className={`${className} w-[300px] absolute left-[50%] top-[50%] -translate-x-2/4
      bg-[#1F2937] p-3 rounded-md -translate-y-2/4`}
      >
        <form
          onSubmit={handlePassowrdUpdate}
          className="relative flex flex-col gap-3 py-4 px-2"
        >
          <FaXmark
            size={25}
            onClick={hide}
            className="cursor-pointer text-white absolute right-0 top-0"
          />
          <Input
            type="password"
            label="Old Password *"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
          <Input
            type="password"
            label="New Password *"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          {error && <p className="text-red-600 text-sm">{error.message}</p>}
          <Button className="mt-3" disabled={loading}>
            {loading ? "Updating..." : "Update"}
          </Button>
        </form>
      </div>
    </>
  );
}

export default PasswordUpdateModal;
