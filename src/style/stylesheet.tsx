'use-strict';

import { NS } from '@ns';
const doc = globalThis['document'];

declare global {
  // eslint-disable-next-line no-var
  var myStyles: HTMLStyleElement[];
}

function applyStylesheet(stylesheet: string) {
  // Inject style into DOM
  const style = doc.head.appendChild(doc.createElement('style'));
  style.innerHTML = stylesheet;
  // Remember style so it can be removed later.
  (globalThis.myStyles ??= []).push(style);
  return style;
}

function removeStylesheet(style: HTMLStyleElement) {
  // Remove from DOM
  style.remove();
  // Remove from our list of tracked styles
  globalThis.myStyles = (globalThis.myStyles ??= []).filter((otherStyle) => otherStyle !== style);
}

/**
 * This sets CSS vars for the theme's colors so you can use them in your stylesheets.
 * Optional, only needed if you want your GUIs to be themed like the rest of the GUI.
 */
function createColorsStyle(ns: NS) {
  const theme = ns.ui.getTheme();
  return `
  :root {
    --var_primarylight: ${theme.primarylight};
    --var_primary: ${theme.primary};
    --var_primarydark: ${theme.primarydark};
    --var_successlight: ${theme.successlight};
    --var_success: ${theme.success};
    --var_successdark: ${theme.successdark};
    --var_errorlight: ${theme.errorlight};
    --var_error: ${theme.error};
    --var_errordark: ${theme.errordark};
    --var_secondarylight: ${theme.secondarylight};
    --var_secondary: ${theme.secondary};
    --var_secondarydark: ${theme.secondarydark};
    --var_warninglight: ${theme.warninglight};
    --var_warning: ${theme.warning};
    --var_warningdark: ${theme.warningdark};
    --var_infolight: ${theme.infolight};
    --var_info: ${theme.info};
    --var_infodark: ${theme.infodark};
    --var_welllight: ${theme.welllight};
    --var_well: ${theme.well};
    --var_white: ${theme.white};
    --var_black: ${theme.black};
    --var_hp: ${theme.hp};
    --var_money: ${theme.money};
    --var_hack: ${theme.hack};
    --var_combat: ${theme.combat};
    --var_cha: ${theme.cha};
    --var_int: ${theme.int};
    --var_rep: ${theme.rep};
    --var_disabled: ${theme.disabled};
    --var_backgroundprimary: ${theme.backgroundprimary};
    --var_backgroundsecondary: ${theme.backgroundsecondary};
    --var_button: ${theme.button};
  }
  `;
}

export async function main(ns: NS) {
  ns.ps().filter((proc) => proc.filename == ns.getScriptName() && proc.pid != ns.pid).forEach((proc) => ns.kill(proc.pid));

  const styles = [
    applyStylesheet(ns.read('style/styles.css')), 
    applyStylesheet(createColorsStyle(ns))
  ];

  ns.atExit(() => {
    styles.forEach((style) => removeStylesheet(style));
  });
  
  while (true) {
    await ns.asleep(1000 * 60 * 60);
  }
}
