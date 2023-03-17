import React, { useState, useEffect } from "react";
import "./dropdown.css";

const Dropdown = ({ onChange, placeholder }) => {
  const [envelopes, setEnvelopes] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const [selectedEnvelope, setSelectedEnvelope] = useState();

  useEffect(() => {
    const fetchEnvelopes = async () => {
      const response = await fetch("/api/envelopes");
      const envelopeData = await response.json();
      setEnvelopes(envelopeData.data);
    };
    fetchEnvelopes();

    const handler = () => setShowMenu(false);
    window.addEventListener("click", handler);
    return () => {
      window.removeEventListener("click", handler);
    };
  }, []);

  const handleInputClick = (e) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  const getDisplay = () => {
    if (selectedEnvelope) {
      return selectedEnvelope.title;
    }
    return placeholder;
  };

  const onItemClick = (item) => {
    setSelectedEnvelope(item);
    onChange(item.id);
  };

  const isSelected = (envelope) => {
    if (!selectedEnvelope) {
      return false;
    }
    return selectedEnvelope.title === envelope.title;
  };

  const Icon = () => {
    return (
      <svg height="20" width="20" viewBox="0 0 20 20">
        <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
      </svg>
    );
  };

  return (
    <div className="dropdown-container">
      <div onClick={handleInputClick} className="dropdown-input">
        <div className="dropdown-selected-view">{getDisplay()}</div>
        <div className="dropdown-tools">
          <div className="dropdown-tool">
            <Icon />
          </div>
        </div>
      </div>
      {showMenu && (
        <div className="dropdown-menu">
          {envelopes.map((envelope) => (
            <div
              onClick={() => onItemClick(envelope)}
              key={envelope.id}
              className={`dropdown-item ${isSelected(envelope) && "selected"}`}
            >
              {envelope.title}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
