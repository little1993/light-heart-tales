import React from "react";

type ChoiceButtonProps = {
  label: string;
  disabled?: boolean;
  onClick: () => void;
  ariaLabel?: string;
};

export function ChoiceButton({ label, disabled, onClick, ariaLabel }: ChoiceButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="choice-button"
      aria-label={ariaLabel ?? label}
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

        .choice-button:focus-visible {
          outline: 3px solid rgba(255, 223, 107, 0.9);
          outline-offset: 2px;
        }

        .choice-button:active {
          transform: translateY(1px);
        }

        .choice-button:disabled {
          cursor: not-allowed;
          opacity: 0.6;
          transform: none;
        }
      `}</style>
    </button>
  );
}
