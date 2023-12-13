"use client";
import React from "react";

const Tabs = () => {
  const [activeTab, setActiveTab] = React.useState<number>(0);

  return (
    <div>
      <div role="tablist" className="tabs tabs-boxed">
        <a
          role="tab"
          onClick={() => setActiveTab(0)}
          className={activeTab === 0 ? "tab tab-active" : "tab"}
        >
          All
        </a>
        <a
          role="tab"
          onClick={() => setActiveTab(1)}
          className={activeTab === 1 ? "tab tab-active" : "tab"}
        >
          Personal
        </a>
        <a
          role="tab"
          onClick={() => setActiveTab(2)}
          className={activeTab === 2 ? "tab tab-active" : "tab"}
        >
          Groups
        </a>
      </div>
    </div>
  );
};

export default Tabs;
