import React from "react";
import "../components/styles/_dog.css";

function Missing() {
  return (
    <>
    <h2>Sorry, page not found</h2>
    <h1>Here's a cute dog instead </h1>
    <div className="kennel">
      <div className="face">
        <div className="ear leftear"></div>
        <div className="ear rightear"></div>
        <div className="brow leftbrow"></div>
        <div className="brow rightbrow"></div>
        <div className="whiteeye leftwhiteeye"></div>
        <div className="whiteeye rightwhiteeye"></div>
        <div className="eye lefteye"></div>
        <div className="eye righteye"></div>
        <div className="nose"></div>
        <div className="cheek leftcheek"></div>
        <div className="cheek rightcheek"></div>
        <div className="tongue"></div>
        <div className="paw leftpaw">
          <div className="claws leftclaws"></div>
        </div>
        <div className="paw rightpaw">
          <div className="claws rightclaws"></div>
        </div>
      </div>
    </div>
    </>
  );
}

export default Missing;