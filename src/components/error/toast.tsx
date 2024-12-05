"use client";

import { useEffect, useState } from "react";

const ToastError = ({ errorMsg }: { errorMsg: string }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null; // 숨김 처리

  return (
    <div className="toast toast-center toast-middle">
      <div className="alert alert-info">
        <span>{errorMsg}</span>
      </div>
      {/* <div className="alert alert-success">
        <span>Message sent successfully.</span>
      </div> */}
    </div>
  );
};

export default ToastError;
