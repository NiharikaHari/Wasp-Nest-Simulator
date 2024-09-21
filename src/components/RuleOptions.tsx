import { useState } from "react";
import { setRuleSelected } from "@/sketches/sketch";

const RuleOptions = () => {
  const rules = [
    { id: 1, desc: "Immediate neighbours only" },
    { id: 2, desc: "Neighbours & neighbours of neighbours" },
  ];

  let [selectedRule, setSelectedRule] = useState(0);

  return (
    <>
      {rules.map((rule) => (
        <div
          className={
            selectedRule === rule.id
              ? "inline-flex flex-wrap items-center justify-center m-2 border-2 border-black rounded-md px-4 py-2 hover:bg-yellow-100 bg-[#ffc712]"
              : "inline-flex flex-wrap items-center justify-center m-2 border-2 border-black rounded-md px-4 py-2 hover:bg-yellow-100"
          }
          onClick={() => {
            setSelectedRule(rule.id);
            setRuleSelected(rule.id);
          }}
        >
          {"Rule " + rule.id + " : " + rule.desc}
        </div>
      ))}
    </>
  );
};

export default RuleOptions;
