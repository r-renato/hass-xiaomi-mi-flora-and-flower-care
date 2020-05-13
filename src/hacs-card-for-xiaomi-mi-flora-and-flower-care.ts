import {
    LitElement,
    html,
    customElement,
    property,
    CSSResult,
    TemplateResult,
    css,
    PropertyValues
} from "lit-element";

import {
    HomeAssistant,
    handleClick,
    longPress,
    hasConfigOrEntityChanged
} from "custom-card-helpers";

import {CardConfig, FloraCarePlant, FloraCarePlantRanges, Sensor} from "./types";

import style from './style';

console.info("%c XIAOMI-MI-FLORA-AND-FLOWER-CARE-CARD %c 1.2.0 ", "color: white; background: green; font-weight: 700;", "color: coral; background: white; font-weight: 700;");

@customElement("xiaomi-mi-flora-and-flower-care-card")
class FlowerCareCard extends LitElement {
    private invalidConfig: boolean = false ;
    private invalidEntity: boolean = false ;

    private displayInfo: boolean = false ;
    private displayMaintenance: boolean = false ;

    readonly MOINSTURE = 'moisture' ;
    readonly CONDUCTIVITY = 'conductivity' ;
    readonly BRIGHTNESS = 'brightness' ;
    readonly TEMPERATURE = 'temperature' ;
    readonly BATTERY = 'battery' ;

    @property() public hass?: HomeAssistant ;

    @property() private _config?: CardConfig ;

    @property() private _floraCare?: FloraCarePlant ;
    @property() private _floraRanges?: FloraCarePlantRanges ;

    /**
     *
     * @param {CardConfig} config
     */
    public setConfig(config: CardConfig): void {
        console.log({ flora_care_card_config: config });

        if (!config) {
            this.invalidConfig = true ;
            throw new Error("Invalid configuration") ;
        }

        if (!config.entity || config.entity.length == 0) {
            this.invalidEntity = true ;
            throw new Error('Entity is required') ;
        }

        if (config.display && config.display.length > 0) {
            let displays = config.display.map(function(value) {
                return value.toLocaleLowerCase() ;
            }) ;

            this.displayMaintenance = displays.includes('maintenance') ;
            this.displayInfo = displays.includes('info') ;
        }
        this._config = config;
    }

    /**
     * get the current size of the card
     * @return {Number}
     */
    getCardSize() {
        return 1;
    }

    /**
     *
     * @returns {CSSResult}
     */
    static get styles(): CSSResult {
        return style;
    }

    /**
     * generates the card HTML
     * @return {TemplateResult}
     */
    render() {
        if ( this.invalidConfig || this.invalidEntity ) return html`
            <ha-card class="ha-card-waze-travel-time">
                <div class='banner'>
                    <div class="header">xiaomi-mi-flora-and-flower-care-card</div>
                </div>
                <div class='content'>
                    Configuration ERROR!
                </div>
            </ha-card>
        `;
        else return this._render() ;
    }

    /**
     *
     * @returns {TemplateResult}
     * @private
     */
    _render() {
        this._floraCare = <undefined> this.hass.states[ this._config!.entity ] ;
        this._floraRanges = this._floraCare.attributes.ranges ;

        let content = this.computeContent() ;
        let displayContent = "" !== content.strings.raw.toString() ;
        let infoClass = this.displayInfo && (this.displayMaintenance || displayContent) ? 'banner div-border-bottom' : 'banner';
        let maintenanceClass = this.displayMaintenance && displayContent ? 'banner div-border-bottom' : 'banner';

        return html`
      <ha-card style="background-image:url(${this._floraCare.attributes.image});background-repeat: no-repeat;background-size: auto !important;">
        <div class='banner'>${this.computeHeader()}
        </div>
        ${this.displayInfo ? html`
        <div class='${infoClass}' style="padding-left: 16px;padding-right: 16px;">${this.computeInfoToolTips(this._floraCare.attributes.info)}</div>
        ` : html`` }
        ${this.displayMaintenance ? html`
        <div class='${maintenanceClass}' style="padding-left: 16px;padding-right: 16px;">${this.computeMaintenanceToolTips(this._floraCare.attributes.maintenance)}</div>
        ` : html`` }
        ${displayContent ? html`
        <div class='content'>
            ${content}
        </div>
        ` : html`` }
      </ha-card>
        `;
    }

    /**
     *
     * @returns {TemplateResult}
     */
    computeContent() {
        //console.log({ configconfig: this.hass.states[ this._config!.entity ]});
        //console.log({ config2: this.hass.states[ 'sensor.zamioculcas_zamiifolia_battery' ]});

        //console.log({ floracaresensor: floraCare.attributes.sensors });

        let moinsture = this.getSensor( this._floraCare.attributes.sensors[ this.MOINSTURE ]) ;
        let conductivity = this.getSensor( this._floraCare.attributes.sensors[ this.CONDUCTIVITY ]) ;
        let brightness = this.getSensor( this._floraCare.attributes.sensors[ this.BRIGHTNESS ]) ;
        let temperature = this.getSensor( this._floraCare.attributes.sensors[ this.TEMPERATURE ]) ;

        if( !moinsture && !conductivity && !brightness && !temperature )
            return html`` ;
        else
            return html`
                ${moinsture ? this.computeContentItem(
                moinsture,
                this._floraRanges.min_soil_moist, this._floraRanges.max_soil_moist,
                this.computeAttributeClass( this._floraCare.attributes.problem, moinsture, this.MOINSTURE )
                ) : html``}
                ${conductivity ? this.computeContentItem(
                conductivity,
                this._floraRanges.min_soil_ec, this._floraRanges.max_soil_ec,
                this.computeAttributeClass( this._floraCare.attributes.problem, conductivity, this.CONDUCTIVITY )
                ): html``}
                ${brightness ? this.computeContentItem(
                brightness,
                this._floraRanges.min_light_lux, this._floraRanges.max_light_lux,
                this.computeAttributeClass( this._floraCare.attributes.problem, brightness, this.BRIGHTNESS )
                ): html``}
                ${temperature ? this.computeContentItem(
                temperature,
                this._floraRanges.min_temp, this._floraRanges.max_temp,
                this.computeAttributeClass( this._floraCare.attributes.problem, temperature, this.TEMPERATURE )
                ): html``}
            `;
    }

