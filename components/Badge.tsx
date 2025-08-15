import React from "react";

const Badge = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="px-4 py-1 rounded-full border border-violet-500/50 text-[12px]">
      {children}
    </div>
  );
};

export default Badge;
