import WatermarkedImageUploader from "@/components/general/(team)/check-upload-image";
import TeamSection from "@/components/general/(team)/team-section";
import React from "react";

const OurTeamPage = (props) => {
  return (
    <div>
      <WatermarkedImageUploader />
      <TeamSection />
    </div>
  );
};

export default OurTeamPage;
