import { css } from 'lit-element';

let tooltipBGColor = css`rgba(50,50,50,0.85)`;
let tooltipFGColor = css`#fff`;
let tooltipBorderColor =  css`rgb(14, 171, 56)`;
let tooltipBorderWidth =  1;
let tooltipCaretSize = 5;
let tooltipWidth = 400;
let tooltipLeftOffset =  -325;
let tooltipVisible = css`visible` ;

const style = css`
    ha-card {
        padding: 24px 16px 16px 16px;
        background-repeat: no-repeat;
        background-size: 100% 100% !important;
    }
    
    .banner {
        display: flex;
        align-items: flex-end;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        padding-top: 12px;
        
        background-color: rgba(50,50,50,0.75);
        border-radius: 3px;
    }
    
    .has-plant-image .banner {
        padding-top: 30%;
    }
    
    .header {
        @apply --paper-font-headline;
        line-height: 40px;
        padding: 8px 16px;
        font-weight: 500;
        font-size: 125%;
    }
    
    .has-plant-image .header {
        font-size: 16px;
        font-weight: 500;
        line-height: 16px;
        padding: 16px;
        color: white;
        width: 100%;
        background: rgba(0, 0, 0, var(--dark-secondary-opacity));
    }
    
    .content {
        display: flex;
        justify-content: space-between;
        padding: 16px 32px 24px 32px;
        background-color: rgba(50,50,50,0.75);
        border-radius: 3px;
    }
    
    .has-plant-image .content {
        padding-bottom: 16px;
    }
    
    ha-icon {
        color: var(--paper-item-icon-color);
        margin-bottom: 8px;
    }
    
    .attributes {
        cursor: pointer;
    }
    
    .attributes div {
        text-align: center;
    }
    
    .problem {
        color: var(--google-red-500);
        font-weight: bold;
    }
    
    .uom {
        color: var(--secondary-text-color);
    } 
   
/* CUSTOM */
   
    table {
        width: 100%;
    }   
     
    table thead {
    
    }
    
    table tr {
      border-top: 1px solid black; 
    }
    
    table tr:first-child {
      border-top: 0;
    }
    
    table tr:first-child {
      border-left: 0; border-right: 0;
    }
    
    table tr:last-child {
      border-bottom: 0;
    }
    
    table tr:last-child{
      border-right: 0;
    }

    .fcasttooltip {
        position: relative;
        display: inline-block;
    }
    
    .fcasttooltip .fcasttooltiptext {
        visibility: hidden;
        
        width: ${tooltipWidth}px;
        background-color: ${tooltipBGColor};
        color: ${tooltipFGColor};
        text-align: center; 
        border-radius: 6px;
        border-style: solid;
        border-color: ${tooltipBorderColor};
        border-width: ${tooltipBorderWidth}px;
        padding: 5px 0;
        /* Position the tooltip */
        position: absolute;
        z-index: 1;
        top: 100%;
        left: 0%; 
        margin-left: ${tooltipLeftOffset}px;
    }
      
    .fcasttooltip .fcasttooltiptext:after {
        content: "";
        position: absolute;
        top: 100%;
        left: 50%;
        margin-left: -${tooltipCaretSize}px;
        border-width: ${tooltipCaretSize}px;
        border-style: solid;
        border-color: ${tooltipBorderColor} transparent transparent transparent;
    }
      
    .fcasttooltip:hover .fcasttooltiptext {
        visibility: ${tooltipVisible};
    }
`;

export default style;