    computeTitle() {
        return (this._config && this._config.name) ;
    }

    /**
     *
     * @param {Sensor} sensor
     * @param {number} min
     * @param {number} max
     * @param {string} problemClass
     * @returns {TemplateResult}
     */
    computeContentItem( sensor : Sensor, min : number, max : number, problemClass : string ) {
        if( undefined !== sensor ) {
            return html`
             <div class="attributes" on-click="attributeClicked">
                <div>
                    <ha-icon icon="${sensor.attributes.icon}"></ha-icon>
                </div>
                <div class="${problemClass}">
                    ${sensor.state.indexOf("unknown") === -1 
                        ? sensor.state + " " + sensor.attributes.unit_of_measurement : "n/a"}
                </div>
                <div class="uom">
                ${null !== min && null !== max ? html`${min}-${max}` : html``}
                </div>            
            </div>           
        `;
        } else {
            return html`
            `;
        }
    }

    computeMaintenanceToolTips( maintenance ) {
        return html`
            <table class="s-table-lite">
                <thead>
                    <tr><td colspan="2" class="table-tr-td-border-bottom" style="text-align: center;font-weight: 500;">Maintenance</td></tr>
                </thead>
                <tbody> 
                    ${Object.keys(maintenance).map( key => html`
                        <tr>
                            <td valign="top" style="width:1%;text-align: left;line-height: 1em;font-weight: 500;font-size: 85%;">${this.capitalize(key)}</td>
                            <td valign="top" style="text-align: left;line-height: 1em;font-weight: normal;font-size: 85%;">${maintenance[key]}</td>
                        </tr>    
                    `)}  
                </tbody>
            </table>      
        `;
    }

    computeInfoToolTips( info ) {
        return html`
            <table is="s-table-lite tabGeral">
                <tbody>
                    ${Object.keys(info).filter( key => {
                        if( 'floral_language' == key ) {
                            return false; // skip
                        }
                        return true;
                    }).map( key => html`
                        <tr>
                            <td valign="top" style="width:1%;text-align: left;line-height: 1em;font-weight: 500;font-size: 85%;">${this.capitalize(key)}</td>
                            <td valign="top" style="text-align: left;line-height: 1em;font-weight: normal;font-size: 85%;">${info[key]}</td>
                        </tr>    
                    `)}                    
                </tbody>
            </table>      
        `;
    }

    computeHeader() {
        let batterySensor = this.getSensor( this._floraCare.attributes.sensors[ this.BATTERY ]) ;
        return html`
            <table is="s-table-lite">
                <tbody>
                    <tr>
                        <td valign="top" class="header" style="padding-bottom: 0;">${this.computeTitle()}</td>
                        <td>
                            <div class="attributes">
                                <div class="fcasttooltip">
                                    <ha-icon icon="mdi:information-variant"></ha-icon>
                                    <div class="fcasttooltiptext">${this.computeInfoToolTips(this._floraCare.attributes.info)}</div>
                                </div>
                                <div class=""></div>
                                <div class="uom">&nbsp;</div>            
                            </div>                            
                        </td>  
                        <td>
                            <div class="attributes">
                                <div class="fcasttooltip">
                                    <ha-icon icon="mdi:lifebuoy"></ha-icon>
                                    <div class="fcasttooltiptext">${this.computeMaintenanceToolTips(this._floraCare.attributes.maintenance)}</div>
                                </div>
                                <div class=""></div>
                                <div class="uom">&nbsp;</div>            
                            </div>                            
                        </td>                        
                        <td>
                        ${this.computeContentItem(batterySensor, null, null, 
                            this.computeAttributeClass( this._floraCare.attributes.problem, batterySensor, this.BATTERY )
                        )}  
                        </td>
                    </tr>
                    <tr>
                        <td valign="top" colspan="5" class="header table-tr-td-border-bottom" style="text-align: right;padding-right: 8px;padding-top: 6;line-height: 1em;font-weight: normal;font-size: 105%;">${this._config.zone_name}</td>
                    </tr>
                </tbody>
            </table>           
        `;
    }

    /**
     *
     * @param problem
     * @param attr
     * @returns {string}
     */
    computeAttributeClass(problem, state, attr) {
        return problem.indexOf(attr) === -1
            && undefined !== state && state.state.indexOf("unknown") === -1 ? "" : "problem";
    }

    /*    private _handleTap(): void {
            handleClick(this, this.hass!, this._config!, false);
        }

        private _handleHold(): void {
            handleClick(this, this.hass!, this._config!, true);
        }*/

    /**
     *
     * @param {string} name
     */
    getSensor( name : string ) : Sensor {
        let sensor:Sensor = <undefined> this.hass.states[ name ] ;

        // console.log({ sensor: sensor });
        return( sensor ) ;
    }

    capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
}


