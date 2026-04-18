import React from "react";
import styles from "./credits.module.css";

/**
 * A shared credits component used across various landing pages.
 */
export const Credits: React.FC = () => {
  return (
    <div className={styles.credits}>
      Made with 🍓 by{" "}
      <a href="https://jespermhl.de" target="_blank" rel="noopener noreferrer">
        Jesper
      </a>{" "}
      for Naomi Jon HQ
    </div>
  );
};
