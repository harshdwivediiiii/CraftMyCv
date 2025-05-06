import React from "react";
import { INITIAL_THEME_COLOR } from "@/lib/helper";
import { ResumeDataType } from "@/types/resume.type";
import { cn } from "@/lib/utils";
import PersonalInfo from "@/components/PersonalInfo";
import SummaryPreview from "@/components/SummaryPreview";
import ExperiencePreview from "@/components/ExperiencePreview";
import EducationPreview from "@/components/EducationPreview";
import SkillPreview from "@/components/SkillPreview";

const PreviewResume = (props: {
  isLoading: boolean;
  resumeInfo: ResumeDataType;
}) => {
  const { isLoading, resumeInfo } = props;
  const themeColor = resumeInfo?.themeColor || INITIAL_THEME_COLOR;

  return (
    <div
      className={cn(`
        shadow-lg !bg-white w-full flex-[1.02]
        h-full p-10 !font-open-sans
        !text-black
      `)}
      style={{
        borderTop: `13px solid ${themeColor}`,
      }}
    >
      {/* {Personal Info} */}
      <PersonalInfo isLoading={isLoading} resumeInfo={resumeInfo} />

      {/* {Summary} */}
      <SummaryPreview isLoading={isLoading} resumeInfo={resumeInfo} />

      {/* {Professional Experience} */}
      <ExperiencePreview isLoading={isLoading} resumeInfo={resumeInfo} />

      {/* {Educational Info} */}
      <EducationPreview isLoading={isLoading} resumeInfo={resumeInfo} />

      {/* {Skills} */}
      <SkillPreview isLoading={isLoading} resumeInfo={resumeInfo} />
    </div>
  );
};

export default PreviewResume;
