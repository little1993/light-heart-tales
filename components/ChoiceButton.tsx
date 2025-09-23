import React from "react";

type ChoiceButtonProps = {
  label: string;
  disabled?: boolean;
  onClick: () => void;
};

export function ChoiceButton({ label, disabled, onClick }: ChoiceButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="choice-button"
      aria-disabled={disabled}
    >
      {label}
      <style jsx>{`
        .choice-button {
          padding: 14px 18px;
          border-radius: 12px;
          border: none;
          background: rgba(255, 255, 255, 0.18);
          color: #fff;
          font-size: 1rem;
          font-weight: 600;
          letter-spacing: 0.02em;
          cursor: pointer;
          transition: transform 0.2s ease, background 0.2s ease, opacity 0.2s ease;
          backdrop-filter: blur(6px);
        }

        .choice-button:hover {
          transform: translateY(-2px);
          background: rgba(255, 220, 120, 0.3);
        }

        .choice-button:active {
          transform: translateY(1px);
        }

        .choice-button:disabled,
        .choice-button[aria-disabled="true"] {
          cursor: not-allowed;
          opacity: 0.6;
          transform: none;
        }
      `}</style>
    </button>
  );
}
